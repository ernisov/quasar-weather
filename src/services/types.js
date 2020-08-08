/**
 * @typedef WeatherData
 * @property {string} placeId
 * @property {string} label
 * @property {Forecast} forecast
 */

/**
 * @typedef {(location: ForecastLocation) => Promise<WeatherData>} GetWeatherData
 */

/**
 * @typedef {(coords: LocationCoordinates) => Promise<Forecast>} GetForecast
 */
