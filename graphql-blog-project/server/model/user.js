const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  profession: String,
})

module.exports = mongoose.model('UserModel', UserSchema)
