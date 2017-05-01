var assert = require('assert')

var isStream = require('is-stream')
var through = require('through2')
var pump = require('pump')
var status = require('statuses')
var mime = require('mime')

module.exports = function sendResponse (res, statusCode, data, options) {
  assert.ok(isStream(res), 'first argument must be the response stream')

  if (typeof statusCode !== 'number' && !data) {
    data = statusCode
    statusCode = 200
  }

  options = options || {}
  statusCode = statusCode || options.statusCode || 200
  var statusMessage = options.statusMessage || status[statusCode]
  var serializer = options.serializer
  var headers = options.headers || {}
  var type = options.type

  if (type) {
    headers['Content-Type'] = mime.types[type]
  }

  res.writeHead(statusCode, statusMessage, headers)

  var serialize = through.obj(function (data, enc, next) {
    this.push(serializer(data))
    next()
  })

  if (isStream(data)) {
    if (serializer) return pump(data, serialize, res)
    return pump(data, res)
  }

  if (serializer) {
    data = serializer(data)
  }

  res.end(data)
  return res
}
