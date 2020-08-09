export default function (locationsDB) {
  return function (location) {
    return locationsDB.open().then(db => {
      return db.save(location).then(id => db.getById(id))
    })
  }
}
