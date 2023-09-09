const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticated('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ status: 'error', message: '沒登入' })
    req.user = user
    next()
  })(req, res, next)
}

module.exports = {
  authenticated
}
