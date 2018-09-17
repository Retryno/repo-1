import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { securityService } from 'project-services'
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

  authentication = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const info = await securityService.authorization({email: values.email})
        this.setState({info})
        localStorage.setItem('userAutchData', JSON.stringify(info))
        history.push('/myactions')
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
          <Button type='primary' onClick={this.authentication}>
            Submit
          </Button>
        </FormItem>
      </div>
    )
  }
}

export default Form.create()(LogIn)
