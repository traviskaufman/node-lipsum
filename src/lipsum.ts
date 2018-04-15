import {Parser, Format} from './parser';
import {Service} from './service';

import {Parser as XMLParser} from 'xml2js';
import {Promise} from 'es6-promise';
import objectAssign = require('object-assign');

/**
 * Options for getting dummy text.
 */
export interface GetTextOptions {
  amount?: number;
  // NOTE: I think for better JS interop it's best to stick with
  // strings here rather than enums. Consider `paras` vs
  // something like `TextType[TextType.Paragraph]`
  what?: string;
  startWithLoremIpsum?: boolean;
}

/**
 * Gets you dummy text!
 */
export class Lipsum {
  constructor(
    private parser: Parser = new Parser(),
    private service: Service = new Service()) {}

  /**
   * Retrieves dummy text from lipsum.com.
   */
  getText(options: GetTextOptions = {}): Promise<string> {
    options = objectAssign({
      amount: 5,
      what: 'paras',
      startWithLoremIpsum: false
    }, options);

    const requestOpts = {
      amount: options.amount,
      what: options.what,
      start: options.startWithLoremIpsum ? 'yes' : 'no'
    };
    return this.service.get(Format.JSON, requestOpts).then(data => {
      return this.parser.parse<LipsumResponse>(Format.JSON, data);
    }).then(({feed: {lipsum}}) => lipsum);
  }
}

interface LipsumResponse {
  feed: {
    lipsum: string;
  };
}
