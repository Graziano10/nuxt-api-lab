export interface CreatePolygonPayload {
  name: string
  geo_json: unknown
}

export function useAgroPolygon() {
  const createPolygon = async (payload: CreatePolygonPayload) => {
    return await $fetch('/api/agro/polygon', {
      method: 'POST',
      body: payload
    })
  }

  return {
    createPolygon
  }
}
