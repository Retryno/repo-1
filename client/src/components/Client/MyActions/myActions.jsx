import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paginations from '@/Client/Pagination/pagination.jsx'
import { Table } from 'antd'

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
  static propTypes = {
    urerAction: PropTypes.any
  }

  render () {
    const { actions } = this.props.urerAction || []
    return (
      <div>
        <Paginations />
        <Table columns={columns} dataSource={actions} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  urerAction: state.my
})

const mapDispatchToProps = dispatch => ({
  send: (type, payload) => {
    dispatch({ type, payload })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(myAction)
