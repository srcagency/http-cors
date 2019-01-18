'use strict'

function setup({origin = '*', maxAge = 60 * 60 * 24, headers, methods}) {
	return (request, response) => {
		const reqOrigin = request.headers.origin
		const reqHeaders = request.headers['access-control-request-headers']
		const reqMethod = request.headers['access-control-request-method']

		if (typeof reqOrigin !== 'undefined') {
			// can (validly) be an empty string
			response.setHeader('Access-Control-Allow-Origin', origin)
			response.setHeader('Access-Control-Max-Age', maxAge.toString())
		}

		if (reqHeaders)
			response.setHeader(
				'Access-Control-Allow-Headers',
				headers || reqHeaders
			)

		if (reqMethod)
			response.setHeader(
				'Access-Control-Allow-Methods',
				methods || reqMethod
			)

		if (request.method === 'OPTIONS') {
			response.statusCode = 204
			return true
		}
		return false
	}
}

module.exports = setup({})
module.exports.setup = setup
