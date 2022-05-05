import React, { useReducer, useEffect } from 'react';
import { getNow, getFuture } from './api/openweather';
import AppContext, { DEFAULT, AppContextType, reducer, ActionType } from './context';

import WeatherNow from './components/Now';
import WeatherDaily from './components/Daily';
import SwitchTemp from './components/SwitchTemp';
import { Weather } from './types';

function getFromStorage(): AppContextType {
  const savedCtx = localStorage.getItem("ctx");
  if (savedCtx) {
    const parsed = JSON.parse(savedCtx);
    if (parsed.now) {
      parsed.now.date = new Date(parsed.now.date);
    }
    if (parsed.future) {
      for (let i = 0; i < parsed.future.length; i++) {
        const day = parsed.future[i];
        parsed.future[i].date = new Date(day.date);
      }
    }
    return parsed as AppContextType;
  }
  return DEFAULT;
}

function App() {
  // TODO use geo location API
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

  const defaultCtx = getFromStorage();
  const [ctx, dispatch] = useReducer(reducer, defaultCtx);
  const { tempUnit, lat, lon } = ctx;

  useEffect(() => {
    (async () => {
      if (!ctx.now) {
        const now = await getNow(tempUnit, lat, lon)
        dispatch({ type: ActionType.SetWeather, payload: { now } });
      }

      if (!ctx.future) {
        const future = await getFuture(tempUnit, lat, lon)
        dispatch({ type: ActionType.SetWeather, payload: { future } });
      }
    })();
  });

  return (
    <AppContext.Provider value={ctx}>
      <SwitchTemp dispatch={dispatch} />

      <WeatherNow />

      <div style={{ display: "inline-block" }}>
        {ctx.future && ctx.future.map((day: Weather, i: number) => <WeatherDaily key={i} {...day} />)}
      </div>
    </AppContext.Provider>
  );
}

export default App;
