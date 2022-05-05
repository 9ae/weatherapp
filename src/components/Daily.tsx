import React from 'react';
import { css } from '@emotion/css'
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 'var(--space-m) var(--space-l)',
    position: 'relative',
    borderRight: '#D8D8D8 1px solid',

    ':last-child': {
      border: 'none'
    }
  },
  '@media (min-width:1024px)': {
    height: 'fit-content',
  }
});
const iconStyle = css({
  color: 'var(--color-blue-light)'
})

const WeatherDaily: React.FC<Weather> = ({ date, temp, weather }) => (<div className={componentStyle}>
  <span className={dayStyle}>{dateFormat(date, 'ddd')}</span>
  <span className={iconStyle}><WeatherIcon name={weather} size={48} /></span>
  <span className={tempStyle}>{Math.round(temp)}</span>
</div >);

export default WeatherDaily;