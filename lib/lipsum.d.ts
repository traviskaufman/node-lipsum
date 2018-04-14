import { Parser } from './parser';
import { Service } from './service';
import { Promise } from 'es6-promise';
/**
 * Options for getting dummy text.
 */
export interface GetTextOptions {
    amount?: number;
    what?: string;
    startWithLipsum?: boolean;
}
/**
 * Gets you dummy text!
 */
export declare class Lipsum {
    private parser;
    private service;
    constructor(parser?: Parser, service?: Service);
    /**
     * Retrieves dummy text from lipsum.com.
     */
    getText(options?: GetTextOptions): Promise<string>;
}
