export interface ExternalServiceError {
  statusCode?: number
  statusMessage?: string
}

function isExternalServiceError(
  error: unknown
): error is ExternalServiceError {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('statusCode' in error || 'statusMessage' in error)
  )
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type FetchBody =
  | BodyInit
  | Record<string, unknown>
  | null
  | undefined

interface HttpRequestOptions<TBody extends FetchBody = undefined> {
  method?: HttpMethod
  params?: Record<string, string | number>
  headers?: Record<string, string>
  body?: TBody
}

export async function httpRequest<TResponse, TBody extends FetchBody = undefined>(
  url: string,
  options?: HttpRequestOptions<TBody>
): Promise<TResponse> {
  try {
    const result: unknown = await $fetch(url, options)

    return result as TResponse
  } catch (err: unknown) {
    if (isExternalServiceError(err)) {
      throw createError({
        statusCode: err.statusCode ?? 502,
        statusMessage: err.statusMessage ?? 'External service error'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Unknown external service error'
    })
  }
}
