import LocationDB from './locationsDB'
import WebDB from 'src/db/db.web'

export default function () {
  return new LocationDB(new WebDB())
}
