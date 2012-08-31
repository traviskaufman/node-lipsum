###
  Web Service for lipsum.org

  author: Travis Kaufman
###

http = require 'http'
url = require 'url'

lipsumService =

  get: (queryOpts, format, callback) =>
    format = if format? then format else 'json'

    urlopts =
      protocol: 'http:'
      hostname: 'lipsum.lipsum.com'
      pathname: "/feed/#{format}"

    if queryOpts?
      url.query = queryOpts

    endpoint = url.format urlopts
    response = null
    http.get(endpoint, (res) ->
      response = res
    ).on('error', (err) ->
      throw new Error(err.message)
    )
    callback = if callback? then callback else (resp) ->
        return resp
    return callback(response)

module.exports = lipsumService
