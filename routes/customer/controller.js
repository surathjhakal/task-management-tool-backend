const signUpTemplateCopy = require('../../models/signUpSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { createJWT } = require('../../utils/auth')

exports.signup = (req, res) => {
  const { name, mobileNumber, email, password } = req.body

  // console.log(name, mobileNumber, email, password)
  signUpTemplateCopy
    .findOne({ email: email })
    .then((data) => {
      console.log(data)
      if (data) {
        res.send({ userExist: true })
      } else {
        const signedUpUser = new signUpTemplateCopy(req.body)
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
    .catch((err) => {
      res.json(err)
    })
}

exports.login = (req, res) => {
  const { email, password } = req.body
  console.log(email)
  signUpTemplateCopy
    .findOne({ email: email })
    .then((data) => {
      console.log(data, 'data')
      if (data) {
        bcrypt.compare(password, data.password).then((isMatch) => {
          if (!isMatch) {
            return res.send({ passwordNotMatch: true })
          }
          const user = {
            uuid: data.uuid,
            email: data.email,
          }
          let access_token = createJWT(user, process.env.ACCESS_TOKEN_SECRET, 3600)
          let refresh_token = createJWT(user, process.env.REFRESH_TOKEN_SECRET, 3600)
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

exports.updateUser = (req, res) => {
  const { uuid } = req.params
  signUpTemplateCopy
    .findOneAndUpdate({ uuid: uuid }, req.body, { useFindAndModify: true })
    .then((data) => {
      if (data) {
        res.send({ message: 'Data updated properly' })
      }
    })
    .catch((error) => res.send(error))
}

exports.deleteUser = (req, res) => {
  const { uuid } = req.params
  signUpTemplateCopy
    .findOneAndRemove({ uuid: uuid })
    .then((data) => {
      if (data) {
        res.send({ message: 'User Deleted Successfully' })
      }
    })
    .catch((error) => res.send(error))
}

exports.getUser = (req, res) => {
  const { uuid } = req.params
  console.log(uuid)
  signUpTemplateCopy
    .find({ uuid: uuid })
    .then((data) => {
      if (data) {
        res.json(data[0])
      }
    })
    .catch((error) => res.send(error))
}

exports.getAllCustomers = (req, res) => {
  signUpTemplateCopy
    .find({})
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}
