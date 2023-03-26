const mongoose = require('mongoose')

const signUpAdminTemplate = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  profession: {
    type: String,
    default: null,
  },
  profilePhoto: {
    type: String,
    default: null,
  },
  country: {
    type: String,
    default: null,
  },
  assigned_tasks: {
    type: Array,
    default: [],
  },
  tasks_created: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    default: null,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Internal User', signUpAdminTemplate)
