const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');


const googleAuth = passport.authenticate('google', { session:false, scope: ['profile email https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.birthday.read'] })

router.get('/google', googleAuth)

// @Route GET /myAlfred/api/authentication/google_hook
// Get all availability for one user
router.get("/google_hook", googleAuth, (req,res) => {
        const payload = {id: "5ebbfe46bed2fb7e1ba6a052", name: "Martinez", firstname: "Mateo", is_admin: false, is_alfred: false}; // Create JWT payload

        jwt.sign(payload, "secret", (err, token) => {
            res.send({success: true, token: 'Bearer ' + token});
        });
    }
)

module.exports = router;
