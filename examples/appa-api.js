var http = require('http')
var createApp = require('appa-api')
var intoStream = require('into-stream')
var app = createApp()

var send = require('../response')
var redirect = require('../redirect')
var error = require('../error')
var json = require('../json')
var html = require('../html')
var text = require('../text')

app.on('/', function (req, res) {
  send(res, 'ok')
})

app.on('/stream', function (req, res) {
  var stream = intoStream('hi')
  send(res, stream)
})

app.on('/text', function (req, res) {
  text(res, 'ok')
})

app.on('/text/stream', function (req, res) {
  var stream = intoStream('hi')
  text(res, stream)
})

app.on('/json', function (req, res) {
  json(res, 201, { message: 'hi' })
})

app.on('/json/stream', function (req, res) {
  var stream = intoStream.obj({ wut: 'wut' })
  json(res, stream)
})

app.on('/html', function (req, res) {
  html(res, 201, '<h1>hi</h1>')
})

app.on('/html/stream', function (req, res) {
  var stream = intoStream('<h1>hi</h1>')
  html(res, stream)
})

app.on('/redirect', function (req, res) {
  redirect(res, 302, 'http://127.0.0.1:3000/redirected')
})

app.on('/redirected', function (req, res) {
  send(res, 'redirected!')
})

app.on('/error', function (req, res) {
  error(res, 'Not Found')
})

http.createServer(app).listen(3000, function () {
  console.log('started on http://127.0.0.1:3000')
})
