/**
 * Represents any location (town, city, etc.)
 * @typedef ForecastLocation
 * @property {LocationCoordinates} coords
 * @property {number?} order
 * @property {string} placeId
 * @property {string} label
 */

/**
 * LocationsAPI Interface
 * @typedef ILocationsAPI
 * @property {(query: string) => Promise<ForecastLocation>} findByText
 * @property {(coordinates: LocationCoordinates) => Promise<ForecastLocation>} findByCoordinates
 * @property {(query: string) => Promise<LocationPrediction[]>} getPredictions
 */

/**
 * @typedef LocationPrediction
 * @property {string} address
 * @property {string} locationId
 */
