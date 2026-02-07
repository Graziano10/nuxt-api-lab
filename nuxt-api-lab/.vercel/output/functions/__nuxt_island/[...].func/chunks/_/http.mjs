import { c as createError } from './nitro.mjs';

function httpError(statusCode, statusMessage, code) {
  throw createError({
    statusCode,
    statusMessage,
    data: { code }
  });
}
function ok(data) {
  return {
    success: true,
    data
  };
}
function badRequest(message) {
  httpError(400, message, "VALIDATION_ERROR");
}
function serviceUnavailable(message = "Service Unavailable") {
  httpError(503, message, "EXTERNAL_SERVICE_ERROR");
}

export { badRequest as b, ok as o, serviceUnavailable as s };
//# sourceMappingURL=http.mjs.map
