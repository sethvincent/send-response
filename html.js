var send = require('./response')

module.exports = function sendJSON (res, statusCode, data, options) {
  options = options || {}
  options.type = 'html'

  return send(res, statusCode, data, options)
}
