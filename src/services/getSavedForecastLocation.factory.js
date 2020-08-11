/**
 * @param {IForecastLocationsDB} locationsDB
 */
export default function (locationsDB) {
  return function (locationId) {
    return locationsDB.open().then(db => db.getById(locationId))
  }
}
