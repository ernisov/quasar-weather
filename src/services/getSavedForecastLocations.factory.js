/**
 * @param {IForecastLocationsDB} locationsDB
 * @returns {() => Promise<ForecastLocation[]>}
 */
export default function (locationsDB) {
  return function () {
    return locationsDB.open()
      .then(db => db.getAll())
      .then(l => l.sort((a, b) => a.order - b.order))
  }
}
