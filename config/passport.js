const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const { User, Playlist, Podcast } = require('../models')
const bcrypt = require('bcrypt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

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
      const list = [
        {
          userId: user.id,
          name: '通勤清單',
          icon: '🚌'
        }, {
          userId: user.id,
          name: '學習清單',
          icon: '📚'
        }, {
          userId: user.id,
          name: '睡前清單',
          icon: '💤'
        }, {
          userId: user.id,
          name: '我的 Podcast',
          icon: '⛪'
        }
      ]
      await list.forEach(data => {
        Playlist.create({
          UserId: data.userId,
          icon: data.icon,
          name: data.name
        })
      })
      cb(null, user)
    } catch (err) {
      console.log(err)
    }
  }
  ))

  const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }
  passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
    try {
      const user = await User.findByPk(jwtPayload.id, {
        include: [
          Playlist,
          { model: Podcast, as: 'FavoritePodcasts' }
        ]
      })
      cb(null, user)
    } catch (err) {
      cb(err)
    }
  }))

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
