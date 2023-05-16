const jwt = require('jsonwebtoken')
const passport = require('passport')
const CookieStrategy = require('passport-cookie').Strategy
const User = require('../models/User')

// Requires connection
const cookieStrategy=new CookieStrategy(
  (token, done) => {
    const user=jwt.decode(token)
    User.findById(user.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false, {message: 'Vous devez être connecté'})
      })
      .catch(err => console.error(err))
  },
)
passport.use(cookieStrategy)

// Allows connected && non-connected (returning user {})
const allowNullCookieStrategy=new CookieStrategy(
  (token, done) => {
    const user=jwt.decode(token)
    User.findById(user.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, {})
      })
      .catch(err => console.error(err))
  },
)
allowNullCookieStrategy.name='nullable-cookie'
passport.use(allowNullCookieStrategy)

const sendCookie = (user, res) => {
  const token=jwt.sign({id: user.id}, 'secret')
  return res.cookie('token', token, {
    httpOnly: false,
    secure: true,
    sameSite: true,
  })
}

module.exports={sendCookie}
