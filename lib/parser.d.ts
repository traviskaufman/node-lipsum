import { Promise } from 'es6-promise';
import { EventEmitter } from 'events';
import { Parser as XMLParser } from 'xml2js';
/**
 * Describes the different formats the parser is able to handle.
 */
export declare enum Format {
    XML = 0,
    JSON = 1,
}
/**
 * Detects whether input is XML or JSON and parses accordingly.
 */
export declare class Parser extends EventEmitter {
    private xmlParser;
    private jsonParser;
    constructor(xmlParser?: XMLParser, jsonParser?: JSON);
    /**
     * Parses a given payload based on it's format. Returns a promise which is
     * resolved when parsing is done successfully, and rejected if the parser
     * encounters an error
     */
    parse<T>(format: Format, payload: string): Promise<T>;
    /**
     * Convenience function for parsing JSON.
     */
    parseJSON<T>(payload: string): Promise<T>;
    /**
     * Convenience function for parsing XML.
     */
    parseXML<T>(payload: string): Promise<T>;
}
