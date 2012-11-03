###
  Web Service for lipsum.org

  author: Travis Kaufman
###

http = require 'http'
url = require 'url'

class Service

  get: (format, callback, queryOpts) ->
    urlopts =
      protocol: 'http:'
      hostname: 'lipsum.lipsum.com'
      pathname: "/feed/#{format}"

    if queryOpts?
      urlopts.query = queryOpts

    endpoint = url.format urlopts
    req = http.request(endpoint, (res) ->
      payload = ""
      res.setEncoding('utf8')

      res.on('data', (chunk) ->
        payload += chunk
      )

      res.on('end', ->
        callback(payload)
      )
    ).on('error', (err) ->
      throw new Error(err.message)
    )

    req.end()

module?.exports = Service
