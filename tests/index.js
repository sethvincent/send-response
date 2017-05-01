var request = require('request')
var http = require('http')

var tape = require('tape')
var intoStream = require('into-stream')

var send = require('../')

var server = http.createServer(function (req, res) {
  if (req.url === '/json') return send.json(res, {test: 1})
  if (req.url === '/json/status') return send.json(res, 201, {test: 2})
  if (req.url === '/json/stream') return send.json(res, intoStream.obj({test: 3}))
  if (req.url === '/text') return send.text(res, 'hi')
  if (req.url === '/text/stream') return send.text(res, 201, intoStream('hi'))
  if (req.url === '/html') return send.html(res, '<h1>hi</h1>')
  if (req.url === '/html/stream') return send.html(res, 201, intoStream('<h1>hi</h1>'))
})

server.listen(8082, function () {
  tape.test('basic json', function (t) {
    t.plan(3)

    request('http://localhost:8082/json', {json: true}, function (e, resp, body) {
      if (e) return t.error(e)
      t.equal(resp.statusCode, 200)
      t.equal(resp.headers['content-type'], 'application/json')
      t.deepEqual(body, {test: 1})
    })
  })

  tape.test('basic json status code', function (t) {
    t.plan(3)

    request('http://localhost:8082/json/status', {json: true}, function (e, resp, body) {
      if (e) return t.error(e)
      t.equal(resp.statusCode, 201)
      t.equal(resp.headers['content-type'], 'application/json')
      t.deepEqual(body, {test: 2})
    })
  })

  tape.test('json stream', function (t) {
    t.plan(3)

    request('http://localhost:8082/json/stream', {json: true}, function (e, resp, body) {
      if (e) return t.error(e)
      t.equal(resp.statusCode, 200)
      t.equal(resp.headers['content-type'], 'application/json')
      t.deepEqual(body, {test: 3})
    })
  })

  tape.test('text', function (t) {
    t.plan(3)

    request('http://localhost:8082/text', function (e, resp, body) {
      if (e) return t.error(e)
      t.equal(resp.statusCode, 200)
      t.equal(resp.headers['content-type'], 'text/plain')
      t.equal(body, 'hi')
    })
  })

  tape.test('text stream', function (t) {
    t.plan(3)

    request('http://localhost:8082/text/stream', function (e, resp, body) {
      if (e) return t.error(e)
      t.equal(resp.statusCode, 201)
      t.equal(resp.headers['content-type'], 'text/plain')
      t.equal(body, 'hi')
    })
  })

  tape.test('html', function (t) {
    t.plan(3)

    request('http://localhost:8082/html', function (e, resp, body) {
      if (e) return t.error(e)
      t.equal(resp.statusCode, 200)
      t.equal(resp.headers['content-type'], 'text/html')
      t.equal(body, '<h1>hi</h1>')
    })
  })

  tape.test('html stream', function (t) {
    t.plan(3)

    request('http://localhost:8082/html/stream', function (e, resp, body) {
      if (e) return t.error(e)
      t.equal(resp.statusCode, 201)
      t.equal(resp.headers['content-type'], 'text/html')
      t.equal(body, '<h1>hi</h1>')
    })
  })

  tape.test('cleanup', function (t) {
    server.close()
    t.end()
  })
})
