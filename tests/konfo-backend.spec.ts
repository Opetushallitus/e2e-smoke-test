import { test, expect } from "@playwright/test";
import connectToEndpoint, { getKonfoParams } from "../src/util";
import { domainsToUse } from "../src/domains";
import ENDPOINTS from "../src/endpoints";

test.describe("konfo external api", () => {
  for (const domain of domainsToUse) {
    test.describe(`testing domain ${domain}`, () => {
      for (const endpoint of ENDPOINTS) {
        test(`with endpoint ${endpoint.url}`, async () => {
          const params = await getKonfoParams(domain);
          const status = await connectToEndpoint(domain, endpoint, params);
          expect(status).toBe(200);
        });
      }
    });
  }
});
