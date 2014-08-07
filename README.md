# http-cors

Respond correctly to a CORS request

## Installation

```shell
npm install http-cors
```

## Usage

```js
var http = require('http');
var HttpCors = require('http-cors');

// configure (all allowed - see source for options)
var cors = new HttpCors();

var server = http.createServer(function( request, response ){
	if (cors.apply(request, response))
		return;	// this was an OPTIONS request - no further action needed

	// do your things
});

server.listen(process.env.PORT || 80);
```

## License

[MIT](http://opensource.org/licenses/MIT) © [src.agency](http://src.agency)
