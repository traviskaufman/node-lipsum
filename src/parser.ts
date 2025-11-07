import { Parser as XMLParser } from "xml2js";

export default class Parser {
  private _payload: string | null = null;

  constructor(payload?: string) {
    if (payload) {
      this._payload = payload;
    }
  }

  feed(payload: string): this {
    this._payload = payload;
    return this;
  }

  async parse(): Promise<any> {
    if (!this._payload) {
      throw new Error("No payload to parse");
    }

    const payload = this._payload.trim();

    // Try to parse as JSON first
    if (payload.startsWith("{") || payload.startsWith("[")) {
      try {
        return JSON.parse(payload);
      } catch (e) {
        // If JSON parsing fails, fall through to XML parsing
      }
    }

    // Try to parse as XML
    return new Promise((resolve, reject) => {
      new XMLParser({
        explicitArray: false,
        explicitRoot: false,
      }).parseString(payload, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
