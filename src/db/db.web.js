export default class IndexedDB {
  static VERSION = 1

  constructor () {
    this._db = null
  }

  open () {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('quasar_weather', IndexedDB.VERSION)

      request.onerror = (e) => reject(e.target.error)

      request.onupgradeneeded = (e) => {
        const db = e.target.result
        db.createObjectStore('locations', { keyPath: 'locationId' })
        db.createObjectStore('weather_data', { keyPath: 'locationId' })
      }

      request.onsuccess = (e) => {
        this._db = e.target.result
        resolve(this)
      }
    })
  }

  count (store) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction([store], 'readonly')
      const objectStore = transaction.objectStore(store)
      const countRequest = objectStore.count()

      countRequest.onsuccess = (e) => resolve(e.target.result)
      countRequest.onerror = (e) => reject(e.target.error)
    })
  }

  create (store, item) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction([store], 'readwrite')
      const objectStore = transaction.objectStore(store)
      const request = objectStore.add(item)

      request.onsuccess = (e) => resolve(e.target.result)
      request.onerror = (e) => reject(e.target.error)
    })
  }

  put (store, keyPath, item) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction([store], 'readwrite')
      const objectStore = transaction.objectStore(store)
      const request = objectStore.get(keyPath)

      request.onsuccess = () => {
        const requestPut = objectStore.put(item)

        requestPut.onerror = (e) => reject(e.target.error)
        requestPut.onsuccess = () => resolve(item)
      }

      request.onerror = (e) => reject(e.target.error)
    })
  }

  delete (store, keyPath) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction([store], 'readwrite')
      const request = transaction.objectStore(store).delete(keyPath)
      request.onsuccess = () => resolve(keyPath)
      request.onerror = (e) => reject(e.target.error)
    })
  }

  getByKey (store, keyPath) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction([store], 'readonly')
      const request = transaction.objectStore(store).get(keyPath)
      request.onsuccess = (e) => resolve(e.target.result)
      request.onerror = (e) => reject(e.target.error)
    })
  }

  getAll (store) {
    return new Promise((resolve, reject) => {
      const transaction = this._db.transaction([store], 'readonly')
      const objectStore = transaction.objectStore(store)
      const request = objectStore.getAll()
      request.onsuccess = (e) => resolve(e.target.result)
      request.onerror = (e) => reject(e.target.error)
    })
  }
}
