const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const mongoose = require('mongoose');

const validateRegisterInput = require('../../validation/register');
const validateSimpleRegisterInput = require('../../validation/simpleRegister');
const validateLoginInput = require('../../validation/login');

const User = require('../../models/User');
const ResetToken = require('../../models/ResetToken');
const crypto = require('crypto');
const multer = require("multer");
const nodemailer = require("nodemailer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/profile/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const upload = multer({ storage: storage });


router.get('/test',(req, res) => res.json({msg: 'Users Works!'}) );

// @Route POST /myAlfred/api/users/register
// Register
router.post('/register',(req,res) =>{
    const {errors, isValid} = validateSimpleRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                errors.email = 'Email already exist';
                return res.status(400).json({errors});
            } else {
                const userFields = {};
                userFields.name = req.body.name;
                userFields.gender = req.body.gender;
                userFields.firstname = req.body.firstname;
                userFields.email = req.body.email;
                userFields.password = req.body.password;
                userFields.birthday = req.body.birthday;


                        const newUser = new User(userFields);
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        res.json(user);
                                        let transporter = nodemailer.createTransport({
                                            host: 'smtp.ethereal.email',
                                            port: 587,
                                            auth: {
                                                user: 'kirstin85@ethereal.email',
                                                pass: '1D7q6PCENKSX5cj622'
                                            }
                                        });

                                        let info = transporter.sendMail({
                                            from: 'kirstin85@ethereal.email', // sender address
                                            to: `${user.email}`, // list of receivers
                                            subject: "Valider votre compte", // Subject line
                                            text: `http://localhost:3000/validateAccount?user=${user._id}`, // plain text body
                                            html: '<a href='+'http://localhost:3000/validateAccount?user='+user._id+'>Cliquez içi</a>' // html body
                                        });
                                    })
                                    .catch(err => console.log(err));
                            })
                        })


            }
        })
});

// @Route PUT /myAlfred/api/users/validateAccount
// Validate account after register
router.post('/validateAccount',(req,res) => {
    User.findByIdAndUpdate(mongoose.Types.ObjectId(req.body.id), {
        is_confirmed: true
    },{new:true})
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
        })
});

// @Route PUT /myAlfred/api/users/profile/billingAddress
// Add an address in the profile
// @Access private
router.put('/profile/billingAddress',passport.authenticate('jwt',{session: false}), (req,res) => {

    User.findById(req.user.id)
        .then(user => {
            user.billing_address = {};
            user.billing_address.address = req.body.address;
            user.billing_address.zip_code = req.body.zip_code;
            user.billing_address.city = req.body.city;

            if (req.body.country === '1') {
                user.billing_address.country = 'France';
            } else {
                user.billing_address.country = 'Maroc';
            }

            user.billing_address.gps = {};

            let address = req.body.address;
            let city = req.body.city;

            let newAddress = address.replace(/ /g, '+');

            const url = newAddress + '%2C+' + city + '&format=geojson&limit=1';

            axios.get(`https://nominatim.openstreetmap.org/search?q=${url}`)
                .then(response => {

                    let result = response.data.features;

                    result.forEach(function (element) {
                        user.billing_address.gps.lat = element.geometry.coordinates[1];
                        user.billing_address.gps.lng = element.geometry.coordinates[0];
                    });

                    user.save().then(user => res.json(user)).catch(err => console.log(err));

                })
                .catch(error => {
                    console.log(error)
                });
        })
});

// @Route PUT /myAlfred/api/users/profile/serviceAddress
// Add an other address in the profile
// @Access private
router.put('/profile/serviceAddress',passport.authenticate('jwt',{session: false}), (req,res) => {

    User.findById(req.user.id)
        .then(user => {
            user.service_address = {};
            user.service_address.address = req.body.address;
            user.service_address.zip_code = req.body.zip_code;
            user.service_address.city = req.body.city;

            if (req.body.country === '1') {
                user.service_address.country = 'France';
            } else {
                user.service_address.country = 'Maroc';
            }

            user.service_address.gps = {};

            let address = req.body.address;
            let city = req.body.city;

            let newAddress = address.replace(/ /g, '+');

            const url = newAddress + '%2C+' + city + '&format=geojson&limit=1';

            axios.get(`https://nominatim.openstreetmap.org/search?q=${url}`)
                .then(response => {

                    let result = response.data.features;

                    result.forEach(function (element) {
                        user.service_address.gps.lat = element.geometry.coordinates[1];
                        user.service_address.gps.lng = element.geometry.coordinates[0];
                    });

                    user.save().then(user => res.json(user)).catch(err => console.log(err));

                })
                .catch(error => {
                    console.log(error)
                });
        })
});

