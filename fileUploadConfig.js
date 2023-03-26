const multer = require('multer')
const path = require('path')
const filePath = path.join(__dirname, './uploaded-files')
console.log(filePath)

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname.toLowerCase().trim().split(' ').join('-')}`)
  },
})

const fileFilter = (req, file, cb) => {
  console.log(file)
  if (
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype.includes('zip') ||
    file.mimetype == 'application/pdf'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
})

module.exports = upload
