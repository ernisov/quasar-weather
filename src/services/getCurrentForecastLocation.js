import { Platform } from 'quasar'
import webApiGeolocation from 'src/data/geolocation/getCurrentCoordinates.web'
import CapacitorGeolocation from 'src/data/geolocation/getCurrentCoordinates.capacitor'
import LocationsAPI from 'src/data/locations/LocationsAPI'
import factory from './getCurrentForecastLocation.factory'

let getCurrentCoordinates

if (Platform.is.capacitor) {
  getCurrentCoordinates = CapacitorGeolocation
} else {
  getCurrentCoordinates = webApiGeolocation
}

export default factory({
  getCurrentCoordinates,
  locationsAPI: new LocationsAPI()
})
