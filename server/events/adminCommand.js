export default (server, socket) => {
  return ({message, curentReceiver}) => {
    socket.io.emit('admin command', {message, curentReceiver})
  }
}
