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

const context = createContext<AppContextType>(DEFAULT);

export default context;