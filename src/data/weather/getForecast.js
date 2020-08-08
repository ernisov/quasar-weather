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
      date: day.dt,
      tempMin: day.temp.min,
      tempMax: day.temp.max,
      sunrise: day.sunrise,
      sunset: day.sunset,
      weather: day.weather
    }))

  const next24Hours = result.hourly
    .sort((a, b) => a.dt - b.dt)
    .map(hour => ({
      time: new Date(hour.dt * 1000),
      temp: hour.temp,
      pop: hour.pop,
      weather: hour.weather
    }))
    .slice(0, 24)

  /**
   * @type {Forecast}
   */
  const forecast = {
    date: new Date(),
    current: {
      temp: result.current.temp,
      rain: result.current.rain && result.current.rain['1h'],
      snow: result.current.snow && result.current.snow['1h'],
      comfort: {
        feelsLike: result.current.feels_like,
        humidity: result.current.humidity,
        uvi: result.current.uvi
      },
      wind: {
        speed: result.current.wind_speed,
        direction: result.current.wind_deg // TODO: change to abbreviations
      },
      weather: result.current.weather
    },
    daily,
    next24Hours
  }
  return forecast
}