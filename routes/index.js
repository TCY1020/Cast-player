const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/user-controllers')
const playlistController = require('../controllers/playlist-controller')
const { authenticated } = require('../middleware/auth')
const { apiErrorHandler } = require('../middleware/error-handler')

router.get('/api/auth/spotify', passport.authenticate('spotify', {
  scope: ['user-read-email', 'user-read-private']
})) // 向 spotify 要求email、public_profile資料

router.get('/api/auth/spotify/callback', userController.spotifyLogin)

// user
router.get('/api/user/:id/playlist', authenticated, userController.getUserPlaylist)

// playlist
router.get('/api/playlist/:playlistId', authenticated, playlistController.getPlaylistPodcaster)
router.put('/api/playlist/:playlistId', authenticated, playlistController.putPlaylist)
router.post('/api/playlist', authenticated, playlistController.postPlaylist)
router.use('/', apiErrorHandler)
module.exports = router