// @Route PUT /myAlfred/api/users/profile/phone
// Add phone number in profile
// @Access private
router.put('/profile/phone',passport.authenticate('jwt',{session:false}),(req,res) => {
    User.findByIdAndUpdate(req.user.id, {
        phone: req.body.phone
    },{new:true})
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
        })
});

// @Route PUT /myAlfred/api/users/profile/job
// Add job in profile
// @Access private
router.put('/profile/job',passport.authenticate('jwt',{session:false}),(req,res) => {
    User.findByIdAndUpdate(req.user.id, {
        job: req.body.job
    },{new:true})
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
        })
});

// @Route PUT /myAlfred/api/users/profile/picture
// Add a picture profile
// @Access private
router.post('/profile/picture',upload.single('myImage'),passport.authenticate('jwt',{session:false}),(req,res) => {
    User.findByIdAndUpdate(req.user.id, {
        picture: req.file.path
    },{new:true})
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            console.log(err)
        })
});

// @Route POST /myAlfred/api/users/register/alfred
// Register an alfred
router.post('/register/alfred', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                errors.email = 'Email already exist';
                return res.status(400).json({errors});
            } else {
                const alfredFields = {};
                alfredFields.name = req.body.name;
                alfredFields.gender = req.body.gender;
                alfredFields.firstname = req.body.firstname;
                alfredFields.email= req.body.email;
                alfredFields.password = req.body.password;
                alfredFields.birthday = req.body.birthday;
                alfredFields.phone =  req.body.phone;
                alfredFields.is_alfred = true;

                alfredFields.billing_address = {};
                if(req.body.address) alfredFields.billing_address.address = req.body.address;
                if(req.body.city) alfredFields.billing_address.city = req.body.city;
                if(req.body.zip_code) alfredFields.billing_address.zip_code = req.body.zip_code;
                if(req.body.country) alfredFields.billing_address.country = req.body.country;

                alfredFields.service_address = {};
                if(req.body.service_address) alfredFields.service_address.address = req.body.service_address;
                if(req.body.service_city) alfredFields.service_address.city = req.body.service_city;
                if(req.body.service_zip_code) alfredFields.service_address.zip_code = req.body.service_zip_code;
                if(req.body.service_country) alfredFields.service_address.country = req.body.service_country;

                alfredFields.picture = req.body.picture;
                if(req.body.job) alfredFields.job = req.body.job;
                if(req.body.siret) alfredFields.siret = req.body.siret;
                if(req.body.vat_number) alfredFields.vat_number = req.body.vat_number;

                alfredFields.account = {};
                if(req.body.bank_code) alfredFields.account.bank_code = req.body.bank_code;
                if(req.body.guichet_code) alfredFields.account.guichet_code = req.body.guichet_code;
                if(req.body.account_number) alfredFields.account.account_number = req.body.account_number;
                if(req.body.rib_key) alfredFields.account.rib_key = req.body.rib_key;
                if(req.body.iban) alfredFields.account.iban = req.body.iban;
                if(req.body.bic) alfredFields.account.bic = req.body.bic;
                const newUser = new User (alfredFields);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }


        })
});

// @Route POST /myAlfred/api/users/register/user
// Register a user
router.post('/register/user', (req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user) {
                errors.email = 'Email already exist';
                return res.status(400).json({errors});
            } else {
                const userFields = {};
                userFields.name = req.body.name;
                userFields.gender = req.body.gender;
                userFields.firstname = req.body.firstname;
                userFields.email= req.body.email;
                userFields.password = req.body.password;
                userFields.birthday = req.body.birthday;
                userFields.phone =  req.body.phone;


                userFields.billing_address = {};
                if(req.body.address) userFields.billing_address.address = req.body.address;
                if(req.body.city) userFields.billing_address.city = req.body.city;
                if(req.body.zip_code) userFields.billing_address.zip_code = req.body.zip_code;
                if(req.body.country) userFields.billing_address.country = req.body.country;

                userFields.service_address = {};
                if(req.body.service_address) userFields.service_address.address = req.body.service_address;
                if(req.body.service_city) userFields.service_address.city = req.body.service_city;
                if(req.body.service_zip_code) userFields.service_address.zip_code = req.body.service_zip_code;
                if(req.body.service_country) userFields.service_address.country = req.body.service_country;

                userFields.picture = req.body.picture;
                if(req.body.job) userFields.job = req.body.job;


                const newUser = new User (userFields);
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }


        })
});

// @Route POST /myAlfred/api/users/login
// Login
router.post('/login',(req, res)=> {
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.username;
    const password = req.body.password;

    // Find user by email
    User.findOne({email})
        .then(user => {
            // Check for user
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json({errors});
            }

            // Check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch && user.active === true) {
                        // User matched

                        const payload = {id: user.id, name: user.name, firstname: user.firstname, is_admin: user.is_admin, is_alfred: user.is_alfred}; // Create JWT payload

                        // Sign token
                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                            res.json({success: true, token: 'Bearer ' + token});
                        });
                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json({errors});
                    }
                });
        });
});


