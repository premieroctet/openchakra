const session = require('express-session');
const express = require('express')
const { getWithingsConfig } = require('../../config/config');
const Withings = require('withings-lib');
const cookieParser = require('cookie-parser');
const app = express()

const wConfig=getWithingsConfig()

app.use(cookieParser());
app.use(session({secret: 'bigSecret'}));
app.listen(5000);
console.log('starting')
// OAuth flow
app.get('/withings', function (req, res) {
    // Create an API client and start authentication via OAuth
    console.log(`Getting /')'`)
    var options = {
        consumerKey: wConfig.clientId,
        consumerSecret: wConfig.clientSecret,
        callbackUrl: 'https://dekuple.my-alfred.io:4202/withings/oauth_callback'
    };
    var client = new Withings(options);

    client.getRequestToken(function (err, token, tokenSecret) {
        if (err) {
          console.error(err)
            // Throw error
          return;
        }

        req.session.oauth = {
            requestToken: token,
            requestTokenSecret: tokenSecret
        };

        const url=client.authorizeUrl(token, tokenSecret)
        console.log(`Redirecting to ${url}`)
        res.redirect(url);
    });
});

// On return from the authorization
app.get('/withings/oauth_callback', function (req, res) {
    var verifier = req.query.oauth_verifier
    var oauthSettings = req.session.oauth
    var options = {
        consumerKey: CLIENT_ID,
        consumerSecret: CLIENT_SECRET,
        callbackUrl: 'https://dekuple.my-alfred.io',
        userID: req.query.userid
    };
    var client = new Withings(options);

    // Request an access token
    client.getAccessToken(oauthSettings.requestToken, oauthSettings.requestTokenSecret, verifier,
        function (err, token, secret) {
            if (err) {
                // Throw error
                return;
            }

            oauthSettings.accessToken = token;
            oauthSettings.accessTokenSecret = secret;

            res.redirect('/activity/steps');
        }
    );
});

// Display today's steps for a user
app.get('/activity/steps', function (req, res) {
    var options = {
        consumerKey: config.CONSUMER_KEY,
        consumerSecret: config.CONSUMER_SECRET,
        accessToken: req.session.oauth.accessToken,
        accessTokenSecret: req.session.oauth.accessTokenSecret,
        userID: req.query.userid
    };
    var client = new Withings(options);

    client.getDailySteps(new Date(), function(err, data) {
        if (err) {
            res.send(err);
        }
        res.json(data);
    })
});
