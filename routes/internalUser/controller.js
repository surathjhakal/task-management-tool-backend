const signUpAdminTemplateCopy = require('../../models/signUpAdminSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { createJWT } = require('../../utils/auth')

exports.adminSignup = (req, res) => {
  const { name, mobileNumber, email, password } = req.body

  // console.log(name, mobileNumber, email, password)
  signUpAdminTemplateCopy.findOne({ email: email }).then((data) => {
    if (data) {
      res.send({ userExist: true })
    } else {
      const signedUpUser = new signUpAdminTemplateCopy(req.body)
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) throw err
          signedUpUser.password = hash
          signedUpUser
            .save()
            .then((response) => {
              res.json(response)
            })
            .catch((err) => {
              res.json(err)
            })
        })
      })
    }
  })
}

exports.adminLogin = (req, res) => {
  const { email, password } = req.body

  signUpAdminTemplateCopy
    .findOne({ email: email })
    .then((data) => {
      if (data) {
        bcrypt.compare(password, data.password).then((isMatch) => {
          if (!isMatch) {
            return res.send({ passwordNotMatch: true })
          }
          const user = {
            uuid: data.uuid,
            email: data.email,
          }
          const access_token = createJWT(user, process.env.ACCESS_TOKEN_SECRET, 3600)
          const refresh_token = createJWT(user, process.env.REFRESH_TOKEN_SECRET, 3600)
          return res.json({
            access_token: access_token,
            refresh_token: refresh_token,
            data: data,
          })
        })
      } else {
        res.send({
          userNotPresent: true,
        })
      }
    })
    .catch((error) => res.send(error))
}

exports.updateAdminUser = (req, res) => {
  const { uuid } = req.params
  signUpAdminTemplateCopy
    .findOneAndUpdate({ uuid: uuid }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}

exports.deleteAdminUser = (req, res) => {
  const { uuid } = req.params
  signUpAdminTemplateCopy
    .findOneAndRemove({ uuid: uuid })
    .then((data) => {
      if (data) {
        res.send({ message: 'User Deleted Successfully' })
      }
    })
    .catch((error) => res.send(error))
}

exports.getAdminUser = (req, res) => {
  const { uuid } = req.params
  signUpAdminTemplateCopy
    .find({ uuid: uuid })
    .then((data) => {
      if (data) {
        res.json(data[0])
      }
    })
    .catch((error) => res.send(error))
}

exports.getAllUsers = (req, res) => {
  signUpAdminTemplateCopy
    .find({})
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}
