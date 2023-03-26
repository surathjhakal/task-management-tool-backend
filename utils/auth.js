const jwt = require('jsonwebtoken')
exports.createJWT = (user, token, duration) => {
  return jwt.sign(user, token, {
    expiresIn: duration,
  })
}
