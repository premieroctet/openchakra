const passport = require("passport");
const mongoose = require('mongoose');
const User = mongoose.model('users');

const keys = require('../config/keys');
const { getHost } = require('../../utils/infra')

const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth")
const JwtStrategy = require('passport-jwt').Strategy ;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwt_opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.JWT.secretOrKey
};

const google_opts = {
    clientID: keys.GOOGLE_TOKENS.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_TOKENS.GOOGLE_CLIENT_SECRET,
    callbackURL: new URL('/myAlfred/api/authentication/google_hook', getHost()).toString()
}

const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile)


passport.use( new JwtStrategy(jwt_opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if(user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
}));


passport.use(new GoogleStrategy(google_opts, callback))
//TODO: check google token



module.exports = passport;