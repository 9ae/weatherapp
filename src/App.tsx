import React, { useReducer, useEffect } from 'react';
import { css } from '@emotion/css'

import { Weather } from './types';
import { getWeather } from './api/openweather';
import AppContext, { DEFAULT, AppContextType, reducer, ActionType } from './context';
import WeatherNow from './components/Now';
import WeatherDaily from './components/Daily';
import SwitchTemp from './components/SwitchTemp';
import WhereWhen from './components/WhereWhen';

const tabletOnly = css({
  display: 'none',
  '@media (min-width:768px)': {
    display: 'block'
  },
  '@media (min-width:1024px)': {
    display: 'none'
  }
})

const tabletOrLarger = css({
  display: 'none',
  '@media (min-width:768px)': {
    display: 'block'
  },
})

function App() {
  const [ctx, dispatch] = useReducer(reducer, DEFAULT);
  const { tempUnit, lat, lon } = ctx;

  useEffect(() => {
    (async () => {
      const { now, future } = await getWeather(tempUnit, lat, lon)
      dispatch({ type: ActionType.SetWeather, payload: { now, future } });
    })();
  });

  return (
    <AppContext.Provider value={ctx}>

      <div className={css({
        display: 'none',
        '@media (min-width:1024px)': {
          display: 'block',
          marginTop: 'var(--space-l)',
          color: 'white'
        },
      })}><WhereWhen /></div>
      <div className={css({
        backgroundColor: 'var(--color-sky)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',

        '@media (min-width:1024px)': {
          width: '670px',
          minHeight: '510px',
          borderRadius: '3px',
          margin: '0 auto',
          marginTop: 'var(--space-m)'
        }
      })}>
        <div className={css({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 'var(--space-s)',
          '@media (min-width:768px)': {
            display: 'none'
          }
        })}>
          <WhereWhen />
          <SwitchTemp dispatch={dispatch} />
        </div>

        <div className={css({
          backgroundImage: `url(${process.env.PUBLIC_URL}/dallas.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          width: '100%',
          boxSizing: 'border-box',

          // mobile specs
          height: '260px',
          marginTop: '40px',
          backgroundSize: 'contain',

          '@media (min-width:768px)': {
            height: 'auto',
            minHeight: '500px',
            flexGrow: 1,
            backgroundSize: 'cover',
            marginTop: 0,
            padding: 'var(--size-s)',
            display: 'flex',
            justifyContent: 'space-between',
          },

          '@media (min-width:1024px)': {
            height: '368px',
            minHeight: 'unset'
          }

        })}>
          <WeatherNow />
          <div className={css({
            display: 'flex',
            gap: 'var(--space-m)',
            alignItems: 'center',
            height: 'max-content',
            marginRight: 'var(--space-m)',
            marginTop: 'var(--space-s)',

          })}>
            <div className={tabletOnly}><WhereWhen /></div>
            <div className={tabletOrLarger}><SwitchTemp dispatch={dispatch} /></div>
          </div>
        </div>

        <div className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-s)',
          backgroundColor: '#fff',
          boxShadow: '0 0 15px 0 rgba(0,0,0,0.2)',
          flexGrow: 2,
          '@media (min-width:768px)': {
            flexDirection: 'row',
            gap: 'unset',
            justifyContent: 'center',
            flexGrow: 1,
            height: 'max-content',
          },
          '@media (min-width:1024px)': {
            borderRadius: '0 0 3px 3px',
          }
        })}>
          {ctx.future && ctx.future.map((day: Weather, i: number) => <WeatherDaily key={i} {...day} />)}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
