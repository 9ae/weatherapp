import { css } from '@emotion/css'
import React from 'react';
import dateFormat from "dateformat";

import type { Weather } from '../types';
import { temperatureText } from './styleVars';
import WeatherIcon from './Icons';

const tempStyle = css({
  ...temperatureText,
  fontSize: 'var(--size-l)',
});
const dayStyle = css({ fontSize: 'var(--size-s)', fontWeight: '700' });
const componentStyle = css({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  '@media (min-width:768px)': {
    flexDirection: 'column'
  }
});

const WeatherDaily: React.FC<Weather> = ({ date, temp, weather }) => (<div className={componentStyle}>
  <p className={dayStyle}>{dateFormat(date, 'ddd')}</p>
  <WeatherIcon name={weather} size={48} />
  <p className={tempStyle}>{Math.round(temp)}</p>
</div >);

export default WeatherDaily;