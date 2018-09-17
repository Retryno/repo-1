import React, { Component } from 'react'
import { Input, Button } from 'antd'
import PropTypes from 'prop-types'
import Menu from '@/Menu/menu.jsx'
import '@/style.styl'
import { connect } from 'react-redux'

class Combobox extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    message: '',
    users: [],
    curentReceiver: '',
    currentUser: null,
    listOfCommand: []
  }

  componentDidMount () {
    const user = JSON.parse(localStorage.getItem('userAutchData'))
    this.props.socket.emit('get user list')
    this.props.socket.on('get user list', users => {
      this.setState({users: users})
    })
    this.setState({currentUser: user})
  }

  onReceiverChange = email => {
    this.setState({curentReceiver: email})
  }

  onMessageChange = e => {
    this.setState({message: e.target.value})
  }

  renderMessages = () => {
    const { listOfCommand, currentUser } = this.state
    if (!currentUser) return false
    return listOfCommand.map((item, index) =>
      <div className='message' key={index}>
        <span>{item}</span>
      </div>
    )
  }

  addNewMessage = () => {
    const { listOfCommand, curentReceiver, message } = this.state
    listOfCommand.push(message)
    this.props.socket.emit('admin command', {message, curentReceiver})
    this.setState({listOfCommand})
  }

  render () {
    const { users, curentReceiver, message } = this.state
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
        <Input.TextArea size='small' value={message} onChange={this.onMessageChange} rows={4} />
        <Button type='primary' onClick={this.addNewMessage}>Submit</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps)(Combobox)
