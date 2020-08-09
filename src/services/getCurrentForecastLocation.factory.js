/**
 * getCurrentLocation factory
 * @param {object} deps
 * @param {getCurrentCoordinates} deps.getCurrentCoordinates
 * @param {getForecastLocationByCoords} deps.getForecastLocationByCoords
 * @returns {() => Promise<ForecastLocation>}
 */
export default function (deps) {
  return async function () {
    const coordinates = await deps.getCurrentCoordinates()
    return deps.getForecastLocationByCoords(coordinates)
  }
}

/**
 * @callback getCurrentCoordinates
 * @returns {Promise<LocationCoordinates>}
 */

/**
 * @callback getForecastLocationByCoords
 * @param {LocationCoordinates} coordinates
 * @returns {Promise<ForecastLocation>}
 */
