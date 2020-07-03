const router = require("express").Router();
const passport = require("passport");
const mongoose = require('mongoose');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');


const googleAuth = passport.authenticate('google', { session:false, scope: ['profile email https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.birthday.read'] })

// @Route GET /myAlfred/api/authentication/google
// Starts google authentication
router.get('/google', googleAuth)

// @Route GET /myAlfred/api/authentication/google_hook
// Authenticate user with google
router.get("/google_hook", googleAuth, (req,res) => {
    console.log("réponse___: ",req.user,"___fin")
    User.findOne({email: req.user.emails[0].value})
        .then (user => {
            if (user.external_auth.provider === "google") {
                console.log("utilisateur trouvé")
                sendCookie(res, user)
            } else if (user.email) {
                console.error("mail présent dans la base")
                res.status(403).redirect('/login?error=existingEmail')
            } else {
                console.log("utilisateur inexistant, création...")
                const user = addUserDB(req.user)
                sendCookie(res, user)
            }
        })
})

//Create JWT cookie with user credentials
const sendCookie = (res,user) => {
    const payload = {id: user.id, name: user.name, firstname: user.firstname, is_admin: user.is_admin, is_alfred: user.is_alfred} // Create JWT payload

    jwt.sign(payload, "secret", (err, token) => {
        res.status("201")
           .cookie('token', 'Bearer ' + token)
           .redirect('/')
    })
}

const addUserDB = (user) => {

}

module.exports = router;
