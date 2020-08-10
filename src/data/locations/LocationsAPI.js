export default class LocationsAPI {
  constructor () {
    this.service = window.google && new window.google.maps.Geocoder()
    this.statuses = window.google.maps.GeocoderStatus
  }

  /**
   * Returns location by query
   * @param {string} query
   * @returns {Promise<ForecastLocation>}
   */
  findForecastLocationByText (query) {
    return new Promise((resolve, reject) => {
      this.service.geocode({
        address: query
      }, (results, status) => {
        if (status === this.statuses.OK) {
          const {
            geometry,
            place_id: locationId,
            address_components: addressComponents
          } = results[0]
          resolve({
            coords: {
              lat: geometry.location.lat(),
              lng: geometry.location.lng()
            },
            label: addressComponents.find(c => c.types.includes('locality')).short_name,
            locationId
          })
        } else if (status === this.statuses.ZERO_RESULTS) {
          resolve()
        } else {
          reject(status)
        }
      })
    })
  }
}
