const router = require("express").Router();
const passport = require("passport");
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const {getHost} = require('../../../utils/infra')

const googleAuth = passport.authenticate('google', { session:false, scope: ['profile email'] })

// @Route GET /myAlfred/api/authentication/google
// Starts google authentication
router.get('/google', googleAuth)

// @Route GET /myAlfred/api/authentication/google_hook
// Authenticate user with google
router.get("/google_hook", googleAuth, (req,res) => authController(req,res,"google"))



// Check for email in database and login or register
const authController = (req,res,provider) => {
    User.findOne({email: req.user.emails[0].value})
        .then(user => {
            if (!user) {
                redirectRegistration(req, res, provider)
            } else if (user.external_auth.provider === provider) {
                sendCookie(req.user, res)
            } else {
                res.status(403).redirect('/?error=existingEmail')
            }
        }).catch(err => console.error(err))
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
const redirectRegistration = (req, res, provider) => {
    const url = new URLSearchParams({
        [provider+"_id"]: req.user.id,
        "lastname": req.user.name.familyName,
        "firstname": req.user.name.givenName,
        "email": req.user.emails[0].value,
        "picture": req.user.photos[0].value
    })
    res.status(200).redirect(new URL("?"+url.toString(), getHost()))
}

module.exports = router;
