export interface AgroWeatherItem {
  dt: number
  temp: {
    average: number
    min?: number
    max?: number
  }
}
