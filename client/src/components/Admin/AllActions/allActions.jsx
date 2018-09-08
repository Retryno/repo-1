import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Table } from 'antd'

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date'
}, {
  title: 'Type',
  dataIndex: 'type',
  key: 'type'
}, {
  title: 'Message',
  dataIndex: 'message',
  key: 'message'
}, {
  title: 'Author',
  dataIndex: 'author',
  key: 'author'
}]

const data = [{
  key: '1',
  date: '12/24/1943 11=00',
  type: 'message',
  message: 'Admin',
  author: 'Admin'
}, {
  key: '2',
  date: '12/24/1943 11=00',
  type: 'message',
  message: 'Admin',
  author: 'Admin'
}, {
  key: '3',
  date: '12/24/1943 11=00',
  type: 'message',
  message: 'Admin',
  author: 'Admin'
}, {
  key: '4',
  date: '12/24/1943 11=00',
  type: 'message',
  message: 'Admin',
  author: 'Admin'
}]

export default class AllActions extends Component {
  render () {
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
