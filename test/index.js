'use strict'

const test = require('tape')
const cors = require('../')

const resp = {
	headers: {},
	setHeader(name, value) {
		this.headers[name] = value
	},
}

test('empty headers', t => {
	const {request, expected} = {
		request: {
			headers: {},
		},
		expected: {
			headers: {},
		},
	}
	const response = Object.assign({}, resp)
	cors(request, response)
	t.deepEqual(response.headers, expected.headers)
	t.end()
})

test('empty origin', t => {
	const {request, expected} = {
		request: {
			headers: {
				origin: '',
			},
		},
		expected: {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Max-Age': '86400',
			},
		},
	}
	const response = Object.assign({}, resp)
	cors(request, response)
	t.deepEqual(response.headers, expected.headers)
	t.end()
})

test('filled headers', t => {
	const {request, expected} = {
		request: {
			headers: {
				origin: 'example.com',
				'access-control-request-headers': 'origin',
				'access-control-request-method': 'POST',
			},
		},
		expected: {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Max-Age': '86400',
				'Access-Control-Allow-Headers': 'origin',
				'Access-Control-Allow-Methods': 'POST',
			},
		},
	}
	const response = Object.assign({}, resp)
	cors(request, response)
	t.deepEqual(response.headers, expected.headers)
	t.end()
})

test('OPTIONS', t => {
	const {request} = {
		request: {
			headers: {},
			method: 'OPTIONS',
		},
	}
	const response = Object.assign({}, resp)
	const retVal = cors(request, response)
	t.deepEqual(response.statusCode, 204)
	t.is(retVal, true)
	t.end()
})

test('advanced setup', t => {
	const {request, expected} = {
		request: {
			headers: {
				origin: 'example.com',
				'access-control-request-headers': 'origin',
				'access-control-request-method': 'POST',
			},
		},
		expected: {
			headers: {
				'Access-Control-Allow-Origin': 'http://example.com',
				'Access-Control-Max-Age': '43200',
				'Access-Control-Allow-Headers': 'X-Custom-Header',
				'Access-Control-Allow-Methods': 'POST, GET',
			},
		},
	}
	const response = Object.assign({}, resp)
	const advCors = cors.setup({
		origin: 'http://example.com',
		maxAge: 60 * 60 * 12,
		headers: 'X-Custom-Header',
		methods: 'POST, GET',
	})
	advCors(request, response)
	t.deepEqual(response.headers, expected.headers)
	t.end()
})
