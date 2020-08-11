/**
 * getLocationPredictions factory
 * @param {IForecastLocationsAPI} locationsAPI
 */
export default function (locationsAPI) {
  return function (query) {
    return locationsAPI.getPredictions(query)
  }
}
