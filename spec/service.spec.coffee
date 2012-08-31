###
  Behavioral Tests for Lipsum Service
###
lipsumService = require "../lib/service"
http = require "http"

describe "The lipsum service", ->
  it "should provide a default endpoint", ->
    spyOn(http, 'get').andCallFake (endpoint) ->
      expect(endpoint).toEqual "http://lipsum.lipsum.com/feed/json"

    lipsumService.get()
