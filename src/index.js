'use strict';

var extend = require('extend');

module.exports = Cors;

function Cors( opts ){
	if (!(this instanceof Cors))
		return new this(opts);

	extend(this, opts);
}

Cors.prototype.apply = function( request, response ){
	var origin = request.headers.origin;
	var headers = request.headers['access-control-request-headers'];
	var method = request.headers['access-control-request-method'];

	if (typeof origin !== 'undefined') {
		// can (validly) be an empty string
		response.setHeader('Access-Control-Allow-Origin', this.origin || '*');
		response.setHeader('Access-Control-Max-Age', (this.maxAge || 60 * 60 * 24).toString());
	}

	if (headers)
		response.setHeader('Access-Control-Allow-Headers', this.headers || headers);

	if (method)
		response.setHeader('Access-Control-Allow-Methods', this.methods || method);

	if (request.method === 'OPTIONS') {
		response.statusCode = 204;
		return true;
	}
};
