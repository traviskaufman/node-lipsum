"use strict";
/**
 * @fileoverview Provides a CLI wrapper for the main module.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var argparse_1 = require("argparse");
var lipsum_1 = require("./lipsum");
/**
 * Runs the CLI program.
 */
var CLI = /** @class */ (function () {
    function CLI(optparser, lipsum) {
        if (optparser === void 0) { optparser = new argparse_1.ArgumentParser(); }
        if (lipsum === void 0) { lipsum = new lipsum_1.Lipsum(); }
        this.optparser = optparser;
        this.lipsum = lipsum;
        optparser.addArgument(['-s', '--start-with-lipsum'], {
            defaultValue: false,
            action: 'storeTrue',
            dest: 'startWithLoremIpsum',
            help: 'Whether or not the text should start with ' +
                '"Lorem Ipsum dolor sit amet...".'
        });
        optparser.addArgument(['-w', '--what'], {
            defaultValue: 'paras',
            type: String,
            choices: ['paras', 'words', 'bytes'],
            help: 'The type of each text structure that will be returned. ' +
                'Choose from "paras" (paragraphs), "words", or "bytes"'
        });
        optparser.addArgument(['-a', '--amount'], {
            defaultValue: 5,
            type: Number,
            help: 'The number of text structures that will be returned. ' +
                'Defaults to 5.'
        });
    }
    CLI.prototype.run = function (args, callback) {
        if (args === void 0) { args = []; }
        var argv = this.optparser.parseArgs(args);
        this.lipsum.getText(argv).then(callback).catch(function (err) {
            console.error(err);
        });
    };
    return CLI;
}());
exports.CLI = CLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgscUNBQXdDO0FBR3hDLG1DQUFnQztBQUdoQzs7R0FFRztBQUNIO0lBQ0UsYUFDVSxTQUFnRCxFQUNoRCxNQUE2QjtRQUQ3QiwwQkFBQSxFQUFBLGdCQUFnQyx5QkFBYyxFQUFFO1FBQ2hELHVCQUFBLEVBQUEsYUFBcUIsZUFBTSxFQUFFO1FBRDdCLGNBQVMsR0FBVCxTQUFTLENBQXVDO1FBQ2hELFdBQU0sR0FBTixNQUFNLENBQXVCO1FBRXJDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsRUFBRTtZQUNuRCxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLElBQUksRUFBRSw0Q0FBNEM7Z0JBQzVDLGtDQUFrQztTQUN6QyxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ3RDLFlBQVksRUFBRSxPQUFPO1lBQ3JCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7WUFDcEMsSUFBSSxFQUFFLHlEQUF5RDtnQkFDekQsdURBQXVEO1NBQzlELENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDeEMsWUFBWSxFQUFFLENBQUM7WUFDZixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSx1REFBdUQ7Z0JBQ3ZELGdCQUFnQjtTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQUcsR0FBSCxVQUFJLElBQW1CLEVBQ25CLFFBQXNDO1FBRHRDLHFCQUFBLEVBQUEsU0FBbUI7UUFFckIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQXBDWSxrQkFBRyJ9