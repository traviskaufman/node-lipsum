import { Parser as XMLParser } from "xml2js";
export default class Parser {
    _payload = null;
    constructor(payload) {
        if (payload) {
            this._payload = payload;
        }
    }
    feed(payload) {
        this._payload = payload;
        return this;
    }
    async parse() {
        if (!this._payload) {
            throw new Error("No payload to parse");
        }
        const payload = this._payload.trim();
        // Try to parse as JSON first
        if (payload.startsWith("{") || payload.startsWith("[")) {
            try {
                return JSON.parse(payload);
            }
            catch (e) {
                // If JSON parsing fails, fall through to XML parsing
            }
        }
        // Try to parse as XML
        return new Promise((resolve, reject) => {
            new XMLParser().parseString(payload, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxJQUFJLFNBQVMsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUU3QyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU07SUFDakIsUUFBUSxHQUFrQixJQUFJLENBQUM7SUFFdkMsWUFBWSxPQUFnQjtRQUMxQixJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQ1osSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsT0FBZTtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXJDLDZCQUE2QjtRQUM3QixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsQ0FBQztZQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ1gscURBQXFEO1lBQ3ZELENBQUM7UUFDSCxDQUFDO1FBRUQsc0JBQXNCO1FBQ3RCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNuRCxJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNSLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRiJ9