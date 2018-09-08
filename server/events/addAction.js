// import { getCurrentDate } from '.././helpers'
import moment from 'moment'

export default (db, result, message, author, type, cb = () => {}) => {
  if (result) {
    if (!result.actions) result.actions = []
    result.actions.unshift({
      type,
      message,
      author,
      date: moment().format('DD.MM.YYYY HH:MM')
    })
    const newValues = { $set: { actions: result.actions } }
    db.collection('users').updateOne({ email: result.email }, newValues, err => {
      if (err) throw err
      cb(result)
    })
  }
}
