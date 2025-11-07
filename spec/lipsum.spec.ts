/**
 * Integration test for Lipsum Service
 */
import { describe, it, expect, beforeEach, beforeAll, vi } from "vitest";
import Lipsum from "../src/lipsum";
import Service from "../src/service";
import Parser from "../src/parser";
import nock from "nock";

describe("Node-Lipsum", () => {
  let lipsumText: string;
  let lipsum: Lipsum;
  let service: Service;
  let parser: Parser;

  beforeAll(() => nock.disableNetConnect());

  beforeEach(() => {
    lipsumText = "Lorem Ipsum dolor sit amet";
    service = vi.mockObject(new Service());
    parser = vi.mockObject(new Parser());
    lipsum = new Lipsum(service, parser);

    vi.mocked(service.get).mockResolvedValue(
      JSON.stringify({
        feed: {
          lipsum: lipsumText,
        },
      }),
    );
    vi.mocked(parser.feed).mockReturnThis();
    vi.mocked(parser.parse).mockResolvedValue({
      feed: {
        lipsum: lipsumText,
      },
    });
  });

  it("returns lipsum text", async () => {
    const text = await lipsum.getText();
    expect(text).toEqual(lipsumText);
  });

  it("forwards arguments to lipsum service", async () => {
    const args = { start: "yes", what: "words", amount: 10 };
    await lipsum.getText(args);

    expect(service.get).toHaveBeenCalledWith(expect.anything(), args);
  });
});
