const express = require('express')
const router = express.Router()

const { createNotification, deleteNotification, getNotifications } = require('./controller.js')

router.post('/create', createNotification)

router.get('/:user', getNotifications)

router.delete('/:uuid', deleteNotification)

module.exports = router
