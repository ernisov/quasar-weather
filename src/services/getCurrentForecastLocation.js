import { Platform } from 'quasar'
import webApiGeolocation from 'src/data/geolocation/getCurrentCoordinates.web'
import CapacitorGeolocation from 'src/data/geolocation/getCurrentCoordinates.capacitor'
import getForecastLocationByCoords from 'src/data/locations/getForecastLocationByCoords'
import factory from './getCurrentForecastLocation.factory'

let getCurrentCoordinates

if (Platform.is.capacitor) {
  getCurrentCoordinates = CapacitorGeolocation
} else {
  getCurrentCoordinates = webApiGeolocation
}

export default factory({
  getCurrentCoordinates,
  getForecastLocationByCoords
})
