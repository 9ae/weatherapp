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
  alignItems: 'flex-end'
})

const WeatherNow = () => (<AppContext.Consumer>{({ now, tempUnit }) => {
  const speedUnit = tempUnit == TempUnit.F ? "mph" : "km/h";
  return (<div className={componentStyle}>
    <div className={tempStyle}>{now?.temp}</div>
    <WeatherIcon name={now?.weather} size={48} />
    <div className={conditionStyle}>
      {now?.weather}<br />
      {now?.windSpeed} {speedUnit}
    </div>
  </div>)
}}</AppContext.Consumer>);

export default WeatherNow;