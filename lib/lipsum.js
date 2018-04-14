"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parser_1 = require("./parser");
var service_1 = require("./service");
var objectAssign = require("object-assign");
/**
 * Gets you dummy text!
 */
var Lipsum = /** @class */ (function () {
    function Lipsum(parser, service) {
        if (parser === void 0) { parser = new parser_1.Parser(); }
        if (service === void 0) { service = new service_1.Service(); }
        this.parser = parser;
        this.service = service;
    }
    /**
     * Retrieves dummy text from lipsum.com.
     */
    Lipsum.prototype.getText = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        options = objectAssign({
            amount: 5,
            what: 'paras',
            startWithLipsum: false
        }, options);
        var requestOpts = {
            amount: options.amount,
            what: options.what,
            start: options.startWithLipsum ? 'yes' : 'no'
        };
        return this.service.get(parser_1.Format.JSON, requestOpts).then(function (data) {
            return _this.parser.parse(parser_1.Format.JSON, data);
        }).then(function (_a) {
            var lipsum = _a.feed.lipsum;
            return lipsum;
        });
    };
    return Lipsum;
}());
exports.Lipsum = Lipsum;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlwc3VtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpcHN1bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUF3QztBQUN4QyxxQ0FBa0M7QUFJbEMsNENBQStDO0FBYy9DOztHQUVHO0FBQ0g7SUFDRSxnQkFDVSxNQUE2QixFQUM3QixPQUFnQztRQURoQyx1QkFBQSxFQUFBLGFBQXFCLGVBQU0sRUFBRTtRQUM3Qix3QkFBQSxFQUFBLGNBQXVCLGlCQUFPLEVBQUU7UUFEaEMsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7SUFBRyxDQUFDO0lBRTlDOztPQUVHO0lBQ0gsd0JBQU8sR0FBUCxVQUFRLE9BQTRCO1FBQXBDLGlCQWVDO1FBZk8sd0JBQUEsRUFBQSxZQUE0QjtRQUNsQyxPQUFPLEdBQUcsWUFBWSxDQUFDO1lBQ3JCLE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLE9BQU87WUFDYixlQUFlLEVBQUUsS0FBSztTQUN2QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRVosSUFBTSxXQUFXLEdBQUc7WUFDbEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtZQUNsQixLQUFLLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO1NBQzlDLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUN6RCxPQUFPLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFpQixlQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQWdCO2dCQUFSLHVCQUFNO1lBQU8sT0FBQSxNQUFNO1FBQU4sQ0FBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBeEJZLHdCQUFNIn0=