import moment from 'moment'

export default (server, socket, db) => {
  return user => {
    const lastVisit = {$set: {lastVisit: moment().format('DD.MM.YYYY HH:MM')}}
    db.collection('users').updateOne({ email: user.email }, lastVisit, err => {
      if (err) throw err
    })
  }
}
