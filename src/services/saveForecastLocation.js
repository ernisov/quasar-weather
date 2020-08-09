import factory from './saveForecastLocation.factory'
import IndexedDB from 'src/db/db.web'
import LocationsDB from 'src/data/locations/LocationsDB'

export default factory(new LocationsDB(new IndexedDB()))
