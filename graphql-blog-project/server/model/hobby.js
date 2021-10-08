const moongoose = require('mongoose')

const HobbySchema = new moongoose.Schema({
  title: String,
  description: String,
  userId: String,
})

module.exports = moongoose.model('HobbyModel', HobbySchema)
