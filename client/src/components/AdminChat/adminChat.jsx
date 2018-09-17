import React, { Component } from 'react'
import { Input, Button } from 'antd'
import PropTypes from 'prop-types'
import Menu from '@/Menu/menu.jsx'
import { connect } from 'react-redux'
import { securityService } from 'project-services'
import '@/style.styl'

const { TextArea } = Input

class AdminChat extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    messages: '',
    users: [],
    curentReceiver: '',
    currentUser: null,
    listMessages: []
  }

  componentDidMount () {
    const user = JSON.parse(localStorage.getItem('userAutchData'))
    this.props.socket.emit('get user list')
    this.props.socket.on('messages', item => {
      this.addNewMessage(item)
    })
    this.props.socket.on('get user list', users => {
      this.setState({users})
    })
    this.setState({currentUser: user})
  }

  addNewMessage (message) {
    const { listMessages, curentReceiver } = this.state
    if (message.email === curentReceiver) {
      listMessages.push(message)
      this.setState({listMessages}, this.goToBottom)
    }
  }

  onReceiverChange = email => {
    securityService.getAllMessages({email}).then(({messages: listMessages}) => {
      this.setState({listMessages, curentReceiver: email}, this.goToBottom)
    })
  }

  message = e => {
    this.setState({messages: e.target.value})
  }

  sendMessage = () => {
    const { messages, curentReceiver, listMessages } = this.state
    const user = JSON.parse(localStorage.getItem('userAutchData'))
    const sendingData = {text: messages, email: user.email, userTo: curentReceiver}
    this.props.socket.emit('messages', sendingData)
    listMessages.push(sendingData)
    this.setState({messages: '', listMessages}, () => this.goToBottom())
  }

  goToBottom () {
    let objDiv = document.getElementById('chat')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  renderMessages = () => {
    const { listMessages, currentUser } = this.state
    if (!currentUser) return false
    return listMessages.map((item, index) =>
      <div
        className={`message ${item.email === currentUser.email ? 'right' : ''}`}
        key={index}>
        <span className={item.email !== currentUser.email ? 'green-color' : ''}>{item.text}</span>
      </div>
    )
  }

  render () {
    const { users, curentReceiver, messages } = this.state
    return (
      <div>
        <Menu />
        <div className='chat-area'>
          <div className='user-side'>
            {users.filter(i => i.type !== 'admin').map((item, key) =>
              <div
                onClick={() => this.onReceiverChange(item.email)}
                className={`item ${item.email === curentReceiver ? 'active' : ''}`}
                key={key}
                value={item.email}>{item.username}
              </div>
            )}
          </div>
          <div className='chat-side' id='chat'>
            {this.renderMessages()}
          </div>
        </div>
        <TextArea className='textarea' size='small' value={messages} onChange={this.message} rows={4} />
        <Button onClick={this.sendMessage} type='primary'>Submit</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps)(AdminChat)
