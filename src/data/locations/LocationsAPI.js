/**
 * @implements {IForecastLocationsAPI}
 */
export default class LocationsAPI {
  constructor () {
    this.geocoder = window.google && new window.google.maps.Geocoder()
    this.geocoderStatuses = window.google.maps.GeocoderStatus
    this.autocomplete = window.google && new window.google.maps.places.AutocompleteService()
    this.autocompleteStatuses = window.google.maps.places.PlacesServiceStatus
  }

  /**
   * Returns location predictions
   * @param {string} query
   * @returns {Promise<LocationPrediction[]>}
   */
  getPredictions (query) {
    return new Promise((resolve, reject) => {
      if (!query.trim()) {
        return resolve([])
      }

      this.autocomplete.getPlacePredictions({
        input: query,
        types: ['(regions)']
      }, (predictions, status) => {
        if (status === this.autocompleteStatuses.OK) {
          resolve(predictions.map(p => ({ address: p.description, locationId: p.place_id })))
        } else if (status === this.autocompleteStatuses.ZERO_RESULTS) {
          resolve([])
        } else {
          reject(status)
        }
      })
    })
  }

  /**
   * Returns location by query
   * @param {string} query
   * @returns {Promise<ForecastLocation>}
   */
  findByText (query) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({
        address: query
      }, (results, status) => {
        if (status === this.geocoderStatuses.OK) {
          resolve(this._convertToForecastLocation(results[0]))
        } else if (status === this.geocoderStatuses.ZERO_RESULTS) {
          resolve()
        } else {
          reject(status)
        }
      })
    })
  }

  /**
   * Returns location by coordinates
   * @param {LocationCoordinates} coords
   * @returns {Promise<ForecastLocation>}
   */
  findByCoordinates (coords) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({
        location: coords
      }, (results, status) => {
        if (status === this.geocoderStatuses.OK) {
          resolve(this._convertToForecastLocation(results[0]))
        } else if (status === this.geocoderStatuses.ZERO_RESULTS) {
          resolve()
        } else {
          reject(status)
        }
      })
    })
  }

  _convertToForecastLocation (result) {
    const {
      geometry,
      place_id: locationId,
      address_components: addressComponents
    } = result

    console.log(addressComponents)

    return {
      coords: {
        lat: geometry.location.lat(),
        lng: geometry.location.lng()
      },
      label: addressComponents.filter(a => a.types.includes('locality') || a.types.includes('administrative_area_level_1'))[0].short_name,
      locationId
    }
  }
}
