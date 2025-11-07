import * as url from "node:url";
export default class Service {
    /**
     * Retrieves the lipsum text.
     *
     * @param format - one of "xml" or "json"
     * @param queryOpts - options to attach to the query portion of the url
     * @returns Promise that resolves with the response data
     */
    async get(format, queryOpts) {
        const urlopts = {
            protocol: "http:",
            hostname: "lipsum.com",
            pathname: `/feed/${format}`,
        };
        if (queryOpts) {
            urlopts.query = queryOpts;
        }
        const endpoint = url.format(urlopts);
        const resp = await fetch(endpoint);
        if (!resp.ok) {
            throw new Error(`Service Error: ${resp.statusText}`);
        }
        const text = await resp.text();
        return text.replace(/[\n|\t|\f|\v|\r]+/g, "\\n");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sS0FBSyxHQUFHLE1BQU0sVUFBVSxDQUFDO0FBU2hDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBTztJQUMxQjs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQXNCLEVBQUUsU0FBd0I7UUFDeEQsTUFBTSxPQUFPLEdBQWtCO1lBQzdCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxTQUFTLE1BQU0sRUFBRTtTQUM1QixDQUFDO1FBRUYsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNkLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBbUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNuRCxDQUFDO0NBQ0YifQ==