# http-cors

Respond correctly to a CORS request

## Installation

```shell
npm install http-cors
```

## Usage

```js
const http = require('http')
const cors = require('http-cors') // use default options
// const cors = require('http-cors').setup({origin:'example.com'}) // overwrite default options

var server = http.createServer(function(request, response) {
  if (cors(request, response)) return // this was an OPTIONS request - no further action needed

  // do your things
})

server.listen(process.env.PORT || 80)
```

## License

[MIT](http://opensource.org/licenses/MIT) © [src.agency](http://src.agency)
