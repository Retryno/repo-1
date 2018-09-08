import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import history from 'global/history.js'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 6 }
}

const formTailLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 6, offset: 12 }
}

class LogIn extends Component {
  state = {
    checkNick: false,
    info: ''
  }

  componentDidMount = () => {
    this.props.socket.on('authentication', info => {
      this.setState({info})
      this.ggwp(info)
    })
  }

  ggwp = data => {
    this.props.send('MY_ACTION', data)
    // history.push('/adminuseraction')
    history.push('/myactions')
  }

    check = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.socket.emit('authentication', values.email)
        }
      })
    }

    handleChange = e => {
      this.setState({
        checkNick: e.target.checked
      }, () => {
        this.props.form.validateFields(['Email'], { force: true })
      })
    }

    render () {
      const { getFieldDecorator } = this.props.form

      return (
        <div>
          <FormItem {...formItemLayout} label='Name'>
            {getFieldDecorator('username', {
              initialValue: 'admin',
              rules: [{
                required: true,
                message: 'Please input your name'
              }]
            })(
              <Input placeholder='Please input your name' />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='Email'>
            {getFieldDecorator('email', {
              initialValue: 'admin@mail.ru',
              rules: [{
                required: this.state.checkNick,
                message: 'Please input your email'
              }]
            })(
              <Input placeholder='Please input your email' />
            )}
          </FormItem>
          <FormItem {...formTailLayout}>
            <Button type='primary' onClick={this.check}>
              Submit
            </Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LogIn))
