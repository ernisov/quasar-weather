/**
 * @typedef Forecast
 * @property {Date}             date
 * @property {CurrentWeather}   current
 * @property {HourlyForecast[]} next24Hours
 * @property {DailyForecast[]}  daily
 * @property {number}           timezoneOffset
 */

/**
 * @typedef CurrentWeather
 * @property {number}             temp
 * @property {number?}            rain - Rain volume for last hour, mm
 * @property {number?}            snow - Snow volume for last hour, mm
 * @property {object}             comfort
 * @property {number}             comfort.feelsLike
 * @property {number}             comfort.humidity
 * @property {number}             comfort.uvi
 * @property {object}             wind
 * @property {number}             wind.speed
 * @property {number}             wind.direction
 * @property {string}             wind.directionLabel
 * @property {WeatherDescription} weather
 */

/**
 * @typedef HourlyForecast
 * @property {Date}               time
 * @property {number}             temp
 * @property {number}             pop - Probability of precipitation (raining)
 * @property {WeatherDescription} weather
 */

/**
 * @typedef DailyForecast
 * @property {Date}               date
 * @property {number}             tempMin
 * @property {number}             tempMax
 * @property {Date}               sunrise
 * @property {Date}               sunset
 * @property {WeatherDescription} weather
 */

/**
 * @typedef WeatherDescription
 * @property {number} id
 * @property {string} main - Short weather group description (Rain, Snow, etc.)
 * @property {string} description
 * @property {string} icon
 */
