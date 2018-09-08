import {combineReducers, applyMiddleware, createStore} from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import io from 'socket.io-client'

import userReducer from './reducers/userReducer.js'
import pageReducer from './reducers/pageReducer.js'
import myReducer from './reducers/myReducer.js'

export default createStore(
  combineReducers({
    routing: routerReducer,
    socket: () => io('http://localhost:3001'),
    user: userReducer,
    page: pageReducer,
    my: myReducer
  }),
  {},
  applyMiddleware(logger, thunk)
)
