/**
 * Get ForecastLocation for given coordinates
 * @param {LocationCoordinates} coords
 * @param {string} [lang = 'ru']
 * @returns {Promise<ForecastLocation>}
 */
export default async function (coords, lang = 'ru') {
  const apiKey = process.env.GOOGLE_API_KEY
  const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?result_type=locality'
  const response = await fetch(`${baseURL}&latlng=${coords.lat},${coords.lng}&key=${apiKey}&language=${lang}`)
  const { status, results } = await response.json()

  if (status === 'OK') {
    const {
      geometry,
      place_id: locationId,
      address_components: addressComponents
    } = results[0]

    return {
      coords: {
        lat: geometry.location.lat,
        lng: geometry.location.lng
      },
      label: addressComponents.find(c => c.types.includes('locality')).short_name,
      locationId
    }
  }
}
