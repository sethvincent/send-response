const fastify = require('fastify')

const schema = {
  out: {
    type: 'object',
    properties: {
      message: {
        type: 'string'
      }
    }
  }
}

var app = fastify()

app.get('/', schema, function (req, reply) {
  reply.header('Content-Type', 'application/json').code(200)
  reply.send({ message: 'hi' })
})

app.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${app.server.address().port}`)
})
