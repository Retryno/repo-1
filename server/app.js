import express from 'express'
import { MongoClient } from 'mongodb'
import assert from 'assert'
import config from './config'
import logger from './tools/log'
import Socket from './tools/socket.io'

import buttonClick from './events/buttonClick'
import authentication from './events/authentication'
import createAccount from './events/createAccount'
import searchUsers from './events/searchUsers'
import messages from './events/messages'
import userDisconected from './events/userDisconected'

const log = logger(module)
const app = express()

const socket = new Socket(app)
let db = null

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  assert.equal(null, err)
  log.info('Connected successfully to server')

  db = client.db('DataBase')

  socket.io.listen(config.get('port'))
  log.info('Listening on ' + config.get('port'))
})

socket.connection(server => {
  log.info('User connected')

  server.on('authentication', authentication(server, socket, db))
  server.on('button click', buttonClick(server, socket, db))
  server.on('create account', createAccount(server, socket, db))
  server.on('message to admin', messages(server, socket, db))
  server.on('disconnected user', userDisconected(server))
  server.on('search all users', searchUsers(server, socket, db))

  server.on('disconnect', () => {
    log.info('User disconnect')
  })
})
