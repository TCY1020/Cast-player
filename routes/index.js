const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get('/api/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private']
})) // 向 spotify 要求email、public_profile資料

router.get('/api/auth/spotify/callback', passport.authenticate('spotify', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
module.exports = router
