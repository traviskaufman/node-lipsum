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
  get(format: "json" | "xml", queryOpts?: QueryOptions): Promise<string>;
}
export {};
//# sourceMappingURL=service.d.ts.map
