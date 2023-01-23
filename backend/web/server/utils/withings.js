var express = require('express')
//var config = require('./config/app')
var app = express()
var Withings = require('withings-lib');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const CLIENT_ID='c17b9af2902c60fe8ba0c8d53ec801dcad79427b069b3a4a3716ec03177a87aa'
const CLIENT_SECRET='eff25c4e04183a941f23dd6e5127d69c03d8cbd949411088730746c2af3b79b0'

app.use(cookieParser());
app.use(session({secret: 'bigSecret'}));
app.listen(5000);
console.log('starting')
// OAuth flow
app.get('/withings', function (req, res) {
    // Create an API client and start authentication via OAuth
    console.log(`Getting /')'`)
    var options = {
        consumerKey: CLIENT_ID,
        consumerSecret: CLIENT_SECRET,
        callbackUrl: 'http://my-alfred.io:5000/withings/oauth_callback'
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
