import { createContext } from "react";

import { Weather, WeatherNow, TempUnit } from './types';

export type AppContextType = {
  tempUnit: TempUnit,
  lat: number,
  lon: number,
  now?: WeatherNow
  future?: Weather[]
}

export const DEFAULT: AppContextType = {
  tempUnit: TempUnit.F,
  lat: 32.779167,
  lon: -96.808891
}

export enum ActionType {
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
    case ActionType.SetWeather:
      {
        if (action.payload.now) {
          return { ...state, now: action.payload.now }
        }
        if (action.payload.future) {
          return { ...state, future: action.payload.future }
        }
        break;
      }
    case ActionType.ToggleTempUnit: {
      if (state.tempUnit === TempUnit.F) {
        return { ...state, tempUnit: TempUnit.C }
      } else {
        return { ...state, tempUnit: TempUnit.F }
      }
    }
  }
}

const context = createContext<AppContextType>(DEFAULT);
export default context;