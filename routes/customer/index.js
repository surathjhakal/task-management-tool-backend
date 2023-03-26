const express = require('express')
const router = express.Router()
const {
  signup,
  login,
  deleteUser,
  updateUser,
  getUser,
  getAllCustomers,
} = require('./controller.js')

router.post('/signup', signup)

router.post('/login', login)

router.get('/:uuid', getUser)

router.post('/getAllCustomers', getAllCustomers)

router.put('/:uuid', updateUser)

router.delete('/:uuid', deleteUser)

module.exports = router
