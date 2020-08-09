export default function (locationsDB) {
  /**
   * Retrieves ForecastLocations from database
   * @name getSavedForecastLocations
   * @returns {Promise<ForecastLocation[]>}
   */
  return function () {
    return locationsDB.open().then(db => db.getAll())
  }
}
