"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var es6_promise_1 = require('es6-promise');
var events_1 = require('events');
var xml2js_1 = require('xml2js');
/**
 * Describes the different formats the parser is able to handle.
 */
(function (Format) {
    Format[Format["XML"] = 0] = "XML";
    Format[Format["JSON"] = 1] = "JSON";
})(exports.Format || (exports.Format = {}));
var Format = exports.Format;
/**
 * Detects whether input is XML or JSON and parses accordingly.
 */
var Parser = (function (_super) {
    __extends(Parser, _super);
    function Parser(xmlParser, jsonParser) {
        if (xmlParser === void 0) { xmlParser = new xml2js_1.Parser(); }
        if (jsonParser === void 0) { jsonParser = JSON; }
        _super.call(this);
        this.xmlParser = xmlParser;
        this.jsonParser = jsonParser;
    }
    /**
     * Parses a given payload based on it's format. Returns a promise which is
     * resolved when parsing is done successfully, and rejected if the parser
     * encounters an error
     */
    Parser.prototype.parse = function (format, payload) {
        var _this = this;
        var result;
        return new es6_promise_1.Promise(function (resolve, reject) {
            if (format === Format.JSON) {
                try {
                    resolve(_this.jsonParser.parse(payload));
                }
                catch (err) {
                    reject(err);
                }
                finally {
                    return;
                }
            }
            return _this.xmlParser.parseString(payload, function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    };
    /**
     * Convenience function for parsing JSON.
     */
    Parser.prototype.parseJSON = function (payload) {
        return this.parse(Format.JSON, payload);
    };
    /**
     * Convenience function for parsing XML.
     */
    Parser.prototype.parseXML = function (payload) {
        return this.parse(Format.JSON, payload);
    };
    return Parser;
}(events_1.EventEmitter));
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0QkFBc0IsYUFBYSxDQUFDLENBQUE7QUFDcEMsdUJBQTJCLFFBQVEsQ0FBQyxDQUFBO0FBQ3BDLHVCQUFrQyxRQUFRLENBQUMsQ0FBQTtBQUUzQzs7R0FFRztBQUNILFdBQVksTUFBTTtJQUNoQixpQ0FBRyxDQUFBO0lBQ0gsbUNBQUksQ0FBQTtBQUNOLENBQUMsRUFIVyxjQUFNLEtBQU4sY0FBTSxRQUdqQjtBQUhELElBQVksTUFBTSxHQUFOLGNBR1gsQ0FBQTtBQUVEOztHQUVHO0FBQ0g7SUFBNEIsMEJBQVk7SUFDdEMsZ0JBQ1ksU0FBc0MsRUFDdEMsVUFBdUI7UUFEL0IseUJBQThDLEdBQTlDLGdCQUFtQyxlQUFTLEVBQUU7UUFDOUMsMEJBQStCLEdBQS9CLGlCQUErQjtRQUNqQyxpQkFBTyxDQUFDO1FBRkUsY0FBUyxHQUFULFNBQVMsQ0FBNkI7UUFDdEMsZUFBVSxHQUFWLFVBQVUsQ0FBYTtJQUVuQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHNCQUFLLEdBQUwsVUFBUyxNQUFjLEVBQUUsT0FBZTtRQUF4QyxpQkFxQkM7UUFwQkMsSUFBSSxNQUFjLENBQUM7UUFDbkIsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDO29CQUNILE9BQU8sQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxDQUFFO2dCQUFBLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ2IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNkLENBQUM7d0JBQVMsQ0FBQztvQkFDVCxNQUFNLENBQUM7Z0JBQ1QsQ0FBQztZQUNILENBQUM7WUFFRCxNQUFNLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQzdCLE9BQU8sRUFBRSxVQUFDLEdBQVUsRUFBRSxNQUFjO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNSLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7Z0JBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBUyxHQUFULFVBQWEsT0FBZTtRQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILHlCQUFRLEdBQVIsVUFBWSxPQUFlO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBaERELENBQTRCLHFCQUFZLEdBZ0R2QztBQWhEWSxjQUFNLFNBZ0RsQixDQUFBIn0=