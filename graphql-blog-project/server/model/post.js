const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  comment: String,
  userId: String,
})

module.exports = mongoose.model('PostModel', PostSchema)
