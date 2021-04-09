const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {ADMIN} = require('../../utils/consts')

const {ENABLE_GF_LOGIN} = require('../../config/config');

if (ENABLE_GF_LOGIN) {
  const {get_host_url} = require('../../config/config');
  const {OAuth2Strategy: GoogleStrategy} = require('passport-google-oauth');
  const {Strategy: FacebookStrategy} = require('passport-facebook');

  const google_opts = {
    clientID: keys.GOOGLE_TOKENS.CLIENT_ID,
    clientSecret: keys.GOOGLE_TOKENS.CLIENT_SECRET,
    callbackURL: new URL('/myAlfred/api/authentication/google_hook', get_host_url()).toString(),
  };

  const facebook_opts = {
    clientID: keys.FACEBOOK_TOKENS.CLIENT_ID,
    clientSecret: keys.FACEBOOK_TOKENS.CLIENT_SECRET,
    callbackURL: new URL('/myAlfred/api/authentication/facebook_hook', get_host_url()).toString(),
    profileFields: ['id', 'name', 'photos', 'emails'],
  };

  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile);

  passport.use(new GoogleStrategy(google_opts, callback));
  //TODO: check google token

  passport.use(new FacebookStrategy(facebook_opts, callback));
}

const jwt_opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT.secretOrKey,
};


passport.use('jwt', new JwtStrategy(jwt_opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false, { message: 'Vous devez être connecté' });
    })
    .catch(err => console.error(err));
}));

passport.use('admin', new JwtStrategy(jwt_opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user && user.is_admin) {
        return done(null, user);
      }
      return done(null, false, "Vous devez être administrateur");
    })
    .catch(err => console.error(err));
}));

passport.use('b2badmin', new JwtStrategy(jwt_opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user && user.roles && user.roles.includes(ADMIN)) {
        return done(null, user);
      }
      return done(null, false, "Vous devez être administrateur de l'entreprise");
    })
    .catch(err => console.error(err));
}));

passport.use('b2badminmanager', new JwtStrategy(jwt_opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user && user.roles && (user.roles.includes(ADMIN)||user.roles.includes(MANAGER))) {
        return done(null, user);
      }
      return done(null, false, "Vous devez être administrateur de l'entreprise");
    })
    .catch(err => console.error(err));
}));


module.exports = passport;
