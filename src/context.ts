import { createContext } from "react";

import { Weather, WeatherNow, TempUnit } from './types';

export type AppContextType = {
  tempUnit: TempUnit,
  lat: number,
  lon: number,
  now?: WeatherNow
  future: Weather[],
  isFetchPending: boolean
}

export const DEFAULT: AppContextType = {
  tempUnit: TempUnit.F,
  lat: 32.779167,
  lon: -96.808891,
  future: [],
  isFetchPending: true
}

export enum ActionType {
  //  GetWeather = 'get_weather',
  SetWeather = 'set_weather',
  ToggleTempUnit = 'toggle_temp_unit'
}

export type AppAction = {
  type: ActionType.SetWeather,
  payload: {
    now?: WeatherNow,
    future?: Weather[]
  }
} | {
  type: ActionType.ToggleTempUnit
}

export function reducer(state: AppContextType, action: AppAction): AppContextType {
  switch (action.type) {
    // case ActionType.GetWeather: {
    //   return {...state}
    // }
    case ActionType.SetWeather:
      {
        return { ...state, now: action.payload.now, future: action.payload.future, isFetchPending: false }
      }
    case ActionType.ToggleTempUnit: {
      if (state.tempUnit === TempUnit.F) {
        return { ...state, tempUnit: TempUnit.C, isFetchPending: true }
      } else {
        return { ...state, tempUnit: TempUnit.F, isFetchPending: true }
      }
    }
  }
}

const context = createContext<AppContextType>(DEFAULT);
export default context;