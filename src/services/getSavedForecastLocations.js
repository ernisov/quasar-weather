import factory from './getSavedForecastLocations.factory'
import LocationsDB from 'src/data/locations/LocationsDB'
import IndexedDB from 'src/db/db.web'

export default factory(new LocationsDB(new IndexedDB()))
