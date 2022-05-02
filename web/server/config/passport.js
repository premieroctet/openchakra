const passport = require('passport')
const User = require('../models/User')
const {MANAGER} = require('../../utils/consts')
const keys = require('../config/keys')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {ADMIN, ROLES} = require('../../utils/consts')
const {FEURST_ADMIN} = require('../../utils/consts')

const jwt_opts = {
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT.secretOrKey,
}

if (ROLES && Object.keys(ROLES).length>0) {
  Object.keys(ROLES).forEach(role => {
    passport.use(role, new JwtStrategy(jwt_opts, (req, payload, done) => {
      try {
        User.findById(payload.id, {roles: role})
          .then(user => {
            if (user) {
              console.log(`Rôle ${role} ok`)
              return done(null, user)
            }
            console.error(`Rôle ${role} nécessaire`)
            return done(null, false, {message: `Rôle ${role} nécessaire`})
          })
          .catch(err => console.error(err))
      }
      catch (e) {
        console.error(`Error in strategy:${e}`)
        return done(null, false, {message: e})
      }
    }))
  })
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
