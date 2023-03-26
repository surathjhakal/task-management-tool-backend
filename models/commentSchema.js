const mongoose = require('mongoose')

const CommentTemplate = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tagged_users: {
    type: Array,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Comment', CommentTemplate)
