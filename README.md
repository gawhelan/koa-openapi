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

const app = new Koa();

app.use(body());
app.use(openapi({ filepath: __dirname + '/spec.yaml' }));

...
```

## License
MIT
