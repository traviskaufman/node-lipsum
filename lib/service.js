"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var https = require("https");
var url = require("url");
var es6_promise_1 = require("es6-promise");
var parser_1 = require("./parser");
/**
 * Provides a transport layer for the lipsum.com web service.
 */
var Service = /** @class */ (function () {
    function Service(httpsClient) {
        if (httpsClient === void 0) { httpsClient = https; }
        this.httpsClient = httpsClient;
    }
    /**
     * Retrieves the lipsum text.
     * @param format
     * @param queryOpts Options to attach to the query portion of the request.
     * @return Promise which is fulfilled with the response on success and
     *     rejected on error.
     */
    Service.prototype.get = function (format, queryOpts) {
        var _this = this;
        var urlopts = {
            protocol: 'https:',
            hostname: 'lipsum.com',
            pathname: "/feed/" + (format === parser_1.Format.JSON ? 'json' : 'xml')
        };
        if (queryOpts) {
            urlopts.query = queryOpts;
        }
        var endpoint = url.format(urlopts);
        return new es6_promise_1.Promise(function (resolve, reject) {
            var req = _this.httpsClient.get(endpoint, function (res) {
                var payload = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    payload += chunk.replace(/[\n|\t|\f|\v|\r]+/g, '\\n');
                });
                res.on('error', function (e) { reject(e); });
                res.on('end', function () { return resolve(payload); });
            });
            req.on('error', function (e) { reject(e); });
        });
    };
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQStCO0FBQy9CLHlCQUEyQjtBQUUzQiwyQ0FBb0M7QUFFcEMsbUNBQWdDO0FBTWhDOztHQUVHO0FBQ0g7SUFDRSxpQkFBb0IsV0FBZ0M7UUFBaEMsNEJBQUEsRUFBQSxtQkFBZ0M7UUFBaEMsZ0JBQVcsR0FBWCxXQUFXLENBQXFCO0lBQUcsQ0FBQztJQUV4RDs7Ozs7O09BTUc7SUFDSCxxQkFBRyxHQUFILFVBQUksTUFBYyxFQUFFLFNBQWU7UUFBbkMsaUJBMEJDO1FBekJDLElBQU0sT0FBTyxHQUFRO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxZQUFVLE1BQU0sS0FBSyxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBRztTQUMvRCxDQUFDO1FBRUYsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztTQUMzQjtRQUVELElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsT0FBTyxJQUFJLHFCQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBQyxHQUFHO2dCQUM3QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXhCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBYTtvQkFDM0IsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDO2dCQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVMsQ0FBTyxJQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFoQixDQUFnQixDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTLENBQU8sSUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxjQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSwwQkFBTyJ9