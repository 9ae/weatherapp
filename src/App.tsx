import React, { useState, useEffect } from 'react';
import { getNow, getFuture } from './openweather';
import AppContext, { DEFAULT, AppContextType } from './context';

function App() {
  // TODO use geo location API
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

  const [ctx, setCtx] = useState<AppContextType>(DEFAULT);
  const { tempUnit, lat, lon } = ctx;

  useEffect(() => {
    (async () => {
      if (!ctx.now) {
        const now = await getNow(tempUnit, lat, lon)
        setCtx({ ...ctx, now });
        console.log('now', now);
      }

      if (!ctx.future) {
        const future = await getFuture(tempUnit, lat, lon)
        console.log('future', future);
        setCtx({ ...ctx, future })
      }
    })();
  });

  return (
    <AppContext.Provider value={ctx}>
      <p>{ctx.now?.weather || '...fetching weather'}</p>
    </AppContext.Provider>
  );
}

export default App;
