const router = require("express").Router();
const passport = require("passport");
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');


const googleAuth = passport.authenticate('google', { session:false, scope: ['profile email https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.birthday.read'] })

// @Route GET /myAlfred/api/authentication/google
// Starts google authentication
router.get('/google', googleAuth)

// @Route GET /myAlfred/api/authentication/google_hook
// Authenticate user with google
router.get("/google_hook", googleAuth, async (req,res) => {
    console.log("réponse___: ",req.user,"___fin")
    User.findOne({email: req.user.emails[0].value})
        .then (user => {
            if(!user){
                console.log("utilisateur inexistant, création...")
                addUserDB(req.user).then(user =>{
                    console.log("HERE 2 : ", user)
                    sendCookie(res, user)
                }).catch(err => console.error(err))
            } else if (user.external_auth.provider === "google") {
                console.log("utilisateur trouvé")
                sendCookie(res, user)
            } else {
                console.error("mail présent dans la base")
                res.status(403).redirect('/login?error=existingEmail')
            }
        }).catch(err=>console.error(err))
})

//Create JWT cookie with user credentials
const sendCookie = (res,user) => {
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

const addUserDB = user => {
    return new Promise((resolve, reject)=> {
        console.log(user)
        const newUser = new User({
            name: user.name.familyName,
            //gender:
            firstname: user.name.givenName,
            email: user.emails[0].value,
            //birthday:
            //phone:
            picture: user.photos[0].value,
            /*billing_address:{
                address: this.state.address,
                zip_code: this.state.zip_code,
                city: this.state.city,
                country: this.state.country,
                lat: this.state.lat,
                lng: this.state.lng,
            }*/
            external_auth: {
                provider: user.provider,
                id: user.id
            }
        })
        console.log(newUser)
        newUser.save()
            .then(user => {
                console.log("HERE : ", user)
                resolve(user)
            }).catch(err=>{
                console.error(err)
                reject(err)
            })
    })
}

module.exports = router;
