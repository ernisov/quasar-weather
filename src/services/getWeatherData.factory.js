import {
  getHours,
  getMonth,
  getWeekDay
} from 'src/utils/date'

/**
 * @param {GetForecast} getForecast
 * @returns {GetWeatherData}
 */
export default function (getForecast) {
  return async function (location) {
    const { locationId, label, coords } = location
    const forecast = await getForecast(coords)

    /**
     * @type {WeatherData}
     */
    const weather = {
      locationId,
      label,
      forecast
    }
    return formatWeatherData(weather)
  }
}

/**
 * WeatherData presenter
 * @param {WeatherData} weatherData
 * @returns {WeatherDataViewModel}
 */
function formatWeatherData (weatherData) {
  const today = weatherData.forecast.daily[0]

  const next24Hours = weatherData.forecast.next24Hours.map(h => ({
    time: getHours(h.time),
    icon: h.weather.icon,
    temp: h.temp,
    pop: h.pop
  }))

  const daily = weatherData.forecast.daily.map(d => ({
    date: {
      weekDay: getWeekDay(d.date),
      day: d.date.getDate(),
      month: getMonth(d.date)
    },
    icon: d.weather.icon,
    tempMax: d.tempMax,
    tempMin: d.tempMin
  }))

  return {
    locationId: weatherData.locationId,
    main: {
      currentTemp: weatherData.forecast.current.temp,
      tempMax: today.tempMax,
      tempMin: today.tempMin,
      location: weatherData.label,
      dateUpdated: getHours(weatherData.forecast.date),
      description: weatherData.forecast.current.weather.description
    },
    comfort: weatherData.forecast.current.comfort,
    daytime: {
      sunrise: getHours(today.sunrise),
      sunset: getHours(today.sunset),
      percentOfDaytimeLeft: getPercentOfDaytimeLeft(today.sunrise, today.sunset)
    },
    wind: {
      direction: weatherData.forecast.current.wind.directionLabel,
      speed: weatherData.forecast.current.wind.speed
    },
    next24Hours,
    daily
  }
}

/**
 *
 * @param {Date} sunrise
 * @param {Date} sunset
 */
function getPercentOfDaytimeLeft (sunrise, sunset) {
  const now = Date.now()
  const sunriseTime = sunrise.getTime()
  const sunsetTime = sunset.getTime()
  const daytime = sunsetTime - sunriseTime

  if (now - sunriseTime <= 0) {
    return 1
  }

  if (now - sunsetTime >= 0) {
    return 0
  }

  return +(now / daytime).toFixed(2)
}
