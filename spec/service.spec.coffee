###
  Behavioral Tests for Lipsum Service
###
Service = require "../lib/service"
https = require "https"

describe "The lipsum service", ->
  lipsumService = new Service()
  defaultFormat = "json"
  callback = -> {}
  stubOutHTTP = ->
    spyOn(https, 'request').andCallThrough()


  it "should build an endpoint given a format and a callback", ->
    stubOutHTTP()
    lipsumService.get(defaultFormat, callback)
    expect(https.request.mostRecentCall.args[0]).toEqual(
      "https://lipsum.com/feed/json")

  it "should be able to accept different query params", ->
    stubOutHTTP()
    lipsumService.get(defaultFormat, callback, {amount: 2, what: "paras"})
    expect(https.request.mostRecentCall.args[0]).toEqual(
      "https://lipsum.com/feed/json?amount=2&what=paras")

  it "should be able to accept a callback that gets a payload", ->
    runs ->
      fooFunction = createSpy()
      lipsumService.get("xml", fooFunction)
