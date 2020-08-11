import factory from './getSavedForecastLocations.factory'
import LocationsDB from 'src/data/locations/LocationsDB.web'

export default factory(new LocationsDB())
