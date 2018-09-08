import React, { Component } from 'react'
import { Input, Button, Select } from 'antd'

const { TextArea } = Input
const Option = Select.Option

export default class Combobox extends Component {
  handleChange (value) {
    console.log(`selected ${value}`)
  }

  render () {
    return (
      <div>
        <TextArea size='small' rows={4} />
        <Select defaultValue='Client1' style={{ width: 120 }} onChange={this.handleChange}>
          <Option value='Client1'>Client1</Option>
          <Option value='Client2'>Client2</Option>
          <Option value='Client3'>Client3</Option>
          <Option value='Client14'>Client4</Option>
        </Select>
        <Button type='primary'>Submit</Button>
      </div>
    )
  }
}
