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
    return weather
  }
}
