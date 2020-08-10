export default function (service) {
  return function (query) {
    return service.getPlacePredictions(query)
  }
}
