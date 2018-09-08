export default (server, socket, db) => {
  return () => {
    db.collection('users').find({}).toArray((err, result) => {
      if (err) throw err
      console.log(result)
    })
  }
}
