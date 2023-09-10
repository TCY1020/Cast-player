const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    req.user = user
    if (err || !user) return res.status(401).json({ status: 'error', message: '沒登入' })
    next()
  })(req, res, next)
}

module.exports = {
  authenticated
}
