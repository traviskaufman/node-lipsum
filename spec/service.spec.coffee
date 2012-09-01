###
  Behavioral Tests for Lipsum Service
###
lipsumService = require "../lib/service"
http = require "http"
events = require "events"
_ = require "lodash"

describe "The lipsum service", ->
  defaultFormat = "json"
  callback = -> {}
  stubOutHTTP = ->
    spyOn(http, 'get').andCallFake ->
      # As to not break the code in service.coffee
      return new events.EventEmitter()

  stubHTTPandGetFakeResponse = (res) ->
    spyOn(http, 'get').andCallFake (endpoint, callback) ->
      callback(res)
      return new events.EventEmitter()

  it "should build an endpoint given a format and a callback", ->
    stubOutHTTP()
    lipsumService.get(defaultFormat, callback)
    expect(http.get.mostRecentCall.args[0]).toEqual(
      "http://lipsum.lipsum.com/feed/json")

  it "should be able to accept different query params", ->
    stubOutHTTP()
    lipsumService.get(defaultFormat, callback, {amount: 2, what: "paras"})
    expect(http.get.mostRecentCall.args[0]).toEqual(
      "http://lipsum.lipsum.com/feed/json?amount=2&what=paras")

  it "should be able to accept a callback that takes the response " +
     "as an argument", ->
    fooFunction = createSpy()
    expectedResponse = "foo server is operational"
    stubHTTPandGetFakeResponse(expectedResponse)
    lipsumService.get("xml", fooFunction)
    expect(fooFunction).toHaveBeenCalledWith(expectedResponse)
