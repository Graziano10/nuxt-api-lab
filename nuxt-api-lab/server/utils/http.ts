
export function ok<T>(data: T) {
  return {
    success: true,
    data
  }
}

export function badRequest(message: string) {
  throw createError({
    statusCode: 400,
    statusMessage: message
  })
}

export function notFound(message = 'Not Found') {
  throw createError({
    statusCode: 404,
    statusMessage: message
  })
}

export function serviceUnavailable(message = 'Service Unavailable') {
  throw createError({
    statusCode: 503,
    statusMessage: message
  })
}

export function internalServerError(message = 'Internal Server Error') {
  throw createError({
    statusCode: 500,
    statusMessage: message
  })
}
