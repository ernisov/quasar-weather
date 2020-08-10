export default function (locationsService) {
  return function (query) {
    return locationsService.findForecastLocationByText(query)
  }
}
