const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const { User } = require('../models')
const bcrypt = require('bcrypt')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK
  }, async (accessToken, refreshToken, expires_in, profile, done) => {
    try {
      const { email, images, display_name } = profile._json
      const user = await User.findOne({ where: { email } })
      if (user) return done(null, user)
      await User.create({
        email,
        password: '12345678',
        name: display_name,
        avatar: images[0].url
      })
    } catch (err) {
      console.log(err)
    }
  }
  ))
}
