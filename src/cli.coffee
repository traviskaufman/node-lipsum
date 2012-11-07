###
# Lipsum Command-line Interface
###

Lipsum = require('./lipsum')
ArgumentParser = require('argparse').ArgumentParser

exports._optparser = new ArgumentParser(
  version: '1.0.0'
  description: 'The CLI for the NodeJS Lorem Ipsum Service'
)

exports._optparser.addArgument(
  ['-s', '--start-with-lipsum'],
    defaultValue: false
    action: 'storeTrue'
    dest: 'start'
    help: 'Whether or not the text should start with ' +
     '"Lorem Ipsum dolor sit amet...".'
)

exports._optparser.addArgument(
  ['-w', '--what'],
    defaultValue: 'paras'
    type: String
    choices: ['paras', 'words', 'bytes']
    help: 'The type of each text structure that will be returned. ' +
      'Choose from "paras" (paragraphs), "words", or "bytes"'
)

exports._optparser.addArgument(
  ['-a', '--amount'],
    defaultValue: 5
    type: Number
    help: 'The number of text structures that will be returned. ' +
      'Defaults to 5.'
)

exports.run = (args = []) ->
  argv = exports._optparser.parseArgs(args)
  exports._run(argv)

exports._run = (argv) ->
  lipsum = new Lipsum()
  # true/false -> 'yes'/'no'
  argv.start = if argv.start then 'yes' else 'no'
  lipsum.getText( (text) ->
    console.log(text)
  , argv)
