import moment from 'moment'
import addAction from './addAction'

export default (server, socket, db) => {
  return ({text, email, userTo}) => {
    const receiver = email === 'admin@mail.ru' ? userTo : email
    db.collection('users').findOne({ email }, (err, result) => {
      if (err) throw err
      if (result) {
        addAction(db, result, text, 'me', 'message')
      }
    })
    db.collection('users').findOne({ email: userTo }, (err, result) => {
      if (err) throw err
      if (result) {
        addAction(db, result, text, email, 'message')
      }
    })
    db.collection('messages').findOne({ email: receiver }, (err, result) => {
      if (err) throw err
      if (result) {
        if (!result.messages) result.messages = []
        const newMessage = { emailTo: userTo || null, email, text, time: moment().format('DD.MM.YYYY HH:MM') }
        result.messages.push(newMessage)
        const newValues = { $set: { messages: result.messages } }
        socket.io.emit('messages', newMessage)
        db.collection('messages').updateOne({ email: receiver }, newValues, err => {
          if (err) throw err
        })
      }
    })
  }
}
