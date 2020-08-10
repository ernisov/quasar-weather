export default class WebAutocomplete {
  constructor () {
    this.service = window.google && new window.google.maps.places.AutocompleteService()
    this.statuses = window.google.maps.places.PlacesServiceStatus
  }

  getPlacePredictions (query) {
    return new Promise((resolve, reject) => {
      if (!query.trim()) {
        return resolve([])
      }

      this.service.getPlacePredictions({
        input: query,
        types: ['(regions)']
      }, (predictions, status) => {
        if (status === this.statuses.OK) {
          resolve(predictions.map(p => ({ description: p.description, locationId: p.place_id })))
        } else if (status === this.statuses.ZERO_RESULTS) {
          resolve([])
        } else {
          reject(status)
        }
      })
    })
  }
}
