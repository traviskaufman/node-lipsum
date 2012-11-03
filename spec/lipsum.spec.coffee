###
# Integration test for Lipsum Service
###

Lipsum = require('../lib/lipsum')

describe "Node-Lipsum", ->
  lipsum = new Lipsum()
  text = null

  beforeEach ->
  
  afterEach ->
    text = null

  it "should return dummy text", ->
    lipsum.getText (res) ->
      text = res
    
    waitsFor ->
      return text
    , "text to be returned", 1000

  it "can return dummy text starting with lorem ipsum", ->
    lipsum.getText (res) ->
      text = res
    , {start: true}

    waitsFor ->
      return text
    , "text to be returned", 1000

    expect(text).toContain("Lorem ipsum dolor sit amet")

  it "can return different lengths of either paragraphs, words, " +
     "or bytes", ->
    lipsum.getText (res) ->
      text = res
    , {start: 'yes', what: 'words', amount: 10}

    waitsFor ->
      return text
    , "text to be returned", 1000

    expect(text.split(" ").length).toEqual(10)
