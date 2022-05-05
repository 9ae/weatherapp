import React from 'react';
import { css } from '@emotion/css'

import { TempUnit } from '../types';
import AppContext from '../context';
import { temperatureText } from './styleVars';
import WeatherIcon from './Icons';

const tempStyle = css({ ...temperatureText, fontSize: 'var(--size-xl)' })
const conditionStyle = css({ fontSize: 'var(--size-s)', fontWeight: 600 })
const componentStyle = css({
  color: 'var(--color-blue-light)',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (min-width:768px)': {
    justifyContent: 'flex-start',
    alignSelf: 'self-start'
  },
  //  '@media (min-width:1024px)': {}
})

const WeatherNow = () => (<AppContext.Consumer>{({ now, tempUnit }) => {
  const speedUnit = tempUnit === TempUnit.F ? "mph" : "km/h";
  return (<div className={componentStyle}>
    <div className={tempStyle}>{now?.temp || " "}</div>
    <WeatherIcon name={now?.weather} size={64} />
    <div className={conditionStyle}>
      <span style={{ textTransform: 'capitalize' }}>{now?.weatherDescription || " "}</span><br />
      {now?.windSpeed || "0"} {speedUnit}
    </div>
  </div>)
}}</AppContext.Consumer>);

export default WeatherNow;