const express = require('express')
const router = express.Router()

const {
  adminSignup,
  adminLogin,
  getAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getAllUsers,
} = require('./controller.js')

router.post('/signup', adminSignup)

router.post('/login', adminLogin)

router.get('/:uuid', getAdminUser)

router.post('/getAllUsers', getAllUsers)

router.put('/:uuid', updateAdminUser)

router.delete('/:uuid', deleteAdminUser)

module.exports = router
