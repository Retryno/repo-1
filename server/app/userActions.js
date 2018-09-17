const userActions = (app, db) => {
  app.get('/user-actions/:email', (req, res) => {
    db.collection('users').findOne({ email: req.params.email }, (err, result) => {
      if (err) throw err
      result
        ? res.send({items: result.actions})
        : res.send('')
    })
  })
  app.post('/authorization', (req, res) => {
    db.collection('users').findOne({ email: req.body.email }, (err, result) => {
      if (err) throw err
      result
        ? res.send(result)
        : res.send('')
    })
  })
  app.post('/get-all-messages', (req, res) => {
    db.collection('messages').findOne({email: req.body.email}, (err, result) => {
      if (err) throw err
      result
        ? res.send(result)
        : res.send('')
    })
  })
}
module.exports = userActions
