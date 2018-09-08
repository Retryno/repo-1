import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { connect } from 'react-redux'
import Paginations from '@/Client/Pagination/pagination.jsx'

const { TextArea } = Input

class Message extends Component {
  state = {
    messages: [],
    info: ''
  }

  componentDidMount = () => {
    this.updateMessages()
  }

  updateMessages = () => {
    // message from admin
    // this.props.socket.on('message to client', message => {
    //   const messages = [...this.state.messages, message.text]
    //   this.setState({messages})
    // })
  }

  test = 1
  sendMessage = () => {
    // message will be displayed only on admin route and component
    // Email should by dynamic
    this.props.socket.emit('message to admin', {text: ++this.test, email: 'admin@mail.ru'})
    const messages = [...this.state.messages, this.test]
    this.setState({messages})
  }

  render () {
    return (
      <div>
        <Paginations />
        {this.state.messages.join(' op')}
        <TextArea size='small' rows={4} />
        <Button size='large' type='primary' onClick={this.sendMessage}>Submit</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps)(Message)
