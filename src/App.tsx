import React, { useState, useEffect } from 'react';
import { getNow, getFuture } from './api/openweather';
import AppContext, { DEFAULT, AppContextType } from './context';

import WeatherNow from './components/Now';
import WeatherDaily from './components/Daily';
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
  const [ctx, setCtx] = useState<AppContextType>(defaultCtx);
  const { tempUnit, lat, lon } = ctx;

  const saveContext = (newCtx: AppContextType) => {
    setCtx(newCtx)
    localStorage.setItem("ctx", JSON.stringify(newCtx))
  }

  useEffect(() => {
    (async () => {
      if (!ctx.now) {
        const now = await getNow(tempUnit, lat, lon)
        saveContext({ ...ctx, now });
      }

      if (!ctx.future) {
        const future = await getFuture(tempUnit, lat, lon)
        saveContext({ ...ctx, future })
      }
    })();
  });

  return (
    <AppContext.Provider value={ctx}>
      <WeatherNow />

      <div style={{ display: "inline-block" }}>
        {ctx.future && ctx.future.map((day: Weather, i: number) => <WeatherDaily key={i} {...day} />)}
      </div>
    </AppContext.Provider>
  );
}

export default App;
