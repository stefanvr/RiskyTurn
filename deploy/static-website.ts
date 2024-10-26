import * as pulumi from "@pulumi/pulumi";
const aws = require("@pulumi/aws"); // With import compile error
const mime = require("mime"); // With import type finding error
import * as fs from "fs";
import * as pathModule from "path";
import { GetZoneResult } from "@pulumi/aws/route53";

export function createStaticWebsite(
  domain: string,
  subDomain: string,
  siteDir: string,
) {
  const fullDomain = `${subDomain}.${domain}`;

  // Function to recursively get all files in a directory
  function getAllFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file: string) {
      const fullPath = pathModule.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        // Use forward slashes for subdirectories
        results = results.concat(
          getAllFiles(fullPath).map((subPath) => `${file}/${subPath}`),
        );
      } else {
        results.push(file);
      }
    });
    return results;
  }

  // Create a private S3 bucket
  const bucket = new aws.s3.Bucket(fullDomain, {
    bucket: fullDomain,
    acl: "private",
    forceDestroy: true,
  });

  // Upload files to the S3 bucket
  getAllFiles(siteDir).forEach((relativePath) => {
    const s3Key = relativePath.replace(/\\/g, "/");
    new aws.s3.BucketObject(s3Key, {
      bucket: bucket.id,
      source: new pulumi.asset.FileAsset(
        pathModule.join(siteDir, relativePath),
      ),
      contentType: mime.getType(relativePath) || undefined,
    });
  });

  // Get the hosted zone for the domain
  const zoneId = aws.route53.getZone({ name: domain }).then((
    zone: GetZoneResult,
  ) => zone.zoneId);

  // Create an explicit provider for us-east-1
  const usEast1Provider = new aws.Provider("us-east-1-provider", {
    region: "us-east-1",
  });

  // Create an SSL certificate in us-east-1 region
  const certificate = new aws.acm.Certificate("ssl-cert", {
    domainName: fullDomain,
    validationMethod: "DNS",
  }, { provider: usEast1Provider, parent: usEast1Provider });

  // Update the certificate validation to use the same provider
  new aws.route53.Record(`${domain}-validation`, {
    name: certificate.domainValidationOptions[0].resourceRecordName,
    zoneId: zoneId,
    type: certificate.domainValidationOptions[0].resourceRecordType,
    records: [certificate.domainValidationOptions[0].resourceRecordValue],
    ttl: 60,
  }, { provider: usEast1Provider });

  /*  const certificateValidation = new aws.acm.CertificateValidation("certificateValidation", {
    certificateArn: certificate.arn,
    validationRecordFqdns: [certificateValidationDomain.fqdn],
  }, { provider: usEast1Provider });
  */
  // Create an Origin Access Identity for CloudFront
  const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
    "originAccessIdentity",
    {
      comment: "OAI for S3 bucket access",
    },
  );

  // Define CloudFront distribution properties
  const distributionArgs = {
    enabled: true,
    aliases: [fullDomain],
    viewerCertificate: {
      acmCertificateArn: pulumi.interpolate`${certificate.arn}`,
      sslSupportMethod: "sni-only",
      minimumProtocolVersion: "TLSv1.2_2021",
    },
    origins: [{
      originId: bucket.arn,
      domainName: bucket.bucketRegionalDomainName,
      s3OriginConfig: {
        originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
      },
    }],
    defaultRootObject: "index.html",
    defaultCacheBehavior: {
      targetOriginId: bucket.arn,
      viewerProtocolPolicy: "redirect-to-https",
      allowedMethods: ["GET", "HEAD", "OPTIONS"],
      cachedMethods: ["GET", "HEAD", "OPTIONS"],
      forwardedValues: {
        queryString: false,
        cookies: { forward: "none" },
      },
      minTtl: 0,
      defaultTtl: 300,
      maxTtl: 1200,
    },
    priceClass: "PriceClass_100",
    customErrorResponses: [{
      errorCode: 404,
      responseCode: 200,
      responsePagePath: "/index.html",
    }],
    restrictions: {
      geoRestriction: {
        restrictionType: "none",
      },
    },
  };

  // Create a CloudFront distribution
  const distribution = new aws.cloudfront.Distribution(
    "cdn",
    distributionArgs,
    { provider: usEast1Provider },
  );

  // Create a bucket policy that allows CloudFront to access the private bucket
  const bucketPolicyDocument = {
    Version: "2012-10-17",
    Statement: [{
      Effect: "Allow",
      Principal: { AWS: originAccessIdentity.iamArn },
      Action: "s3:GetObject",
      Resource: pulumi.interpolate`${bucket.arn}/*`,
    }],
  };

  new aws.s3.BucketPolicy("bucketPolicy", {
    bucket: bucket.id,
    policy: bucketPolicyDocument,
  });

  // Create a Route 53 DNS record
  const recordArgs = {
    name: fullDomain,
    zoneId: zoneId,
    type: "A",
    aliases: [{
      name: distribution.domainName,
      zoneId: distribution.hostedZoneId,
      evaluateTargetHealth: true,
    }],
  };

  new aws.route53.Record(fullDomain, recordArgs);

  // Export the website URL and distribution ID
  return {
    websiteUrl: pulumi.interpolate`https://${fullDomain}`,
    distribution: distribution,
  };
}
