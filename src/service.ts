/**
 * Web Service for lipsum.com
 *
 * Provides the low-level interface to the lipsum.com service.
 */
import * as http from "node:http";
import * as url from "node:url";

interface QueryOptions {
  amount?: number;
  what?: string;
  start?: string;
  [key: string]: string | number | undefined;
}

export default class Service {
  /**
   * Retrieves the lipsum text.
   *
   * @param format - one of "xml" or "json"
   * @param queryOpts - options to attach to the query portion of the url
   * @returns Promise that resolves with the response data
   */
  async get(format: "json" | "xml", queryOpts?: QueryOptions): Promise<string> {
    const urlopts: url.UrlObject = {
      protocol: "http:",
      hostname: "lipsum.com",
      pathname: `/feed/${format}`,
    };

    if (queryOpts) {
      urlopts.query = queryOpts as Record<string, string>;
    }

    const endpoint = url.format(urlopts);
    const resp = await fetch(endpoint);
    if (!resp.ok) {
      throw new Error(`Service Error: ${resp.statusText}`);
    }
    const text = await resp.text();
    return text.replace(/[\n|\t|\f|\v|\r]+/g, "\\n");
  }
}
