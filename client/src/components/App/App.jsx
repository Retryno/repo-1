import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router'
import history from 'global/history'
import store from 'global/store.js'

import MyActions from '@/Client/MyActions/myActions.jsx'
import Message from '@/Client/Message/message.jsx'
import LogIn from '@/Client/LogIn/logIn.jsx'
import Buttons from '@/Client/Buttons/buttons.jsx'
import Chat from '@/Admin/Chat/chat.jsx'
import Combobox from '@/Admin/Combobox/combobox.jsx'
import UserAction from '@/Admin/UserAction/userAction.jsx'
import AllActions from '@/Admin/AllActions/allActions.jsx'

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route exact path='/myactions' component={MyActions} />
          <Route exact path='/message' component={Message} />
          <Route exact path='/buttons' component={Buttons} />
          <Route exact path='/adminchat' component={Chat} />
          <Route exact path='/admincombo' component={Combobox} />
          <Route exact path='/adminuseraction' component={UserAction} />
          <Route exact path='/adminallactions' component={AllActions} />
        </Switch>
      </Router>
    </Provider>
  )
}
