const router = require("express").Router();
const passport = require("passport");

const googleAuth = passport.authenticate('google', { scope: ['profile email https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.birthday.read'] })

router.get('/google', googleAuth)

// @Route GET /myAlfred/api/authentication/google_hook
// Get all availability for one user
router.get("/google_hook",
    passport.authenticate("google", {
        successRedirect: "/",
        failureRedirect: "/login"
    })
)

module.exports = router;
