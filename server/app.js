import express from 'express'
import { MongoClient } from 'mongodb'
import assert from 'assert'
import config from './config'
import logger from './tools/log'
import Socket from './tools/socket.io'

import routes from './app/routes.js'
import buttonClick from './events/buttonClick'
import searchUsers from './events/searchUsers'
import messages from './events/messages'
import getUserList from './events/getUserList'
import getAllMessages from './events/getAllMessages'
import adminCommand from './events/adminCommand'
import lastVisit from './events/lastVisit'

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
  routes(app, db)
})

socket.connection(server => {
  log.info('User connected')
  server.on('button click', buttonClick(server, socket, db))
  server.on('search all users', searchUsers(server, socket, db))
  server.on('messages', messages(server, socket, db))
  server.on('get user list', getUserList(server, socket, db))
  server.on('get all messages', getAllMessages(server, socket, db))
  server.on('admin command', adminCommand(server, socket))
  server.on('last visit', lastVisit(server, socket, db))

  server.on('disconnect', () => {
    log.info('User disconnect')
  })
})
