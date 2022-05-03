import React from 'react';

import AppContext from '../context';

const WeatherNow = () => (<AppContext.Consumer>{({ now }) => (<div>
  <h1>{now?.temp}</h1>
  <p>{now?.weather}</p>
  <p>{now?.windSpeed}</p>
</div>)}</AppContext.Consumer>);

export default WeatherNow;