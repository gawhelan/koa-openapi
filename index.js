const {
  loadDocumentSync,
  validateDocument,
  compileDocument,
  validateRequest,
  validateResponse,
} = require('swagger2');

module.exports = function validate({ filepath, verbose = false }) {
  const document = loadDocumentSync(filepath);
  if (!validateDocument(document)) {
    throw new Error(`Invalid OpenAPI 2.0 document: ${filepath}`);
  }

  const compiled = compileDocument(document);

  return async (ctx, next) => {
    const compiledPath = compiled(ctx.path);
    if (compiledPath === undefined) {
      ctx.throw(404);
    }

    const { method, headers, query, body: reqBody } = ctx.request;
    const reqErrors = validateRequest(
      compiledPath,
      method,
      query,
      reqBody,
      headers,
      ctx.params,
    );

    if (reqErrors === undefined) {
      ctx.throw(405);
    }

    if (reqErrors.length > 0) {
      if (verbose) {
        ctx.throw(400, { details: { request: reqErrors } });
      } else {
        ctx.throw(400);
      }
    }

    await next();

    const { status, body: resBody } = ctx;
    const resErrors = validateResponse(compiledPath, method, status, resBody);
    if (resErrors) {
      if (verbose) {
        ctx.throw(500, { details: { response: resErrors } });
      } else {
        ctx.throw(500);
      }
    }
  };
};
