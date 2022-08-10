const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const {MANAGER} = require('../../utils/consts')
const keys = require('../config/keys')
const {ADMIN} = require('../../utils/others/consts')
const {FEURST_ADMIN} = require('../../utils/feurst/consts')

const jwt_opts = {
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT.secretOrKey,
}

passport.use('jwt', new JwtStrategy(jwt_opts, (req, payload, done) => {
  try {
    User.findById(payload.id)
      .populate('company')
      .populate('companies')
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false, {message: 'Vous devez être connecté'})
      })
      .catch(err => console.error(err))
  }
  catch (e) {
    console.error(`Error in strategy:${e}`)
    return done(null, false, {message: e})
  }
}))

passport.use('admin', new JwtStrategy(jwt_opts, (req, payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (user && (user.is_admin || (user.roles && user.roles.includes(FEURST_ADMIN)))) {
        return done(null, user)
      }
      return done(null, false, 'Vous devez être administrateur')
    })
    .catch(err => console.error(err))
}))

passport.use('b2badmin', new JwtStrategy(jwt_opts, (req, payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (user && user.roles && user.roles.includes(ADMIN)) {
        return done(null, user)
      }
      return done(null, false, "Vous devez être administrateur de l'entreprise")
    })
    .catch(err => console.error(err))
}))

passport.use('b2badminmanager', new JwtStrategy(jwt_opts, (req, payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (user && user.roles && (user.roles.includes(ADMIN)||user.roles.includes(MANAGER))) {
        return done(null, user)
      }
      return done(null, false, "Vous devez être administrateur de l'entreprise")
    })
    .catch(err => console.error(err))
}))

module.exports = passport
