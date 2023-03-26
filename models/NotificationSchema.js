const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  meesage: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Notification', NotificationSchema)
