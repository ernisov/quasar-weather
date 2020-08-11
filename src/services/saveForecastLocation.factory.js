/**
 * @param {IForecastLocationsDB} locationsDB
 * @returns {(location: ForecastLocation) => Promise<ForecastLocation>} function that saves forecast location to database
 */
export default function (locationsDB) {
  return function (location) {
    return locationsDB.open().then(db => {
      return db.save(location).then(id => db.getById(id))
    })
  }
}
