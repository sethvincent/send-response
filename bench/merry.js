var merry = require('merry')
var http = require('http')

var env = merry.env({ PORT: 3000 })
var app = merry()

app.router([
  [ '/', homePath ]
])

function homePath (req, res, ctx, done) {
  done(null, { message: 'hi' })
}

var server = http.createServer(app.start())
server.listen(env.PORT)
