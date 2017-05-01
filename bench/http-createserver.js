var http = require('http')
var response = require('response')
var json = require('../json')
var sendData = require('send-data/json')

http.createServer(function (req, res) {
  if (req.url === '/send-response') {
    return json(res, { hello: 'world' })
  }

  if (req.url === '/response') {
    return response.json({ hello: 'world' }).pipe(res)
  }

  if (req.url === '/send-data') {
    return sendData(req, res, {
      body: { hello: 'world' },
      statusCode: 200
    })
  }

  if (req.url === '/raw') {
    res.write(JSON.stringify({ hello: 'world' }))
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end()
  }
}).listen(3000)
