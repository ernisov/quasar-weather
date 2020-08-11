import IndexedDB from 'src/db/db.web'
/**
 * @implements {IForecastLocationsDB}
 */
export default class LocationsDB {
  constructor () {
    this._db = new IndexedDB()
    this._objectStore = 'locations'
  }

  /**
   * Opens database connection
   * @returns {Promise<IForecastLocationsDB>}
   */
  open () {
    return this._db.open().then(() => this)
  }

  /**
   * Save ForecastLocation to database
   * @param {ForecastLocation} location
   * @returns {Promise<string>} location id
   */
  async save (location) {
    const count = await this.count()
    location.order = count + 1
    return this._db.create(this._objectStore, location)
  }

  /**
   * Retrieve location by id
   * @param {string} locationId
   * @returns {Promise<ForecastLocation>}
   */
  getById (locationId) {
    if (!locationId) return
    return this._db.getByKey('locations', locationId)
  }

  /**
   * Retrieves all ForecastLocations
   * @returns {Promise<ForecastLocation[]>}
   */
  getAll () {
    return this._db.getAll(this._objectStore)
  }

  /**
   * Returns ForecastLocations count
   * @returns {number}
   */
  count () {
    return this._db.count('locations')
  }

  /**
   * Changes order of given location
   * @param {ForecastLocation} location
   * @param {number} to
   * @returns {Promise<ForecastLocation>}
   */
  async reorder (location, to) {
    const locations = await this.getAll()
    const filtered = locations.filter(l => l.order >= to && l.order < location.order)

    for (const l of filtered) {
      l.order += 1
      await this._db.put('locations', l.locationId, l)
    }

    location.order = to
    return this._db.put('locations', location.locationId, location)
  }
}
