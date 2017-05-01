var send = require('./response')

module.exports = function sendText (res, statusCode, data, options) {
  options = options || {}
  options.type = 'text'

  return send(res, statusCode, data, options)
}
