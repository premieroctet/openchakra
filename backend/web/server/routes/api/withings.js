const express = require('express')
const passport = require('passport')

const router = express.Router()

// const wConfig=getWithingsConfig()

router.get('/', (req, res) => {
  res.json('ok')
})

router.get('/setup', passport.authenticate('cookie', {session: false}), (req, res) => {
  console.log(`redirect to setup for ${req.user.email}, token is ${req.user.csrf_token}`)
  return Promise.resolve(res
    .cookie('access_token', req.user.access_token, {
      domain: '.withings.com',
      secure: true,
      maxAge: 10800,
    })
    .redirect(`https://inappviews.withings.com/sdk/setup?csrf_token=${req.user.csrf_token}`),
  )
})

router.get('/settings', passport.authenticate('cookie', {session: false}), (req, res) => {
  console.log(`redirect to settings for ${req.user.email}, token is ${req.user.csrf_token}`)
  return Promise.resolve(res
    .cookie('access_token', req.user.access_token, {
      domain: '.withings.com',
      secure: true,
      maxAge: 10800,
    })
    .redirect(`https://inappviews.withings.com/sdk/settings?csrf_token=${req.user.csrf_token}`),
  )
})

module.exports = router
