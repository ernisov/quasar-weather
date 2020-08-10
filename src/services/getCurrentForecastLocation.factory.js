/**
 * getCurrentLocation factory
 * @param {object} deps
 * @param {getCurrentCoordinates} deps.getCurrentCoordinates
 * @param {ILocationsAPI} deps.locationsAPI
 * @returns {() => Promise<ForecastLocation>}
 */
export default function (deps) {
  return async function () {
    const coordinates = await deps.getCurrentCoordinates()
    return deps.locationsAPI.findByCoordinates(coordinates)
  }
}

/**
 * @callback getCurrentCoordinates
 * @returns {Promise<LocationCoordinates>}
 */
