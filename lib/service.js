"use strict";
var http = require('http');
var url = require('url');
var es6_promise_1 = require('es6-promise');
var parser_1 = require('./parser');
/**
 * Provides a transport layer for the lipsum.com web service.
 */
var Service = (function () {
    function Service(httpClient) {
        if (httpClient === void 0) { httpClient = http; }
        this.httpClient = httpClient;
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
            protocol: 'http:',
            hostname: 'lipsum.com',
            pathname: "/feed/" + (format === parser_1.Format.JSON ? 'json' : 'xml')
        };
        if (queryOpts) {
            urlopts.query = queryOpts;
        }
        var endpoint = url.format(urlopts);
        return new es6_promise_1.Promise(function (resolve, reject) {
            var req = _this.httpClient.get(endpoint, function (res) {
                var payload = '';
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    payload += chunk.replace(/[\n|\t|\f|\v|\r]+/g, '\\n');
                });
                res.on('error', reject);
                res.on('end', function () { return resolve(payload); });
            });
            req.on('error', reject);
        });
    };
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUM3QixJQUFZLEdBQUcsV0FBTSxLQUFLLENBQUMsQ0FBQTtBQUUzQiw0QkFBc0IsYUFBYSxDQUFDLENBQUE7QUFFcEMsdUJBQXFCLFVBQVUsQ0FBQyxDQUFBO0FBTWhDOztHQUVHO0FBQ0g7SUFDRSxpQkFBb0IsVUFBNkI7UUFBckMsMEJBQXFDLEdBQXJDLGlCQUFxQztRQUE3QixlQUFVLEdBQVYsVUFBVSxDQUFtQjtJQUFHLENBQUM7SUFFckQ7Ozs7OztPQU1HO0lBQ0gscUJBQUcsR0FBSCxVQUFJLE1BQWMsRUFBRSxTQUFlO1FBQW5DLGlCQTBCQztRQXpCQyxJQUFNLE9BQU8sR0FBUTtZQUNuQixRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsWUFBVSxNQUFNLEtBQUssZUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFHO1NBQy9ELENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDNUIsQ0FBQztRQUVELElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsTUFBTSxDQUFDLElBQUkscUJBQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFDLEdBQUc7Z0JBQzVDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFeEIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFhO29CQUMzQixPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQWhCLENBQWdCLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUNILEdBQUcsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGNBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLGVBQU8sVUFxQ25CLENBQUEifQ==