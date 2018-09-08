import { Pagination, Form } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from 'global/history.js'

const FormItem = Form.Item

const formPaginLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 10, offset: 8 }
}

class Paginations extends Component {
  state = {
    current: 0
  }

  onChange = page => {
    this.setState({current: page})
    let x = page
    switch (x) {
    case 1:
      history.push('/')
      break
    case 2:
      history.push('/myactions')
      break
    case 3:
      history.push('/message')
      break
    case 4:
      history.push('/buttons')
      break
    case 5:
      history.push('/adminchat')
      break
    case 6:
      history.push('/admincombo')
      break
    case 7:
      history.push('/adminuseraction')
      break
    case 8:
      history.push('/adminallactions')
      break
    case 9:
      history.push('/adminUsersList')
      break
    default:
      break
    }
  }
  render () {
    return (
      <div>
        <FormItem {...formPaginLayout} >
          <Pagination current={this.state.current} onChange={this.onChange} total={90} />
        </FormItem>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

const mapDispatchToProps = dispatch => ({
  send: (type, payload) => {
    dispatch({ type, payload })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Paginations))
