import { TempUnit } from '../types'
import type { Weather, WeatherNow } from '../types'

const key = '4545683233d39b239fa15b83332b2deb';
const host = 'https://api.openweathermap.org/data/2.5/';

export const getNow = async (unit: TempUnit, lat: number, lon: number): Promise<WeatherNow> => {
  const response = await fetch(`${host}weather?appid=${key}&lat=${lat}&lon=${lon}&units=${unit}`)
  const data = await response.json()
  return {
    date: new Date(),
    temp: data.main.temp,
    weather: data.weather[0].main,
    windSpeed: data.wind.speed
  }
}

export const getWeather = async (unit: TempUnit, lat: number, lon: number): Promise<{ now: WeatherNow, future: Weather[] }> => {
  const response = await fetch(`${host}onecall?appid=${key}&lat=${lat}&lon=${lon}&units=${unit}&exclude=minutely,hourly,alerts`)
  const data = await response.json();
  if (data.daily.length < 6) {
    // TODO better error messaging
    throw Error("not enough days");
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
    windSpeed: data.current.wind_speed
  }
  return { now, future }
}