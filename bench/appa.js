var http = require('http')
var createApp = require('appa-api')

var response = require('response')
var sendData = require('send-data/json')
var json = require('../json')

var app = createApp()

app.on('/send-response', function (req, res) {
  json(res, 201, { message: 'hi' })
})

app.on('/response', function (req, res) {
  response.json({ message: 'hi' }).pipe(res)
})

app.on('/send-data', function (req, res) {
  sendData(req, res, {
    body: { hello: 'world' },
    statusCode: 200
  })
})

app.on('/raw', function (req, res) {
  res.write(JSON.stringify({ message: 'hi' }))
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end()
})

http.createServer(app).listen(3000, function () {
  console.log('started on http://127.0.0.1:3000')
})
