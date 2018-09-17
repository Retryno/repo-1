import React, { Component } from 'react'
import history from 'global/history.js'
import '@/style.styl'

class Menu extends Component {
  state = {
    current: 0,
    typeOfUser: ''
  }

  componentDidMount () {
    const user = JSON.parse(localStorage.getItem('userAutchData'))
    this.setState({typeOfUser: user.type})
  }

  render () {
    const { typeOfUser } = this.state
    return (
      <div className='Menu'>
        <div className='Menu_item' onClick={() => history.push('/')}>Log In</div>
        <div className='Menu_item' onClick={() => history.push('/myactions')}>My actions</div>
        {typeOfUser === 'client' && <div className='Menu_item' onClick={() => history.push('/message')}>Message</div>}
        <div className='Menu_item' onClick={() => history.push('/buttons')}>Statistic</div>
        {typeOfUser === 'admin' && <div className='Menu_item' onClick={() => history.push('/adminchat')}>Admin chat</div>}
        {typeOfUser === 'admin' && <div className='Menu_item' onClick={() => history.push('/admincombo')}>Admin console</div>}
        {typeOfUser === 'admin' && <div className='Menu_item' onClick={() => history.push('/alluseraction')}>All User Actions</div>}
      </div>
    )
  }
}

export default Menu
