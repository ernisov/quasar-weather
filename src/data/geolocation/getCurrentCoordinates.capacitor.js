import { Plugins } from 'app/src-capacitor/node_modules/@capacitor/core'

const { Geolocation } = Plugins

/**
 * Returns current coords in Capacitor app
 * @func
 * @returns {Promise<LocationCoordinates>}
 */
export default function () {
  return Geolocation.getCurrentPosition()
    .then(position => ({
      lat: position.latitude,
      lng: position.longitude
    }))
}
