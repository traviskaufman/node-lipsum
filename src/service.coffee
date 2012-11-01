###
  Web Service for lipsum.org

  author: Travis Kaufman
###

http = require 'http'
url = require 'url'

lipsumService =

  get: (format, callback, queryOpts) =>
    urlopts =
      protocol: 'http:'
      hostname: 'lipsum.lipsum.com'
      pathname: "/feed/#{format}"

    if queryOpts?
      urlopts.query = queryOpts

    endpoint = url.format urlopts
    response = null
    http.get(endpoint, (res) ->
      callback(res)
    ).on('error', (err) ->
      throw new Error(err.message)
    )

module?.exports = lipsumService
