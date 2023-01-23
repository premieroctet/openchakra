const { getWithingsConfig } = require('../../../config/config');
const express = require('express')
const Withings=require('withings-lib')

const router = express.Router()

const wConfig=getWithingsConfig()

router.get('/', (req, res) => {
  // Create an API client and start authentication via OAuth
  console.log(`Getting /')'`)
  var options = {
    consumerKey: wConfig.clientId,
    consumerSecret: wConfig.clientSecret,
    callbackUrl: 'http://my-alfred.io:5000/withings/oauth_callback'
  };
  var client = new Withings(options);

  client.getRequestToken(function(err, token, tokenSecret) {
    if (err) {
      console.error(err)
      // Throw error
      return;
    }

    req.session.oauth = {
      requestToken: token,
      requestTokenSecret: tokenSecret
    };

    const url = client.authorizeUrl(token, tokenSecret)
    console.log(`Redirecting to ${url}`)
    res.redirect(url);
  });
});

module.exports = router
