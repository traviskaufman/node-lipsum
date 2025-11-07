export default class Parser {
  private _payload;
  constructor(payload?: string);
  feed(payload: string): this;
  parse(): Promise<any>;
}
//# sourceMappingURL=parser.d.ts.map
