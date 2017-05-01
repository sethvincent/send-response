var send = require('./response')

module.exports = function sendRedirect (res, statusCode, location, options) {
  options = options || {}
  options.headers = options.headers || {}
  options.headers['Location'] = location

  return send(res, statusCode, null, options)
}
