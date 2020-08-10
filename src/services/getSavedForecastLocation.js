import IndexedDB from 'src/db/db.web'
import LocationsDB from 'src/data/locations/LocationsDB'
import factory from './getSavedForecastLocation.factory'

export default factory(new LocationsDB(new IndexedDB()))
