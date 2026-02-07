export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'EXTERNAL_SERVICE_ERROR'
  | 'INTERNAL_ERROR'

/**
 * Internal error factory (NON esportata)
 */
function httpError(statusCode: number, statusMessage: string, code: ErrorCode): never {
  throw createError({
    statusCode,
    statusMessage,
    data: { code }
  })
}

/**
 * Success response
 */
export function ok<T>(data: T) {
  return {
    success: true,
    data
  }
}

/**
 * 4xx / 5xx helpers
 */
export function badRequest(message: string): never {
  httpError(400, message, 'VALIDATION_ERROR')
}

export function notFound(message = 'Not Found'): never {
  httpError(404, message, 'NOT_FOUND')
}

export function serviceUnavailable(message = 'Service Unavailable'): never {
  httpError(503, message, 'EXTERNAL_SERVICE_ERROR')
}

export function internalServerError(message = 'Internal Server Error'): never {
  httpError(500, message, 'INTERNAL_ERROR')
}
