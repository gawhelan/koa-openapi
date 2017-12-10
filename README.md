# koa-openapi

Koa middleware for validating requests against an OpenAPI or Swagger 2.0
specification.

## Installation

npm

```
$ npm install koa-openapi
```

yarn

```
$ yarn add koa-openapi
```

## Usage

```js
const Koa = require('koa');
const body = require('koa-body');
const openapi = require('koa-openapi');

const specFilepath = __dirname + '/spec.yaml';

const app = new Koa();

app.use(body());
app.use(openapi({ filepath: specFilepath, verbose: true }));

...
```

If a validation error is encountered then an exception is thrown. If a
request fails to validate, then a status `400` error is thrown. If a
response fails to validate, then a status `500` error is thrown.

Details of what caused a validation error can be obtained by setting the
`verbose` flag to `true`. When set, request/response validation errors
will have an additional `details` property indicating why validation failed.

## License
MIT
