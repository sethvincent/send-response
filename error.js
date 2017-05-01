var xtend = require('xtend')
var json = require('./json')

module.exports = function sendJSONError (res, statusCode, error, options) {
  if (typeof statusCode !== 'number') {
    error = statusCode
    statusCode = 404
  }

  var err = {}
  err.statusCode = statusCode

  if (typeof error === 'string') {
    err.message = error
  } else {
    xtend(err, error)
  }

  return json(res, statusCode, err, options)
}
