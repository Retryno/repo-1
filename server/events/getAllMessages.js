export default (server, socket, db) => {
  return ({email}) => {
    db.collection('messages').findOne({email}, (err, result) => {
      if (err) throw err
      socket.io.emit('get all messages', result)
    })
  }
}
