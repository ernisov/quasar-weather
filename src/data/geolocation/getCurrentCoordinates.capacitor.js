import { Plugins } from 'app/src-capacitor/node_modules/@capacitor/core'

const { Geolocation } = Plugins

/**
 * Returns current coords in Capacitor app
 * @returns {Promise<LocationCoordinates>}
 */
export default function () {
  return Geolocation.getCurrentPosition()
    .then(position => ({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }))
}
