const swagger = require('swagger2');
const swaggerKoa = require('swagger2-koa');

module.exports = function (options) {
  const opts = options || {};

  const document = swagger.loadDocumentSync(opts.filepath);
  if (!swagger.validateDocument(document)) {
    throw new Error('Specification is not a valid OpenAPI v2 document!');
  }

  return swaggerKoa.validate(document);
}
