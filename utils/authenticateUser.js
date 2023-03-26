const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization.split(' ')[1]

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  // Verify token
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' })
      } else {
        req.userUUID = decoded.uuid
        next()
      }
    })
  } catch (err) {
    console.error('something wrong with auth middleware')
    res.status(500).json({ msg: 'Server Error' })
  }
}

export default authenticateUser
