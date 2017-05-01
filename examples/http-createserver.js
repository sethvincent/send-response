var http = require('http')

var json = require('../json')

http.createServer(function (req, res) {
  if (req.url === '/') {
    json(res, { hello: 'world' })
  }
}).listen(3000)
