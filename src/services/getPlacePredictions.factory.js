/**
 * getLocationPredictions factory
 * @param {ILocationsAPI} locationsAPI
 */
export default function (locationsAPI) {
  return function (query) {
    return locationsAPI.getPredictions(query)
  }
}
