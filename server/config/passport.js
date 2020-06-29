const passport = require("passport");
const { OAuth2Strategy: GoogleStrategy } = require("passport-google-oauth")

const JwtStrategy = require('passport-jwt').Strategy ;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const { getHost } = require('../../utils/mailing')

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.JWT.secretOrKey;

passport.use( new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(user => {
            if(user) {
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.log(err));
}));

const url = new URL('/myAlfred/api/authentication/google_hook', getHost()).toString()
passport.use(new GoogleStrategy({
        clientID: keys.GOOGLE_TOKENS.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_TOKENS.GOOGLE_CLIENT_SECRET,
        callbackURL: url
    },
    function(token, tokenSecret, profile, done) {
        console.log(token, tokenSecret, profile, done)
        console.log("ok?")
        return done(null, profile)
        /*
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            console.log(user)
            return done(err, user);

        });
    */
}));



module.exports = passport;