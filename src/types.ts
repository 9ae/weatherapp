export enum TempUnit {
  F,
  C
}

export type Weather = {
  date: Date,
  temp: number,
  weather: string
}

export type WeatherNow = Weather & {
  windSpeed: number
}