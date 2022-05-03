// TODO put the strings dependent on API
export enum TempUnit {
  F = 'imperial', // 'I'
  C = 'metric' // 'M'
}

export type Weather = {
  date: Date,
  temp: number,
  weather: string
}

export type WeatherNow = Weather & {
  windSpeed: number
}