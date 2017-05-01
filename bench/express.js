var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.json({ message: 'hi' })
})

app.listen(3000, function () {
  console.log('express listening on port 3000')
})
