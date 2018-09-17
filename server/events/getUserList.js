export default (server, socket, db) => {
  return () => {
    db.collection('users').find({}, { projection: { _id: 0, username: 1, email: 1, type: 1 } }).toArray((err, result) => {
      if (err) throw err
      socket.io.emit('get user list', result)
    })
  }
}
