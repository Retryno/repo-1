import userActions from './userActions.js'
import bodyParser from 'body-parser'

module.exports = (app, db) => {
  app.use(bodyParser.json())
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
  })
  userActions(app, db)
  app.listen(8081, () => console.log('Example app listening on port 8081!'))
}
