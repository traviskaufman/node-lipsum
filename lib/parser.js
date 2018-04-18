"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = require("es6-promise");
var events_1 = require("events");
var xml2js_1 = require("xml2js");
/**
 * Describes the different formats the parser is able to handle.
 */
var Format;
(function (Format) {
    Format[Format["XML"] = 0] = "XML";
    Format[Format["JSON"] = 1] = "JSON";
})(Format = exports.Format || (exports.Format = {}));
/**
 * Detects whether input is XML or JSON and parses accordingly.
 */
var Parser = /** @class */ (function (_super) {
    __extends(Parser, _super);
    function Parser(xmlParser, jsonParser) {
        if (xmlParser === void 0) { xmlParser = new xml2js_1.Parser(); }
        if (jsonParser === void 0) { jsonParser = JSON; }
        var _this = _super.call(this) || this;
        _this.xmlParser = xmlParser;
        _this.jsonParser = jsonParser;
        return _this;
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
            else if (format === Format.XML) {
                return _this.xmlParser.parseString(payload, function (err, result) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                });
            }
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
        return this.parse(Format.XML, payload);
    };
    return Parser;
}(events_1.EventEmitter));
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBb0M7QUFDcEMsaUNBQW9DO0FBQ3BDLGlDQUEyQztBQUUzQzs7R0FFRztBQUNILElBQVksTUFHWDtBQUhELFdBQVksTUFBTTtJQUNoQixpQ0FBRyxDQUFBO0lBQ0gsbUNBQUksQ0FBQTtBQUNOLENBQUMsRUFIVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFHakI7QUFFRDs7R0FFRztBQUNIO0lBQTRCLDBCQUFZO0lBQ3RDLGdCQUNZLFNBQXNDLEVBQ3RDLFVBQXVCO1FBRHZCLDBCQUFBLEVBQUEsZ0JBQTJCLGVBQVMsRUFBRTtRQUN0QywyQkFBQSxFQUFBLGlCQUF1QjtRQUZuQyxZQUdFLGlCQUFPLFNBQ1I7UUFIVyxlQUFTLEdBQVQsU0FBUyxDQUE2QjtRQUN0QyxnQkFBVSxHQUFWLFVBQVUsQ0FBYTs7SUFFbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxzQkFBSyxHQUFMLFVBQVMsTUFBYyxFQUFFLE9BQWU7UUFBeEMsaUJBeUJDO1FBeEJDLElBQUksTUFBYyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxxQkFBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRTtnQkFDMUIsSUFBSTtvQkFDRixPQUFPLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDekM7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNiO3dCQUFTO29CQUNSLE9BQU87aUJBQ1I7YUFDRjtpQkFFSSxJQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsR0FBRyxFQUM5QjtnQkFDRSxPQUFPLEtBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUMvQixPQUFPLEVBQUUsVUFBQyxHQUFVLEVBQUUsTUFBVztvQkFDakMsSUFBSSxHQUFHLEVBQUU7d0JBQ1AsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3BCO29CQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7YUFDSDtRQUVOLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQVMsR0FBVCxVQUFhLE9BQWU7UUFDMUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUJBQVEsR0FBUixVQUFZLE9BQWU7UUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBcERELENBQTRCLHFCQUFZLEdBb0R2QztBQXBEWSx3QkFBTSJ9