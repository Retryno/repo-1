import React, { Component } from 'react'
import { Radio, Checkbox, Button, Select, InputNumber } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Menu from '@/Menu/menu.jsx'
import '@/style.styl'

const Option = Select.Option

class Buttons extends Component {
  static propTypes = {
    socket: PropTypes.object.isRequired
  }

  types = []
  addStatistics = text => {
    this.types.push(text)
  }
  submit = () => {
    const text = `{${this.types.join(', ')}}`
    this.props.socket.emit('button click', {text, email: 'admin@mail.ru'})
  }
  render () {
    return (
      <div>
        <Menu />
        <div className='Button'>
          <Radio onClick={() => this.addStatistics('type: "radio"')}>Radio</Radio>
          <br />
          <Select defaultValue='Client1' style={{ width: 120 }} onChange={val => this.addStatistics(`type: ${val}`)}>
            <Option value='C1'>Client1</Option>
            <Option value='C2'>Client2</Option>
            <Option value='C3'>Client3</Option>
            <Option value='C4'>Client4</Option>
          </Select>
          <br />
          <Checkbox onChange={() => this.addStatistics('type: "check1"')}>Checkbox</Checkbox>
          <br />
          <Checkbox onChange={() => this.addStatistics('type: "check2"')}>Checkbox</Checkbox>
          <br />
          <Checkbox onChange={() => this.addStatistics('type: "check3"')}>Checkbox</Checkbox>
          <br />
          <Button type='primary' onClick={this.submit}>Submit</Button>
          <br />
          <InputNumber min={1} max={10} defaultValue={3} onChange={val => this.addStatistics(`type: ${val}`)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  socket: state.socket
})

export default connect(mapStateToProps)(Buttons)
