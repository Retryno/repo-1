import React, { Component } from 'react'
import Menu from '@/Menu/menu.jsx'
import { Table } from 'antd'
import { securityService } from 'project-services'
import history from 'global/history.js'

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: '0'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: '1'
  },
  {
    title: 'Message',
    dataIndex: 'message',
    key: '2'
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: '3'
  }
]

class myAction extends Component {
  state = {items: []}

  componentDidMount () {
    const user = JSON.parse(localStorage.getItem('userAutchData'))
    if (user) {
      securityService.getMyActions(user.email).then(i => {
        i
          ? this.setState({items: i.items})
          : history.push('/')
      })
    } else {
      history.push('/')
    }
  }

  render () {
    return (
      <div>
        <Menu />
        <Table columns={columns} dataSource={this.state.items} />
      </div>
    )
  }
}

export default myAction
