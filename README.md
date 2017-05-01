# send-response

Send HTTP responses.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/send-response.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/send-response
[travis-image]: https://img.shields.io/travis/sethvincent/send-response.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/send-response
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## Install

```sh
npm install --save send-response
```

## Usage

```js
var intoStream = require('into-stream')

var json = require('send-response/json')
var html = require('send-response/html')
var text = require('send-response/text')
var error = require('send-response/error')
var redirect = require('send-response/redirect')

// send a text response
function textResponse (req, res) {
  text(res, 'ok')
}

// stream text to the response
function textStreamResponse (req, res) {
  var stream = intoStream('hi')
  text(res, 200, stream)
}

// respond with json
function jsonResponse (req, res) {
  json(res, 201, { message: 'hi' })
}

// stream json to the response
function jsonStreamResponse (req, res) {
  var stream = intoStream.obj({ wut:'wut' })
  json(res, stream)
}

// respond with html
function htmlResponse (req, res) {
  html(res, 201, '<h1>hi</h1>')
}

// stream html to the response
function htmlStreamResponse (req, res) {
  var stream = intoStream('<h1>hi</h1>')
  html(res, stream)
}

// redirect a request to another url
function redirectResponse (req, res) {
  redirect(res, 302, 'http://127.0.0.1:3000/redirected')
}

// example of redirected handler
function redirected (req, res) {
  send(res, 'redirected!')
}

// send an error response with JSON: { statusCode: 404, message: 'Not Found' }
function errorJsonResponse (req, res) {
  error(res, 'Not Found')
}
```

# Examples

- [appa-api](appa-api.js) examples of using send-response with appa-api
- [http](http-createserver.js) examples using node's http module

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/send-response/issues)

## License

[ISC](LICENSE.md)
