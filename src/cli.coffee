###
# Lipsum Command-line Interface
###

Lipsum = require('./lipsum')

exports.run = (args = []) ->
  exports._optparser = require('optimist')
  argv = exports._optparser.parse(args).usage(
    'Lorem Ipsum Service for nodeJS.\n' +
    'Usage: $0 [-s, --start_with_lipsum] ' +
    '[-w, --what {paras, words, bytes}] ' +
    '[-a, --amount AMT] ' +
    '[-h, --help]'
  ).options('start_with_lipsum',
    default: false
    alias: 's'
    boolean: true
    describe: 'Whether or not the text should start with ' +
     '"Lorem Ipsum dolor sit amet...". Defaults to true.'
  ).options('what',
    default: 'paras'
    alias: 'w'
    string: true
    describe: 'The type of each text structure that will be returned. ' +
      'Choose from "paras" (paragraphs), "words", or "bytes"'
  ).options('amount',
    default: 5
    alias: 'a'
    describe: 'The number of text structures that will be returned. ' +
      'Defaults to 5.'
  ).check( (args) ->
    # Make sure the 'what' arg is valid
    what_choices = /^(paras|words|bytes?)$/g
    is_valid_what = args.what.search(what_choices) >= 0

    # Make sure 'amount' is a number
    amt_format = /^([0-9]+?)$/g
    is_valid_amt = args.amt.search(amt_format)

    is_valid_what && is_valid_amt
  )
  
  if argv.help
    exports._optparser.help()
    return
  exports._run(argv)

exports._run = (argv) ->
  lipsum = new Lipsum()
  # true/false -> 'yes'/'no'
  argv.start_with_lipsum = if argv.start_with_lipsum then 'yes' else 'no'
  lipsum.getText( (text) ->
    console.log(text)
  , argv)
