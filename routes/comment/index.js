const express = require('express')
const router = express.Router()

const { createComment, updateComment, deleteComment, getComments } = require('./controller.js')

router.post('/create', createComment)

router.post('/get', getComments)

router.put('/:id', updateComment)

router.post('/delete', deleteComment)

module.exports = router
