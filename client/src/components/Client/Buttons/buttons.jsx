import React, { Component } from 'react'
import { Radio, Checkbox, Button, Select, InputNumber } from 'antd'
import { connect } from 'react-redux'
import Paginations from '@/Client/Pagination/pagination.jsx'
import './buttons.styl'

const Option = Select.Option

class Buttons extends Component {
  types = []
  buttonClick1 = (text, val) => {
    this.types.push(text)
  }
  submit = () => {
    const text = `{${this.types.join(', ')}}`
    this.props.socket.emit('button click', {text, email: 'admin@mail.ru'})
  }
  render () {
    return (
      <div>
        <Paginations />
        <div className='Button'>
          <Radio onClick={() => this.buttonClick1('type: "radio"')}>Radio</Radio>
          <br />
          <Select defaultValue='Client1' style={{ width: 120 }} onChange={val => this.buttonClick1(`type: ${val}`)}>
            <Option value='C1'>Client1</Option>
            <Option value='C2'>Client2</Option>
            <Option value='C3'>Client3</Option>
            <Option value='C4'>Client4</Option>
          </Select>
          <br />
          <Checkbox onChange={() => this.buttonClick1('type: "check1"')}>Checkbox</Checkbox>
          <br />
          <Checkbox onChange={() => this.buttonClick1('type: "check2"')}>Checkbox</Checkbox>
          <br />
          <Checkbox onChange={() => this.buttonClick1('type: "check3"')}>Checkbox</Checkbox>
          <br />
          <Button type='primary' onClick={this.submit}>Submit</Button>
          <br />
          <InputNumber min={1} max={10} defaultValue={3} onChange={val => this.buttonClick1(`type: ${val}`)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps)(Buttons)
