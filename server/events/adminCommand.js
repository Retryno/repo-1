export default (server, socket, db) => {
  return ({message, curentReceiver}) => {
    socket.io.emit('admin command', {message, curentReceiver})
  }
}
