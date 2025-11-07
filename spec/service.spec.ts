/**
 * Behavioral Tests for Lipsum Service
 */
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import Service from "../src/service";
import * as http from "node:http";
import nock from "nock";

describe("The lipsum service", () => {
  let lipsumService: Service;
  const defaultFormat = "json";

  beforeAll(() => nock.disableNetConnect());

  beforeEach(() => {
    lipsumService = new Service();
  });

  const stubOutHTTP = () => {
    vi.spyOn(http, "request");
  };

  it("retrieves lipsum from lipsum.com", async () => {
    const resp = JSON.stringify({
      lipsum: "Lorem Ipsum Dolor Sit Amet",
    });
    nock("http://lipsum.com")
      .get("/feed/json")
      .reply(200, resp, { "Content-Type": "application/json" });
    const payload = await lipsumService.get(defaultFormat);
    expect(payload).toEqual(resp);
  });

  it("accepts different query params", async () => {
    const query = { amount: 2, what: "paras" };
    const resp = JSON.stringify({
      lipsum: "Lorem Ipsum Dolor Sit Amet",
    });
    nock("http://lipsum.com")
      .get("/feed/json")
      .query(query)
      .reply(200, resp, { "Content-Type": "application/json" });

    const payload = await lipsumService.get(defaultFormat, {
      amount: 2,
      what: "paras",
    });
    expect(payload).toEqual(resp);
  });

  it("allows XML", async () => {
    const resp = `<feed><lipsum>Lorem Ipsum Dolor Sit Amet</lipsum></feed>`;
    nock("http://lipsum.com")
      .get("/feed/xml")
      .reply(200, resp, { "Content-Type": "text/xml" });

    const payload = await lipsumService.get("xml");
    expect(payload).toEqual(resp);
  });
});
