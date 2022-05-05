import { TempUnit } from '../types'
import type { Weather, WeatherNow } from '../types'

const key = '43ba888105bd4de9a3cc2f08d2e19b09';
const host = 'https://api.weatherbit.io/v2.0/';

const tempString = (u: TempUnit): string => {
  switch (u) {
    case TempUnit.C: return 'M';
    case TempUnit.F: return 'I';
  }
}

export const getWeather = async (unit: TempUnit, lat: number, lon: number): Promise<{ now: WeatherNow, future: Weather[] }> => {
  const nowReq = await fetch(`${host}current?key=${key}&country=US&lat=${lat}&lon=${lon}&unit=${tempString(unit)}`)
  const data = await nowReq.json()
  if (data.count === 0 || data.data.length === 0) {
    throw Error("Weather data not found");
  }
  const nowData = data.data[0];
  const now = {
    date: new Date(),
    temp: nowData.temp,
    weather: nowData.weather.description,
    windSpeed: nowData.wind_spd
  }

  const futureReq = await fetch(`${host}forecast/daily?key=${key}&country=US&lat=${lat}&lon=${lon}&unit=${tempString(unit)}&days=5`)
  const futureData = await futureReq.json();
  if (futureData.data.length !== 5) {
    throw Error("Error fetching next five 5 days forecast: Not enough days")
  }
  const future = futureData.data.map((day: any) => ({
    date: new Date(day.valid_date),
    temp: day.temp,
    weather: day.weather.description
  }))

  return { now, future };
}