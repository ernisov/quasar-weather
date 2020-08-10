import get from 'src/utils/get'

/**
 * @type {GetForecast}
 */
export default async function (coords) {
  const API_KEY = process.env.WEATHER_API_KEY
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall'
  const result = await get(BASE_URL, {
    appid: API_KEY,
    lat: coords.lat,
    lon: coords.lng,
    lang: 'ru',
    units: 'metric'
  })

  const daily = result.daily
    .sort((a, b) => a.dt - b.dt)
    .map(day => ({
      date: new Date(day.dt * 1000),
      tempMin: day.temp.min.toFixed(0),
      tempMax: day.temp.max.toFixed(0),
      sunrise: new Date(day.sunrise * 1000),
      sunset: new Date(day.sunset * 1000),
      weather: day.weather[0]
    }))
    .slice(0, 6)

  const next24Hours = result.hourly
    .sort((a, b) => a.dt - b.dt)
    .map(hour => ({
      time: new Date(hour.dt * 1000),
      temp: hour.temp.toFixed(0),
      pop: (hour.pop * 100).toFixed(0),
      weather: hour.weather[0]
    }))
    .slice(0, 24)

  /**
   * @type {Forecast}
   */
  const forecast = {
    date: new Date(),
    current: {
      temp: result.current.temp.toFixed(0),
      rain: result.current.rain && result.current.rain['1h'],
      snow: result.current.snow && result.current.snow['1h'],
      comfort: {
        feelsLike: result.current.feels_like.toFixed(0),
        humidity: result.current.humidity,
        uvi: result.current.uvi
      },
      wind: {
        speed: result.current.wind_speed,
        direction: result.current.wind_deg,
        directionLabel: convertDegToCompassDirections(result.current.wind_deg)
      },
      weather: result.current.weather[0]
    },
    daily,
    next24Hours
  }
  return forecast
}

function convertDegToCompassDirections (deg) {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ', 'С']
  return directions[Math.ceil(deg / 45)]
}
