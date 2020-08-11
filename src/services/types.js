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
 * @property {string} locationId
 * @property {string} label
 * @property {Forecast} forecast
 */

/**
 * Weather data formatted
 * @typedef WeatherDataViewModel
 * @property {string} locationId
 * @property {object} main
 * @property {number} main.currentTemp
 * @property {number} main.tempMax
 * @property {number} main.tempMin
 * @property {string} main.location
 * @property {string} main.description
 * @property {string} main.dateUpdated in HH:mm format
 * @property {HourlyViewModel[]} next24Hours
 * @property {DailyViewModel[]} daily
 * @property {object} comfort
 * @property {number} comfort.humidity
 * @property {number} comfort.feelsLike
 * @property {number} comfort.uvi
 * @property {object} wind
 * @property {string} wind.direction
 * @property {number} wind.speed
 * @property {object} daytime
 * @property {string} daytime.sunrise
 * @property {string} daytime.sunset
 * @property {number} daytime.percentOfDaytimeLeft
 * @property {Date} daytime.localTime
 */

/**
 * Hourly data formatted
 * @typedef HourlyViewModel
 * @property {string} time HH:mm format
 * @property {string} icon - url
 * @property {number} temp
 * @property {number?} pop
 */
/**
 * Daily data formatted
 * @typedef DailyViewModel
 * @property {object} date
 * @property {string} date.weekDay
 * @property {number} date.day
 * @property {string} date.month
 * @property {string} icon - url
 * @property {number} tempMax
 * @property {number} tempMin
 */

/**
 * @typedef {(location: ForecastLocation) => Promise<WeatherDataViewModel>} GetWeatherData
 */

/**
 * @typedef {(coords: LocationCoordinates) => Promise<Forecast>} GetForecast
 */
