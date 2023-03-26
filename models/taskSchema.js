const mongoose = require('mongoose')

const TaskTemplate = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  assigned_users: {
    type: Array,
    default: [],
  },
  description: {
    type: String,
    default: null,
  },
  task_files: {
    type: Array,
    default: [],
  },
  task_solutions: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Task', TaskTemplate)
