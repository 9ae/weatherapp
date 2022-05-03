import React from "react";

import {
  WiThunderstorm, WiSprinkle, WiRain,
  WiSnowflakeCold, WiDaySunny, WiCloudy,
  WiFog, WiSmoke, WiRainWind, WiTornado
} from "react-icons/wi";

const WeatherIcon: React.FC<{ name: string, size: number }> = ({ name, size }) => {
  switch (name) {
    case 'Thunderstorm':
      return <WiThunderstorm size={size} />
    case 'Drizzle':
      return <WiSprinkle size={size} />
    case 'Rain':
      return <WiRain size={size} />
    case 'Snow':
      return <WiSnowflakeCold size={size} />
    case 'Mist':
    case 'Haze':
    case 'Fog': {
      return <WiFog size={size} />
    }
    case 'Smoke':
    case 'Dust':
    case 'Sand':
    case 'Ash': {
      return <WiSmoke size={size} />
    }
    case 'Clouds':
      return <WiCloudy size={size} />
    case 'Squall':
      return <WiRainWind size={size} />
    case 'Tornado':
      return <WiTornado size={size} />
    default:
      return <WiDaySunny size={size} />
  }
}

export default WeatherIcon;