###
  Parser for xml and json. Detects whether the file is XML or JSON and parses it accordingly. 
  Parsing within the file provides the advantage of decoupling calls to the server with calls
  to the parser, as it is able to be agnostic to the format received. It
  cannot, however, parse HTML (nor should it have to).
###
XMLParser = require('xml2js').Parser

class LipsumParser extends events.EventEmitter
  constructor: (payload) ->
    @_xmlParser = new XMLParser()
    @_payload = if payload? then payload else null
    @parsedOutput = null

  feed: (payload) =>
    @parsedOutput = null
    @_payload = payload

  parse: (successCallback, errCallback) =>
    if not @_payload?
      throw new ReferenceError("Nothing to parse.")

    if @parsedOutput?
      return @parsedOutput

    # First attempt to parse the JSON string
    @parsedOutput = @_attemptParseJSON @payload

    # If that didn't work than try parsing it as XML
    if not @parsedOutput?
      xmlSuccCallback = (result) =>
        @parsedOutput = result
      @_attemptParseXML(xmlSuccCallback, errCallback)

  _attemptParseJSON: ->
    try
      return JSON.parse payload
    catch SyntaxError
      return

  _attemptParseXML: (onSuccess, onError) =>
    @_xmlParser.parseString payload, (err, result) ->
      if err
        if onError? then onError(err)
        return
        
      onSuccess(result)