// @Route GET /myAlfred/api/users/logout
// logout
router.get('/logout', function(req, res) {
    res.status(200).send({ success: false, token: null });
});

// @Route GET /myAlfred/api/users/all
// List all users
router.get('/all',(req,res) => {

    User.find({is_admin: false})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'No users found'});
            }
            res.json(user);
        })
        .catch(err => res.status(404).json({ user: 'No users found' }))
});

// @Route GET /myAlfred/api/users/users
// List all simple users
router.get('/users',(req,res) => {
    User.find({is_admin: false, is_alfred: false})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'No users found'});
            }
            res.json(user);
        })
        .catch(err => res.status(404).json({ users: 'No billing found' }))
});

// @Route GET /myAlfred/api/users/users/:id
// Get one user
router.get('/users/:id',(req,res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'No user found'});
            }
            res.json(user);

        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route PUT /myAlfred/api/users/users/:id
// Update one user
router.put('/users/:id',(req,res) => {
    User.findByIdAndUpdate(req.params.id,{name: req.body.name})
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'No user found'});
            }
            res.json(user);

        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route PUT /myAlfred/api/users/alfredViews/:id
// Update number of views for an alfred
router.put('/alfredViews/:id',(req,res) => {
    User.findByIdAndUpdate(req.params.id,{$inc: {number_of_views: 1}},{new:true})
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'No user found'});
            }
            res.json(user);

        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route GET /myAlfred/api/users/home/alfred
// List alfred homepage
router.get('/home/alfred',(req,res) => {
    User.find({is_alfred: true})
        .sort({creation_date: -1})
        .limit(10)
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'No alfred found'});
            }
            res.json(user);
        })
        .catch(err => res.status(404).json({ alfred: 'No alfred found' }))
});

// @Route GET /myAlfred/api/users/alfred
// List all alfred
router.get('/alfred',(req,res) => {
    User.find({is_alfred: true})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'No alfred found'});
            }
            res.json(user);
        })
        .catch(err => res.status(404).json({ alfred: 'No alfred found' }))
});

// @Route GET /myAlfred/api/users/current
// Get the current user
// @Access private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
    User.findById(req.user.id)
        .populate('resetToken')
        .then(user => {

            res.json(user);
        })
        .catch(err => res.status(404).json({ alfred: 'No alfred found' }))
});

// @Route GET /myAlfred/api/users/email
// Test email
router.get('/email/test',(req,res) => {

    async function main() {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'kirstin85@ethereal.email',
                pass: '1D7q6PCENKSX5cj622'
            }
        });

        let info = await transporter.sendMail({
            from: 'kirstin85@ethereal.email', // sender address
            to: "leslie.morales@gmail.com", // list of receivers
            subject: "Email", // Subject line
            text: "Test email", // plain text body
            html: "<b>Test email</b>" // html body
        });

        console.log("Message sent: %s", info.messageId);

    }
    main().catch(console.error);
});

// @Route POST /myAlfred/api/users/forgotPassword
// Send email with link for reset password
router.post('/forgotPassword',(req,res) => {
    const email = req.body.email;

    User.findOne({email: email})
        .then(user => {
            if(user === null) {
                res.json('email not in the database')
            } else {
                const token = crypto.randomBytes(20).toString('hex');
                const newToken = new ResetToken({token:token});
                newToken.save().then(token =>{
                    user.update({resetToken: token._id}).catch(err => console.log(err));
                });

                let transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'kirstin85@ethereal.email',
                        pass: '1D7q6PCENKSX5cj622'
                    }
                });

                let info = transporter.sendMail({
                    from: 'kirstin85@ethereal.email', // sender address
                    to: `${user.email}`, // list of receivers
                    subject: "Reset password", // Subject line
                    text: `http://localhost:3000/resetPassword?token=${token}`, // plain text body
                    html: '<a href='+'http://localhost:3000/resetPassword?token='+token+'>Cliquez içi</a>' // html body
                });
            }
        })
});

// @Route POST /myAlfred/api/users/resetPassword
// Reset the password
router.post('/resetPassword',(req,res) => {
   const password = req.body.password;
   const token = req.body.token;
   const email = req.body.email;
    //console.log(token);
   User.findOne({email: email})
       .populate('resetToken')
       .then(user => {

           if(user.resetToken.token === token) {
               bcrypt.genSalt(10, (err, salt) => {
                   bcrypt.hash(password, salt, (err, hash) => {
                       if (err) throw err;
                       user.updateOne({password: hash})
                           .then(user => res.json({success: 'password update'}))
                           .catch(err => console.log(err));
                   })
               })
           } else {
               res.json({msg: 'Invalid token'})
           }
       })
});


module.exports = router;
