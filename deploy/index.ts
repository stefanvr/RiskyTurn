import * as pulumi from "@pulumi/pulumi";
import { createStaticWebsite } from "./static-website";

// Import the stack configuration
const config = new pulumi.Config();
const domain = config.require("domain");
const subDomain = config.require("subDomain");
const application = config.require("application");
const siteDir = "..\\dist\\";

const applicationDomain = `${subDomain}.${domain}`;
const stackName = pulumi.getStack();

if (stackName === "gameapp") {
  const { websiteUrl } = createStaticWebsite(
    applicationDomain,
    application,
    siteDir,
  );
  exports.websiteUrl = websiteUrl;
}
