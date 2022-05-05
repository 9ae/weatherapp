import React, { useReducer, useEffect } from 'react';
import { css } from '@emotion/css'

import { Weather } from './types';
import { getWeather } from './api/openweather';
import AppContext, { DEFAULT, reducer, ActionType } from './context';
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
      if (ctx.now === null || ctx.isFetchPending) {
        const { now, future } = await getWeather(tempUnit, lat, lon)
        dispatch({ type: ActionType.SetWeather, payload: { now, future } });
      }
    })();

    /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('got location', position);
          dispatch({
            type: ActionType.SetPlace, payload: {
              lon: position.coords.longitude,
              lat: position.coords.longitude,
              city: 'TODO get city from API'
            }
          })
        }, (error) => {
          console.error(error)
        });
    }
    */

  });

  const hr = (new Date()).getHours();

  const mainStyle = css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',

    '@media (min-width:1024px)': {
      width: '670px',
      minHeight: '510px',
      borderRadius: '3px',
      margin: '0 auto',
      marginTop: 'var(--space-m)',
      ':before': {
        content: '""',
        backgroundImage: `url(${process.env.PUBLIC_URL}/cloud_left.svg)`,
        backgroundRepeat: 'no-repeat',
        display: 'block',
        width: '145px',
        height: '83px',
        position: 'absolute',
        left: ctx.now === null ? '-145px' : '-90px',
        bottom: '212px',
        transition: 'left 2s',
      },
      ':after': {
        content: '""',
        backgroundImage: `url(${process.env.PUBLIC_URL}/cloud_right.svg)`,
        backgroundRepeat: 'no-repeat',
        display: 'block',
        width: '207px',
        height: '113px',
        position: 'absolute',
        right: ctx.now === null ? '-208px' : '-90px',
        top: '50px',
        transition: 'right 2s',
      }
    }
  });

  const desktopOnlyLocationStyle = css({
    display: 'none',
    '@media (min-width:1024px)': {
      display: 'block',
      marginTop: 'var(--space-l)',
      color: 'white'
    },
  });

  const mobileOnlyControlsStyle = css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 'var(--space-s)',
    paddingBottom: '40px',
    '@media (min-width:768px)': {
      display: 'none'
    },
    color: (hr < 5 || hr > 17) ? "white" : "black"
  })

  const forecaseStyle = css({
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
  });

  const gradients = [
    '', // day
    'linear-gradient(#560498, #EEA3A3),', // sunset
    'linear-gradient(rgba(15,12,49,0.9), rgba(86,4,152,0.4)),', // night
    'linear-gradient(#7FF7FF, #FFD394),', // sunrise
  ];
  let effect = gradients[0];
  if (hr > 5 && hr < 8) {
    effect = gradients[3]
  } else if (hr > 17 && hr < 20) {
    effect = gradients[1]
  } else if (hr < 5 || hr > 20) {
    effect = gradients[2]
  }


  const contentStyle = css({
    backgroundColor: 'var(--color-sky)',
    backgroundImage: `${effect} url(${process.env.PUBLIC_URL}/dallas.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom center',
    backgroundBlendMode: effect !== '' ? 'multiply, normal' : 'normal',
    width: '100%',
    boxSizing: 'border-box',

    // mobile specs
    height: '360px',
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

  })

  const controlsStyle = css({
    display: 'flex',
    gap: 'var(--space-m)',
    alignItems: 'center',
    height: 'max-content',
    marginRight: 'var(--space-m)',
    marginTop: 'var(--space-s)',

  })

  return (
    <AppContext.Provider value={ctx}>

      <div className={desktopOnlyLocationStyle}><WhereWhen /></div>
      <div className={mainStyle}>
        <div className={contentStyle}>
          <div className={mobileOnlyControlsStyle}>
            <WhereWhen />
            <SwitchTemp dispatch={dispatch} />
          </div>
          <WeatherNow />
          <div className={controlsStyle}>
            <div className={tabletOnly}><WhereWhen /></div>
            <div className={tabletOrLarger}><SwitchTemp dispatch={dispatch} /></div>
          </div>
        </div>

        <div className={forecaseStyle}>
          {ctx.future && ctx.future.map((day: Weather, i: number) => <WeatherDaily key={i} {...day} />)}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
