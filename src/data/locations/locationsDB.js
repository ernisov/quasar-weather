export default class LocationsDB {
  constructor (database) {
    this._db = database
    this._objectStore = 'locations'
  }

  open () {
    return this._db.open().then(() => this)
  }

  async save (location) {
    const count = await this.count()
    location.order = count + 1
    return this._db.create(this._objectStore, location)
  }

  getAll () {
    return this._db.getAll(this._objectStore)
  }

  count () {
    return this._db.count('locations')
  }

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
