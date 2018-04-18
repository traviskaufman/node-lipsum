import {Promise} from 'es6-promise';
import {EventEmitter} from 'events';
import {Parser as XMLParser} from 'xml2js';

/**
 * Describes the different formats the parser is able to handle.
 */
export enum Format {
  XML,
  JSON
}

/**
 * Detects whether input is XML or JSON and parses accordingly.
 */
export class Parser extends EventEmitter {
  constructor(
      private xmlParser: XMLParser = new XMLParser(),
      private jsonParser: JSON = JSON) {
    super();
  }

  /**
   * Parses a given payload based on it's format. Returns a promise which is
   * resolved when parsing is done successfully, and rejected if the parser
   * encounters an error
   */
  parse<T>(format: Format, payload: string): Promise<T> {
    let result: Object;
    return new Promise((resolve, reject) => {
      if (format === Format.JSON) {
        try {
          resolve(this.jsonParser.parse(payload));
        } catch (err) {
          reject(err);
        } finally {
          return;
        }
      }

      else if (format === Format.XML)
      {
        return this.xmlParser.parseString(
          payload, (err: Error, result: any) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
          });
         }
     
    });
  }

  /**
   * Convenience function for parsing JSON.
   */
  parseJSON<T>(payload: string): Promise<T> {
    return this.parse(Format.JSON, payload);
  }

  /**
   * Convenience function for parsing XML.
   */
  parseXML<T>(payload: string): Promise<T> {
    return this.parse(Format.XML, payload);
  }
}
