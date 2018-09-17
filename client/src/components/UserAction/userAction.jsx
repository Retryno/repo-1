import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Menu from '@/Menu/menu.jsx'
import { Table } from 'antd'

const columns = [
  {
    title: 'User',
    dataIndex: 'username',
    key: '0'
  },
  {
    title: 'Create Data',
    dataIndex: 'createData',
    key: '1'
  },
  {
    title: 'Last Visit',
    dataIndex: 'lastVisit',
    key: '2'
  },
  {
    title: 'Last Action',
    dataIndex: 'lastAction',
    key: '3'
  }
]

class UserAction extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  state = {
    users: []
  }

  componentDidMount = () => {
    this.props.socket.emit('search all users')
    this.props.socket.on('search all users', users => {
      this.setState({users: users})
      localStorage.setItem('users', JSON.stringify(users))
    })
  }

  render () {
    return (
      <div>
        <Menu />
        <Table columns={columns} dataSource={this.state.users} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})
export default connect(mapStateToProps)(UserAction)
