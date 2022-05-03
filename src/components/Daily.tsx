import React from 'react';

import type { Weather } from '../types';

const WeatherDaily: React.FC<Weather> = ({ date, temp, weather }) => (<div>
  <p>{date.toDateString()}</p>
  <p>{weather}</p>
  <p>{temp}</p>
</div>);

export default WeatherDaily;