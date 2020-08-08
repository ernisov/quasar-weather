/**
 * Gets coordinates via Geolocation Web Api
 * @returns {Promise<LocationCoordinates>}
 */
export default function () {
  return new Promise((resolve, reject) => {
    function onSuccess (position) {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    }

    function onError (positionError) {
      reject(positionError)
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  })
}
