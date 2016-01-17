"use strict";
var parser_1 = require('./parser');
var service_1 = require('./service');
var objectAssign = require('object-assign');
/**
 * Gets you dummy text!
 */
var Lipsum = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlwc3VtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpcHN1bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQTZCLFVBQVUsQ0FBQyxDQUFBO0FBQ3hDLHdCQUFzQixXQUFXLENBQUMsQ0FBQTtBQUlsQyxJQUFPLFlBQVksV0FBVyxlQUFlLENBQUMsQ0FBQztBQWMvQzs7R0FFRztBQUNIO0lBQ0UsZ0JBQ1UsTUFBNkIsRUFDN0IsT0FBZ0M7UUFEeEMsc0JBQXFDLEdBQXJDLGFBQTZCLGVBQU0sRUFBRTtRQUNyQyx1QkFBd0MsR0FBeEMsY0FBK0IsaUJBQU8sRUFBRTtRQURoQyxXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM3QixZQUFPLEdBQVAsT0FBTyxDQUF5QjtJQUFHLENBQUM7SUFFOUM7O09BRUc7SUFDSCx3QkFBTyxHQUFQLFVBQVEsT0FBNEI7UUFBcEMsaUJBZUM7UUFmTyx1QkFBNEIsR0FBNUIsWUFBNEI7UUFDbEMsT0FBTyxHQUFHLFlBQVksQ0FBQztZQUNyQixNQUFNLEVBQUUsQ0FBQztZQUNULElBQUksRUFBRSxPQUFPO1lBQ2IsZUFBZSxFQUFFLEtBQUs7U0FDdkIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVaLElBQU0sV0FBVyxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxlQUFlLEdBQUcsS0FBSyxHQUFHLElBQUk7U0FDOUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDekQsTUFBTSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFpQixlQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQWdCO2dCQUFSLE1BQU07WUFBTyxPQUFBLE1BQU07UUFBTixDQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksY0FBTSxTQXdCbEIsQ0FBQSJ9