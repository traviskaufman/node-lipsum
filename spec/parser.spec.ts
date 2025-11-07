/**
 * Unit test for lipsum parser
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import Parser from "../src/parser";

describe("the lipsum parser", () => {
  let parser: Parser;
  let initEmptyParser: Parser;
  const payload = "<test>This is a test</test>";
  const jsonPayload = '{"test": "This is a test"}';

  const mock = {
    succCallback: vi.fn(() => true),
    errCallback: vi.fn(() => true),
  };

  beforeEach(() => {
    initEmptyParser = new Parser();
    parser = new Parser(payload);
    mock.succCallback.mockClear();
    mock.errCallback.mockClear();
  });

  it("parses XML", async () => {
    const parser = new Parser(`<root><test>This is a test</test></root>`);
    expect(await parser.parse()).toEqual({
      test: "This is a test",
    });
  });

  it("parses JSON", async () => {
    const parser = new Parser();
    expect(await parser.feed(`{"test": "This is a test"}`).parse()).toEqual({
      test: "This is a test",
    });
  });

  it("fails when it cannot parse", async () => {
    await expect(
      new Parser().feed("<a>>>>sdlkjgdhsalfkjage;a;;;;;;&*%").parse(),
    ).rejects.toThrow();
  });
});
