interface ExternalServiceError {
  statusCode?: number
  statusMessage?: string
  data?: unknown
}

function isExternalServiceError(error: unknown): error is ExternalServiceError {
  if (typeof error !== 'object' || error === null) {
    return false
  }

  if (!('statusCode' in error)) {
    return false
  }

  const statusCode = (error as Record<string, unknown>).statusCode

  return typeof statusCode === 'number'
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type FetchBody = BodyInit | Record<string, unknown> | null | undefined

export interface HttpRequestOptions<TBody extends FetchBody = undefined> {
  method?: HttpMethod
  query?: Record<string, string | number>
  headers?: Record<string, string>
  body?: TBody
}

export async function httpRequest<TResponse, TBody extends FetchBody = undefined>(
  url: string,
  options?: HttpRequestOptions<TBody>
): Promise<TResponse> {
  try {
    const response = await $fetch(url, options)

    return response as TResponse
  } catch (err: unknown) {
    if (isExternalServiceError(err)) {
      throw createError({
        statusCode: 503,
        statusMessage: 'External service unavailable',
        data: {
          upstreamStatus: err.statusCode
        }
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
}
