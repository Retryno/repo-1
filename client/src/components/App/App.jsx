import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import history from 'global/history'
import store from 'global/store.js'

import MyActions from '@/MyActions/myActions.jsx'
import ClientChat from '@/ClientChat/clientChat.jsx'
import LogIn from '@/LogIn/logIn.jsx'
import Buttons from '@/Buttons/buttons.jsx'
import Chat from '@/AdminChat/adminChat.jsx'
import Combobox from '@/Combobox/combobox.jsx'
import AllUserAction from '@/UserAction/userAction.jsx'

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route exact path='/myactions' component={MyActions} />
          <Route exact path='/message' component={ClientChat} />
          <Route exact path='/buttons' component={Buttons} />
          <Route exact path='/adminchat' component={Chat} />
          <Route exact path='/admincombo' component={Combobox} />
          <Route exact path='/alluseraction' component={AllUserAction} />
        </Switch>
      </Router>
    </Provider>
  )
}
