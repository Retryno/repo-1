import addAction from './addAction'
export default (server, socket, db) => {
  return ({text, email}) => {
    db.collection('users').findOne({ email }, (err, result) => {
      if (err) throw err
      if (result) {
        addAction(db, result, text, 'me', 'Statistic')
      }
    })
  }
}
