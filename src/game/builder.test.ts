import { assertEquals } from "jsr:@std/assert";
import { Builder } from "./builder.ts";

Deno.test("simple test", () => {
  const g = new Builder();
  assertEquals(g.add(1, 2), 3);
});
