const jwt = require('jsonwebtoken')
const passport = require('passport')
const CookieStrategy = require('passport-cookie').Strategy
const User = require('../models/User')

passport.use(new CookieStrategy(
  function(token, done) {
    const user=jwt.decode(token)
    User.findById(user.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false, {message: 'Vous devez être connecté'})
      })
      .catch(err => console.error(err))
  }
));

const sendCookie = (user, res) => {
  const token=jwt.sign({id: user.id}, 'secret')
  return res.cookie('token', token, {
    httpOnly: false,
    secure: true,
    sameSite: true,
  })
}

module.exports={sendCookie}
