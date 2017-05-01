var safeStringify = require('fast-safe-stringify')
var send = require('./response')

module.exports = function sendJSON (res, statusCode, data, options) {
  options = options || {}
  options.type = 'json'
  options.objectMode = true
  options.serializer = options.serializer || serializeJSON

  function serializeJSON (chunk) {
    return safeStringify(chunk)
  }

  return send(res, statusCode, data, options)
}
