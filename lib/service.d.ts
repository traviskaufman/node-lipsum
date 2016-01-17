import * as http from 'http';
import { Promise } from 'es6-promise';
import { Format } from './parser';
export interface HttpClient {
    get(options: any, callback?: (res: http.IncomingMessage) => void): http.ClientRequest;
}
/**
 * Provides a transport layer for the lipsum.com web service.
 */
export declare class Service {
    private httpClient;
    constructor(httpClient?: HttpClient);
    /**
     * Retrieves the lipsum text.
     * @param format
     * @param queryOpts Options to attach to the query portion of the request.
     * @return Promise which is fulfilled with the response on success and
     *     rejected on error.
     */
    get(format: Format, queryOpts?: any): Promise<string>;
}
