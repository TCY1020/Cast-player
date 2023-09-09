const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const bcrypt = require('bcrypt')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }, async (accessToken, refreshToken, expires_in, profile, cb) => {
    try {
      const { email, images, display_name } = profile._json
      let user = await User.findOne({ where: { email } })
      if (user) return cb(null, user)
      user = await User.create({
        email,
        password: '12345678',
        name: display_name,
        avatar: images[0].url
      })
      cb(null, user)
    } catch (err) {
      console.log(err)
    }
  }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id)
      return done(null, user)
    } catch (err) {
      console.log(err)
    }
  })
}
