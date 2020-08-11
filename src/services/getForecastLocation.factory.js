/**
 * getForecastLocation factory
 * @param {IForecastLocationsAPI} locationsAPI
 */
export default function (locationsAPI) {
  return function (query) {
    return locationsAPI.findByText(query)
  }
}
