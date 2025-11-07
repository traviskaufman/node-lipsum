/**
 * Web Service for lipsum.com
 *
 * Provides the low-level interface to the lipsum.com service.
 */
import * as http from "node:http";
import * as url from "node:url";
export default class Service {
    /**
     * Retrieves the lipsum text.
     *
     * @param format - one of "xml" or "json"
     * @param queryOpts - options to attach to the query portion of the url
     * @returns Promise that resolves with the response data
     */
    get(format, queryOpts) {
        return new Promise((resolve, reject) => {
            const urlopts = {
                protocol: "http:",
                hostname: "lipsum.com",
                pathname: `/feed/${format}`,
            };
            if (queryOpts) {
                urlopts.query = queryOpts;
            }
            const endpoint = url.format(urlopts);
            const req = http
                .request(endpoint, (res) => {
                let payload = "";
                res.setEncoding("utf8");
                res.on("data", (chunk) => {
                    payload += chunk;
                });
                res.on("end", () => {
                    resolve(payload);
                });
            })
                .on("error", (err) => {
                reject(new Error(`Service Error: ${err.message}`));
            });
            req.end();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFDSCxPQUFPLEtBQUssSUFBSSxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEtBQUssR0FBRyxNQUFNLFVBQVUsQ0FBQztBQVNoQyxNQUFNLENBQUMsT0FBTyxPQUFPLE9BQU87SUFDMUI7Ozs7OztPQU1HO0lBQ0gsR0FBRyxDQUFDLE1BQWMsRUFBRSxTQUF3QjtRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sT0FBTyxHQUFrQjtnQkFDN0IsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsU0FBUyxNQUFNLEVBQUU7YUFDNUIsQ0FBQztZQUVGLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFtQyxDQUFDO1lBQ3RELENBQUM7WUFFRCxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sR0FBRyxHQUFHLElBQUk7aUJBQ2IsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN6QixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXhCLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBYSxFQUFFLEVBQUU7b0JBQy9CLE9BQU8sSUFBSSxLQUFLLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO2dCQUVILEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDakIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztpQkFDRCxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBVSxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztZQUVMLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIn0=