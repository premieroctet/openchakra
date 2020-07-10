const router = require("express").Router();
const passport = require("passport");
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const {getHost} = require('../../../utils/infra')

const googleAuth = passport.authenticate('google', {session:false, scope: ['profile', 'email'] })
const facebookAuth = passport.authenticate('facebook', {session:false, scope: ['email']})

// @Route GET /myAlfred/api/authentication/google
// Starts google authentication
router.get('/google', googleAuth)

// @Route GET /myAlfred/api/authentication/google_hook
// Google callback
router.get("/google_hook", googleAuth, (req,res) => authController(req,res,"google"))



// @Route GET /myAlfred/api/authentication/facebook
// Starts facebook authentication
router.get('/facebook', facebookAuth)

// @Route GET /myAlfred/api/authentication/facebook_hook
// Facebook callback
router.get("/facebook_hook", facebookAuth, (req,res) => authController(req,res))



// Check for email in database and login or register
const authController = (req,res) => {

    const userData = extractUser(req)

    User.findOne({"external_auth.id": userData.id, "external_auth.provider": userData.provider})
        .then(user => {
            if (!user) {
                User.findOne({email: userData.email})
                    .then(user => {
                        if (!user)
                            redirectRegistration(userData, res)
                        else
                            res.status(403).redirect('/?error=existingEmail')
                    }).catch(err => {throw err})
            } else {
                sendCookie(user, res)
            }
        }).catch(err => console.error(err))
}


// Extract user data depending on the provider
const extractUser = (req) => {
    console.log(req.user)
    var user = {
            id: req.user.id,
            lastName: req.user.name.familyName,
            firstName: req.user.name.givenName,
            email: req.user.emails[0].value,
            picture: req.user.photos[0].value,
            provider: req.user.provider
        }
    return user
}


//Create JWT cookie with user credentials
const sendCookie = (user,res) => {
    const payload = {id: user.id, name: user.name, firstname: user.firstname, is_admin: user.is_admin, is_alfred: user.is_alfred} // Create JWT payload

    jwt.sign(payload, keys.JWT.secretOrKey, (err, token) => {
        res.cookie('token', 'Bearer ' + token, {
               httpOnly: false,
               secure: true,
               sameSite: true
           })
           .status("201")
           .redirect('/')
    })
}

// Sendback user to / to finish registration
const redirectRegistration = (user, res) => {
    const url = new URLSearchParams({
        [user.provider+"_id"]: user.id,
        "lastname": user.lastName,
        "firstname": user.firstName,
        "email": user.email,
        "picture": user.picture
    })
    res.status(200).redirect(new URL("?"+url.toString(), getHost()))
}

module.exports = router;
