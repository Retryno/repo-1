import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Table } from 'antd'

const columns = [
  {
    title: 'User',
    dataIndex: 'user',
    key: '0'
  },
  {
    title: 'Create Data',
    dataIndex: 'dreate data',
    key: '1'
  },
  {
    title: 'Last Visit',
    dataIndex: 'last visit',
    key: '2'
  },
  {
    title: 'Last Action',
    dataIndex: 'last action',
    key: '3'
  }
]

class UserAction extends Component {
  static propTypes = {
    urerAction: PropTypes.any
  }

  render () {
    const { actions } = this.props.urerAction || []
    return (
      <div>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserAction)
