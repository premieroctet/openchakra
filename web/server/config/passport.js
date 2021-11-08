const passport = require('passport')
const keys = require('../config/keys')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {ADMIN} = require('../../utils/consts')

const {ENABLE_GF_LOGIN} = require('../../config/config')

if (ENABLE_GF_LOGIN) {
  /* eslint-disable global-require */
  const {get_host_url} = require('../../config/config')
  const {OAuth2Strategy: GoogleStrategy} = require('passport-google-oauth')
  const {Strategy: FacebookStrategy} = require('passport-facebook')
  /* eslint-enable global-require */

  const google_opts = {
    clientID: keys.GOOGLE_TOKENS.CLIENT_ID,
    clientSecret: keys.GOOGLE_TOKENS.CLIENT_SECRET,
    callbackURL: new URL('/myAlfred/api/authentication/google_hook', get_host_url()).toString(),
  }

  const facebook_opts = {
    clientID: keys.FACEBOOK_TOKENS.CLIENT_ID,
    clientSecret: keys.FACEBOOK_TOKENS.CLIENT_SECRET,
    callbackURL: new URL('/myAlfred/api/authentication/facebook_hook', get_host_url()).toString(),
    profileFields: ['id', 'name', 'photos', 'emails'],
  }

  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile)

  // TODO: check google token
  passport.use(new GoogleStrategy(google_opts, callback))
  passport.use(new FacebookStrategy(facebook_opts, callback))
}

const jwt_opts = {
  passReqToCallback: true,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT.secretOrKey,
}


passport.use('jwt', new JwtStrategy(jwt_opts, (req, payload, done) => {
  try {
    req.context.getModel('User').findById(payload.id)
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
  req.context.getModel('User').findById(payload.id)
    .then(user => {
      if (user && user.is_admin) {
        return done(null, user)
      }
      return done(null, false, 'Vous devez être administrateur')
    })
    .catch(err => console.error(err))
}))

passport.use('b2badmin', new JwtStrategy(jwt_opts, (req, payload, done) => {
  req.context.getModel('User').findById(payload.id)
    .then(user => {
      if (user && user.roles && user.roles.includes(ADMIN)) {
        return done(null, user)
      }
      return done(null, false, "Vous devez être administrateur de l'entreprise")
    })
    .catch(err => console.error(err))
}))

passport.use('b2badminmanager', new JwtStrategy(jwt_opts, (req, payload, done) => {
  req.context.getModel('User').findById(payload.id)
    .then(user => {
      if (user && user.roles && (user.roles.includes(ADMIN)||user.roles.includes(MANAGER))) {
        return done(null, user)
      }
      return done(null, false, "Vous devez être administrateur de l'entreprise")
    })
    .catch(err => console.error(err))
}))

module.exports = passport
