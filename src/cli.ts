/**
 * @fileoverview Provides a CLI wrapper for the main module.
 */

import {ArgumentParser} from 'argparse';

import {Parser} from './parser';
import {Lipsum} from './lipsum';
import {Service} from './service';

/**
 * Runs the CLI program.
 */
export class CLI {
  constructor(
    private optparser: ArgumentParser = new ArgumentParser(),
    private lipsum: Lipsum = new Lipsum()
  ) {
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

  run(args: string[] = []) {
    const argv = this.optparser.parseArgs(args);
    this.lipsum.getText(argv).then(text => console.log(text)).catch(err => {
      console.error(err);
    });
  }
}
