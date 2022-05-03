import React from 'react';
import { css } from '@emotion/css'

import { TempUnit } from '../types';
import AppContext from '../context';
import { temperatureText } from './styleVars';
import WeatherIcon from './Icons';

const tempStyle = css({ ...temperatureText, fontSize: 'var(--size-xl)' })
const conditionStyle = css({ fontSize: 'var(--size-s)', fontWeight: 600 })
const componentStyle = css({ color: 'var(--color-blue-light)' })

const WeatherNow = () => (<AppContext.Consumer>{({ now, tempUnit }) => {
  const speedUnit = tempUnit == TempUnit.F ? "mph" : "km/h";
  return (<div className={componentStyle}>
    <p className={tempStyle}>{now?.temp}</p>
    <WeatherIcon name={now?.weather} size={64} />
    <span className={conditionStyle}>{now?.weather}</span>
    <span className={conditionStyle}>{now?.windSpeed} {speedUnit}</span>
  </div>)
}}</AppContext.Consumer>);

export default WeatherNow;