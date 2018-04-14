import * as http from 'http';
import * as https from 'https';
import * as url from 'url';

import {Promise} from 'es6-promise';

import {Format} from './parser';

export interface HttpsClient {
  get(options: any, callback?: (res: http.IncomingMessage) => void): http.ClientRequest;
}

/**
 * Provides a transport layer for the lipsum.com web service.
 */
export class Service {
  constructor(private httpsClient: HttpsClient = https) {}

  /**
   * Retrieves the lipsum text.
   * @param format
   * @param queryOpts Options to attach to the query portion of the request.
   * @return Promise which is fulfilled with the response on success and
   *     rejected on error.
   */
  get(format: Format, queryOpts?: any): Promise<string> {
    const urlopts: any = {
      protocol: 'https:',
      hostname: 'lipsum.com',
      pathname: `/feed/${ format === Format.JSON ? 'json' : 'xml' }`
    };

    if (queryOpts) {
      urlopts.query = queryOpts;
    }

    const endpoint = url.format(urlopts);

    return new Promise((resolve, reject) => {
      const req = this.httpsClient.get(endpoint, (res) => {
        let payload = '';
        res.setEncoding('utf8');

        res.on('data', (chunk: string) => {
          payload += chunk.replace(/[\n|\t|\f|\v|\r]+/g, '\\n');
        });
        res.on('error', reject);
        res.on('end', () => resolve(payload));
      });
      req.on('error', reject);
    });
  }
}
