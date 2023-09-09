const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/user-controllers')
const { authenticated } = require('../middleware/auth')
const { apiErrorHandler } = require('../middleware/error-handler')

router.get('/api/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private']
})) // 向 spotify 要求email、public_profile資料

router.get('/api/auth/spotify/callback', userController.spotifyLogin)
router.get('/api/user/:id/playlist', userController.getUserPlaylist)
router.use('/', apiErrorHandler)
module.exports = router
