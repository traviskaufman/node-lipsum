/**
 * @fileoverview Provides a CLI wrapper for the main module.
 */
"use strict";
var argparse_1 = require('argparse');
var lipsum_1 = require('./lipsum');
/**
 * Runs the CLI program.
 */
var CLI = (function () {
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
    CLI.prototype.run = function (args) {
        if (args === void 0) { args = []; }
        var argv = this.optparser.parseArgs(args);
        this.lipsum.getText(argv).then(function (text) { return console.log(text); }).catch(function (err) {
            console.error(err);
        });
    };
    return CLI;
}());
exports.CLI = CLI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRzs7QUFFSCx5QkFBNkIsVUFBVSxDQUFDLENBQUE7QUFHeEMsdUJBQXFCLFVBQVUsQ0FBQyxDQUFBO0FBR2hDOztHQUVHO0FBQ0g7SUFDRSxhQUNVLFNBQWdELEVBQ2hELE1BQTZCO1FBRHJDLHlCQUF3RCxHQUF4RCxnQkFBd0MseUJBQWMsRUFBRTtRQUN4RCxzQkFBcUMsR0FBckMsYUFBNkIsZUFBTSxFQUFFO1FBRDdCLGNBQVMsR0FBVCxTQUFTLENBQXVDO1FBQ2hELFdBQU0sR0FBTixNQUFNLENBQXVCO1FBRXJDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsRUFBRTtZQUNuRCxZQUFZLEVBQUUsS0FBSztZQUNuQixNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLElBQUksRUFBRSw0Q0FBNEM7Z0JBQzVDLGtDQUFrQztTQUN6QyxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFO1lBQ3RDLFlBQVksRUFBRSxPQUFPO1lBQ3JCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7WUFDcEMsSUFBSSxFQUFFLHlEQUF5RDtnQkFDekQsdURBQXVEO1NBQzlELENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDeEMsWUFBWSxFQUFFLENBQUM7WUFDZixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSx1REFBdUQ7Z0JBQ3ZELGdCQUFnQjtTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsaUJBQUcsR0FBSCxVQUFJLElBQW1CO1FBQW5CLG9CQUFtQixHQUFuQixTQUFtQjtRQUNyQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsR0FBRztZQUNqRSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLFdBQUcsTUFtQ2YsQ0FBQSJ9