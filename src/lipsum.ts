/**
 * Lorem Ipsum Wrapper
 *
 * Main entry point for the node-lipsum module. Provides wrappers for
 * the Parser and Service classes as well as an easy method to get text
 * from the lipsum.com service.
 */
import Service from "./service.ts";
import Parser from "./parser.ts";
import z from "zod";

interface LipsumOptions {
  amount?: number;
  what?: string;
  start?: string;
}

const lipsumResultSchema = z.object({
  feed: z.object({
    lipsum: z.string(),
  }),
});

export default class Lipsum {
  private service: Service;
  private parser: Parser;

  /**
   * These parameters will be passed by default to lipsum.com in the query
   */
  private defaults: LipsumOptions = {
    amount: 5,
    what: "paras",
    start: "no",
  };

  constructor(service?: Service, parser?: Parser) {
    this.service = service || new Service();
    this.parser = parser || new Parser();
  }

  /**
   * Retrieves dummy text from lipsum.com
   *
   * @param opts - Options to pass onto the lipsum.com query. These will
   *               be transformed into url query params, so if you pass in something
   *               like {start: 'yes', what: 'bytes'} that will become
   *               "?start=yes&what=bytes"
   * @returns Promise that resolves with the lipsum text
   */
  async getText(opts?: LipsumOptions): Promise<string> {
    const options = { ...this.defaults, ...opts };

    const text = await this.service.get("json", options);
    const result = await this.parser.feed(text).parse();
    return lipsumResultSchema.parse(result).feed.lipsum;
  }
}
