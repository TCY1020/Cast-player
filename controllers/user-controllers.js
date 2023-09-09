const passport = require('passport')
const jwt = require('jsonwebtoken')
const userServices = require('../services/user-services')

const userController = {
  spotifyLogin: async (req, res, next) => {
    try {
      passport.authenticate('spotify', {
        successRedirect: '/',
        failureRedirect: '/users/login'
      }, (err, user) => {
        if (err) throw new Error('spotifyLogin error')
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.json({
          status: 'success',
          data: {
            token,
            user
          }
        })
      })(req, res, next)
    } catch (err) {
      console.log(err)
    }
  },
  getUserPlaylist: (req, res, next) => {
    userServices.getUserPlaylist(req, (err, data) => err ? next(err) : res.status(200).json(data))
  }
}
module.exports = userController
