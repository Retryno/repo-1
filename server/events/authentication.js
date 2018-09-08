import addAction from './addAction'

export default (server, socket, db) => {
  return email => {
    db.collection('users').findOne({ email }, (err, result) => {
      if (err) throw err
      if (result) {
        addAction(db, result, 'message', 'me', 'auth', res => socket.io.emit('authentication', res))
      } else {
        // db.collection('users').insertOne({ username, email, createdData }, (err1, res) => {
        //   if (err1) throw err1
        //   socket.io.emit('create account', res.ops[0])
        // })
      }
      // server.broadcast.emit('connect user', { text: null, user: result, connect: true })
    })
  }
}
