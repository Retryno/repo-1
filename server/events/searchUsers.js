export default (server, socket, db) => {
  return () => {
    db.collection('users').find({}, { projection: { _id: 0, username: 1, createData: 1, lastVisit: 1, lastAction: 1 } }).toArray((err, res) => {
      if (err) throw err
      socket.io.emit('search all users', res)
    })
  }
}
