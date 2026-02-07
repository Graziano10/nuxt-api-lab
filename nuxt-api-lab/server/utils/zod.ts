import { ZodError, type ZodSchema } from 'zod'
import { badRequest } from './http'

export function parseOrThrow<T>(schema: ZodSchema<T>, input: unknown): T {
  try {
    return schema.parse(input)
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const message = err.issues.at(0)?.message ?? 'Invalid request payload'

      badRequest(message)
    }

    throw err
  }
}
