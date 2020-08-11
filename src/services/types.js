/**
 * ForecastLocationsAPI Interface
 * @typedef IForecastLocationsAPI
 * @property {(query: string) => Promise<ForecastLocation>} findByText
 * @property {(coordinates: LocationCoordinates) => Promise<ForecastLocation>} findByCoordinates
 * @property {(query: string) => Promise<LocationPrediction[]>} getPredictions
 */

/**
 * ForecastLocationsDatabase Interface
 * @typedef IForecastLocationsDB
 * @property {() => Promise<IForecastLocationsDB>} open
 * @property {(location: ForecastLocation) => Promise<string>} save - returns locationId
 * @property {(locationId) => Promise<ForecastLocation>} getById
 * @property {() => Promise<ForecastLocation[]>} getAll
 * @property {() => Promise<number>} count
 * @property {(location: ForecastLocation, to: number) => Promise<ForecastLocation>} reorder
 */

/**
 * Represents any location (town, city, etc.)
 * @typedef ForecastLocation
 * @property {LocationCoordinates} coords
 * @property {number?} order
 * @property {string} placeId
 * @property {string} label
 */

/**
 * Search results
 * @typedef LocationPrediction
 * @property {string} address
 * @property {string} locationId
 */

/**
 * Weather Information for given location
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
