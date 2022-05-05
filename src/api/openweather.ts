import { TempUnit } from '../types'
import type { Weather, WeatherNow } from '../types'

const key = '1f3f77076377f148191baa1c92d8d3a4';
const host = 'https://api.openweathermap.org/data/2.5/';

const tempString = (u: TempUnit): string => {
  switch (u) {
    case TempUnit.C: return 'metric';
    case TempUnit.F: return 'imperial';
  }
}

export const getWeather = async (unit: TempUnit, lat: number, lon: number): Promise<{ now: WeatherNow, future: Weather[] }> => {
  const response = await fetch(`${host}onecall?appid=${key}&lat=${lat}&lon=${lon}&units=${tempString(unit)}&exclude=minutely,hourly,alerts`)
  const data = await response.json();
  console.log('fetched weather', data);
  if (data.daily.length < 6) {
    throw Error("Error fetching next five 5 days forecast: not enough days");
  }
  const forecast = data.daily.slice(1, 6);
  const future = forecast.map((day: any) => ({
    date: new Date(day.dt * 1000),
    temp: (day.temp.min + day.temp.max) * 0.5,
    weather: day.weather[0].main
  }))

  const now: WeatherNow = {
    date: new Date(),
    temp: data.current.temp,
    weather: data.current.weather[0].main,
    windSpeed: data.current.wind_speed,
    weatherDescription: data.current.weather[0].description
  }
  return { now, future }
}