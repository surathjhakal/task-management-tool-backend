const express = require('express')
const router = express.Router()
const fs = require('fs')
const upload = require('../../fileUploadConfig')
const path = require('path')
const filePath = path.join(__dirname, './uploaded-files')
console.log(filePath)

router.post('/upload-single', upload.single('file'), (req, res) => {
  try {
    return res.json({
      message: 'File uploded successfully',
    })
  } catch (error) {
    console.error(error)
  }
})

router.post('/upload-multiple', upload.array('files'), (req, res) => {
  try {
    return res.json({
      message: 'File uploded successfully',
    })
  } catch (error) {
    console.error(error)
  }
})

router.post('/delete-multiple', (req, res) => {
  const { files } = req.body
  files.forEach((fileName) => {
    fs.unlink(filePath + '/' + fileName, (err) => {
      if (err) {
        res.send(err)
      } else {
        res.send({ message: 'files deleted successfully' })
      }
    })
  })
})

module.exports = router
