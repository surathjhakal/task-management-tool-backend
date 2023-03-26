const express = require('express')
const router = express.Router()

const {
  createTask,
  updateTask,
  deleteTask,
  getTask,
  getAllTasks,
  getRecent5Tasks,
  getUserTasks,
  getCompletedTaskLength,
  getAllUUIDTasks,
} = require('./controller.js')

router.post('/create', createTask)

router.post('/allUUIDTasks', getAllUUIDTasks)

router.get('/all', getAllTasks)

router.get('/recent-tasks/:owner', getRecent5Tasks)

router.get('/:uuid', getTask)

router.get('/user/:owner', getUserTasks)

router.get('/completed-count/:owner', getCompletedTaskLength)

router.put('/:uuid', updateTask)

router.delete('/:uuid', deleteTask)

module.exports = router
