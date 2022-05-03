import { TempUnit } from '../types'
import type { Weather, WeatherNow } from '../types'

const key = '43ba888105bd4de9a3cc2f08d2e19b09';
const host = 'https://api.weatherbit.io/v2.0/';

export const getNow = async (unit: TempUnit, lat: number, lon: number): Promise<WeatherNow> => {
  const response = await fetch(`${host}current?key=${key}&country=US&lat=${lat}&lon=${lon}&unit=${unit}`)
  const data = await response.json()
  // TODO assert data.count >= 1
  if (data.count === 0 || data.data.length === 0) {
    throw Error("Weather data not found");
  }
  const now = data.data[0];
  return {
    date: new Date(),
    temp: now.temp,
    weather: now.weather.description,
    windSpeed: now.wind_spd
  }
}

export const getFuture = async (unit: TempUnit, lat: number, lon: number): Promise<Weather[]> => {
  const response = await fetch(`${host}forecast/daily?key=${key}&country=US&lat=${lat}&lon=${lon}&unit=${unit}&days=5`)
  const data = await response.json();
  console.log(data);
  if (data.data.length !== 5) {
    throw Error("Not enough days")
  }
  return data.data.map((day: any) => ({
    date: new Date(day.valid_date),
    temp: day.temp,
    weather: day.weather.description
  }))
}