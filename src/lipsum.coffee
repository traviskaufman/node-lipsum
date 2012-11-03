###
# Lorem Ipsum Wrapper
###

Service = require('./service')
Parser = require('./parser')


class Lipsum
  constructor: ->
    @_parser = new Parser()
    @_service = new Service()

  getText: (callback, opts) ->
    opts.amount = opts.amount or @_defaults.amount
    opts.what = opts.what or @_defaults.what
    opts.start = opts.start or @_defaults.start

  _defaults: ->
    amount: 5
    what: 'paras'
    start: 'no'
