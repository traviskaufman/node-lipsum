###
# Lorem Ipsum Wrapper
###

Service = require('./service')
Parser = require('./parser')
events = require('events')

class Lipsum extends events.EventEmitter
  constructor: ->
    @_parser = new Parser()
    @_service = new Service()
    @text = null

  defaults:
    amount: 5
    what: 'paras'
    start: 'no'

  getText: (callback, opts) =>
    if not opts then opts = @defaults else
      for prop in @defaults
        opts[prop] = @defaults[prop] unless opts[prop]?

    @_service.get("json", @serviceCallback, opts)
    @once('lipsum', (txt) -> callback(txt))

  parserSuccessCallBack: (result) =>
    @emit('lipsum', result.feed.lipsum)

  parserErrorCallBack: (err) ->
    throw new Error("Parser Error: #{err.message}")

  serviceCallback: (text) =>
    @_parser.feed(text).parse(@parserSuccessCallBack,
                             @parserErrorCallBack)

module?.exports = Lipsum
