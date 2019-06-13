const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const validateBillingInput = require('../../../validation/billing');
const Billing = require('../../../models/Billing');
const User = require('../../../models/User');
const Calculating = require('../../../models/Calculating');
const FilterPresentation = require('../../../models/FilterPresentation');
const Job = require('../../../models/Job');
const SearchFilter = require('../../../models/SearchFilter');
const Tags = require('../../../models/Tags');
const Category = require('../../../models/Category');
const Equipment = require('../../../models/Equipment');
const Service = require('../../../models/Service');
const Prestation = require('../../../models/Prestation');
const ShopBanner = require('../../../models/ShopBanner');
const validatePrestationInput = require('../../../validation/prestation');
const validateRegisterInput = require('../../../validation/register');



// BILLING

router.get('/billing/test',(req, res) => res.json({msg: 'Billing admin Works!'}) );

// @Route POST /myAlfred/api/admin/billing/all
// Add billing for prestation
// @Access private
router.post('/billing/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Billing.findOne({label: req.body.label})
            .then(billing => {
                if(billing){
                    errors.label = 'This billing already exists';
                    return res.status(400).json({errors});
                } else {
                    const newBilling = new Billing({
                        label: req.body.label
                    });

                    newBilling.save().then(billing => res.json(billing)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/billing/all
// View all billings system
// @Access private
router.get('/billing/all',(req,res)=> {

    Billing.find()
        .then(billings => {
            if(!billings){
                return res.status(400).json({msg: 'No billing found'});
            }
            res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
            res.setHeader('X-Total-Count',billings.length);
            res.json(billings);

        })
        .catch(err => res.status(404).json({ billing: 'No billing found' }));


});

// @Route GET /myAlfred/api/admin/billing/all/:id
// View one billings system
// @Access private
router.get('/billing/all/:id',(req,res)=> {

    Billing.findById(req.params.id)
        .then(billing => {
            if(!billing){
                return res.status(400).json({msg: 'No billing found'});
            }
            res.json(billing);

        })
        .catch(err => res.status(404).json({ billing: 'No billing found' }));


});

// @Route DELETE /myAlfred/api/admin/billing/:id
// Delete one billing system
// @Access private
router.delete('/billing/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Billing.findById(req.params.id)
        .then(billing => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            billing.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ billingnotfound: 'No billing found' }));
});

// @Route PUT /myAlfred/api/admin/billing/all/:id
// Update a billing system
// @Access private
router.put('/billing/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Billing.findByIdAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(billing => {
                res.json(billing);
            })
            .catch(err => res.status(404).json({ billingnotfound: 'No billing found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// USERS

// @Route GET /myAlfred/admin/users/all
// List all users
router.get('/users/all',(req,res) => {

    User.find({is_admin: false})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'No users found'});
            }
            res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
            res.setHeader('X-Total-Count',user.length);
            res.json(user);
        })
        .catch(err => res.status(404).json({ user: 'No users found' }))
});

// @Route GET /myAlfred/admin/users/users
// List all simple users
router.get('/users/users',(req,res) => {
    User.find({is_admin: false, is_alfred: false})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'No users found'});
            }
            res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
            res.setHeader('X-Total-Count',user.length);
            res.json(user);
        })
        .catch(err => res.status(404).json({ users: 'No billing found' }))
});

// @Route GET /myAlfred/admin/users/users/:id
// Get one user
router.get('/users/users/:id',(req,res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'No user found'});
            }
            res.json(user);

        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route PUT /myAlfred/api/admin/users/users/:id
// Update a user
// @Access private
router.put('/users/users/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {is_alfred: req.body.is_alfred ,active: req.body.active}}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/users/users/:id
// Delete one user
// @Access private
router.delete('/users/users/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    User.findById(req.params.id)
        .then(user => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            user.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route GET /myAlfred/api/admin/users/alfred
// List all alfred
router.get('/users/alfred',(req,res) => {
    User.find({is_alfred: true})
        .then(user => {
            if(!user) {
                res.status(400).json({msg: 'No alfred found'});
            }
            res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
            res.setHeader('X-Total-Count',user.length);
            res.json(user);
        })
        .catch(err => res.status(404).json({ alfred: 'No alfred found' }))
});

// @Route GET /myAlfred/admin/users/alfred/:id
// Get one alfred
router.get('/users/alfred/:id',(req,res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'No user found'});
            }
            res.json(user);

        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route PUT /myAlfred/admin/users/alfred/:id
// Update an alfred
// @Access private
router.put('/users/alfred/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {is_alfred: req.body.is_alfred ,active: req.body.active, super_alfred: req.body.super_alfred}}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/users/alfred/:id
// Delete one alfred
// @Access private
router.delete('/users/alfred/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    User.findById(req.params.id)
        .then(user => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            user.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route GET /myAlfred/admin/users/admin
// List all admin
// @Access private and for admin only
router.get('/users/admin',passport.authenticate('jwt',{session: false}),(req, res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin){
        User.find({is_admin: true})
            .then(user => {
                if(!user) {
                    res.status(400).json({msg: 'No admin found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',user.length);
                res.json(user);
            })
            .catch(err => res.status(404).json({ admin: 'No admin found' }))
    } else {
        res.json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/admin/users/admin/:id
// Get one admin
router.get('/users/admin/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    User.findById(req.params.id)
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'No user found'});
            }
            res.json(user);

        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// @Route POST /myAlfred/admin/users/admin
// Add an admin
router.post('/users/admin', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin){
        if(!isValid) {
            return res.status(400).json(errors);
        }

        User.findOne({email: req.body.email})
            .then(user => {
                if(user) {
                    errors.email = 'Email already exist';
                    return res.status(400).json({errors});
                } else {
                    const newUser = new User ({
                        name: req.body.name,
                        firstname: req.body.firstname,
                        email: req.body.email,
                        password: req.body.password,
                        birthday: req.body.birthday,
                        phone: req.body.phone,
                        is_admin: true

                    });
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
    } else {
        res.json({msg: 'Access denied'});
    }

});

// @Route PUT /myAlfred/admin/users/admin/:id
// Update an admin
// @Access private
router.put('/users/admin/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {name: req.body.name,
                firstname: req.body.firstname,
                email: req.body.email,
                phone: req.body.phone, active: req.body.active}}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/users/admin/:id
// Delete one admin
// @Access private
router.delete('/users/admin/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    User.findById(req.params.id)
        .then(user => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            user.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ user: 'No user found' }));
});

// CALCULATING


// @Route POST /myAlfred/calculating/admin/all
// Add calculating for prestation
// @Access private
router.post('/calculating/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Calculating.findOne({label: req.body.label})
            .then(calculating => {
                if(calculating){
                    errors.label = 'This calculating already exists';
                    return res.status(400).json({errors});
                } else {
                    const newCalculating = new Calculating({
                        label: req.body.label
                    });

                    newCalculating.save().then(calculating => res.json(calculating)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/calculating/all
// View all calculating system
// @Access private
router.get('/calculating/all', (req,res)=> {

        Calculating.find()
            .then(calculating => {
                if(!calculating){
                    return res.status(400).json({msg: 'No calculating found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',calculating.length);
                res.json(calculating);

            })
            .catch(err => res.status(404).json({ calculating: 'No billing found' }));


});

// @Route GET /myAlfred/admin/calculating/all/:id
// View one calculating system
// @Access private
router.get('/calculating/all/:id', (req,res)=> {

        Calculating.findById(req.params.id)
            .then(calculating => {
                if(!calculating){
                    return res.status(400).json({msg: 'No calculating found'});
                }
                res.json(calculating);

            })
            .catch(err => res.status(404).json({ billing: 'No calculating found' }));


});

// @Route DELETE /myAlfred/admin/calculating/all/:id
// Delete one calculating system
// @Access private
router.delete('/calculating/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Calculating.findById(req.params.id)
        .then(calculating => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            calculating.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ calculating: 'No calculating found' }));
});

// @Route PUT /myAlfred/admin/calculating/all/:id
// Update a calculating system
// @Access private
router.put('calculating/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Calculating.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(calculating => {
                res.json(calculating);
            })
            .catch(err => res.status(404).json({ calculatingnotfound: 'No calculating found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// FILTER PRESENTATION


// @Route POST /myAlfred/admin/filterPresentation/all
// Add filterPresentation for prestation
// @Access private
router.post('/filterPresentation/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        FilterPresentation.findOne({label: req.body.label})
            .then(filterPresentation => {
                if(filterPresentation){
                    errors.label = 'This filterPresentation already exists';
                    return res.status(400).json({errors});
                } else {
                    const newFilterPresentation = new FilterPresentation({
                        label: req.body.label
                    });

                    newFilterPresentation.save().then(filterPresentation => res.json(filterPresentation)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/filterPresentation/all
// View all filterPresentation
// @Access private
router.get('/filterPresentation/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        FilterPresentation.find()
            .then(filterPresentation => {
                if(!filterPresentation){
                    return res.status(400).json({msg: 'No filterPresentation found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',filterPresentation.length);
                res.json(filterPresentation);

            })
            .catch(err => res.status(404).json({ filterPresentation: 'No billing found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/admin/filterPresentation/all/:id
// View one filterPresentation
// @Access private
router.get('/filterPresentation/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        FilterPresentation.findById(req.params.id)
            .then(filterPresentation => {
                if(!filterPresentation){
                    return res.status(400).json({msg: 'No filterPresentation found'});
                }
                res.json(filterPresentation);

            })
            .catch(err => res.status(404).json({ billing: 'No filterPresentation found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/filterPresentation/all/:id
// Delete one filterPresentation
// @Access private
router.delete('/filterPresentation/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    FilterPresentation.findById(req.params.id)
        .then(filterPresentation => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            filterPresentation.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ filterPresentation: 'No filterPresentation found' }));
});

// @Route PUT /myAlfred/admin/filterPresentation/all/:id
// Update a filterPresentation
// @Access private
router.put('/filterPresentation/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        FilterPresentation.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(filterPresentation => {
                res.json(filterPresentation);
            })
            .catch(err => res.status(404).json({ filterPresentationnotfound: 'No filterPresentation found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// JOB

// @Route POST /myAlfred/admin/job/all
// Add job for prestation
// @Access private
router.post('/job/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Job.findOne({label: req.body.label})
            .then(job => {
                if(job){
                    errors.label = 'This job already exists';
                    return res.status(400).json({errors});
                } else {
                    const newJob = new Job({
                        label: req.body.label
                    });

                    newJob.save().then(job => res.json(job)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/job/all
// View all job
// @Access private
router.get('/job/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Job.find()
            .then(job => {
                if(!job){
                    return res.status(400).json({msg: 'No job found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',job.length);
                res.json(job);

            })
            .catch(err => res.status(404).json({ job: 'No billing found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/admin/job/all/:id
// View one job
// @Access private
router.get('/job/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Job.findById(req.params.id)
            .then(job => {
                if(!job){
                    return res.status(400).json({msg: 'No job found'});
                }
                res.json(job);

            })
            .catch(err => res.status(404).json({ billing: 'No job found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/job/all/:id
// Delete one job
// @Access private
router.delete('/job/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Job.findById(req.params.id)
        .then(job => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            job.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ job: 'No job found' }));
});

// @Route PUT /myAlfred/admin/job/all/:id
// Update a job
// @Access private
router.put('/job/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Job.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(job => {
                res.json(job);
            })
            .catch(err => res.status(404).json({ jobnotfound: 'No job found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// SEARCH FILTER

// @Route POST /myAlfred/admin/searchFilter/all
// Add searchFilter for prestation
// @Access private
router.post('/searchFilter/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        SearchFilter.findOne({label: req.body.label})
            .then(searchFilter => {
                if(searchFilter){
                    errors.label = 'This searchFilter already exists';
                    return res.status(400).json({errors});
                } else {
                    const newSearchFilter = new SearchFilter({
                        label: req.body.label
                    });

                    newSearchFilter.save().then(searchFilter => res.json(searchFilter)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/searchFilter/all
// View all searchFilter
// @Access private
router.get('/searchFilter/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        SearchFilter.find()
            .then(searchFilter => {
                if(!searchFilter){
                    return res.status(400).json({msg: 'No searchFilter found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',searchFilter.length);
                res.json(searchFilter);

            })
            .catch(err => res.status(404).json({ searchFilter: 'No billing found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/admin/searchFilter/all/:id
// View one searchFilter
// @Access private
router.get('/searchFilter/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        SearchFilter.findById(req.params.id)
            .then(searchFilter => {
                if(!searchFilter){
                    return res.status(400).json({msg: 'No searchFilter found'});
                }
                res.json(searchFilter);

            })
            .catch(err => res.status(404).json({ billing: 'No searchFilter found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/searchFilter/all/:id
// Delete one searchFilter
// @Access private
router.delete('/searchFilter/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    SearchFilter.findById(req.params.id)
        .then(searchFilter => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            searchFilter.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ searchFilter: 'No searchFilter found' }));
});

// @Route PUT /myAlfred/admin/searchFilter/all/:id
// Update a searchFilter
// @Access private
router.put('/searchFilter/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        SearchFilter.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(searchFilter => {
                res.json(searchFilter);
            })
            .catch(err => res.status(404).json({ searchFilternotfound: 'No searchFilter found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// TAGS

// @Route POST /myAlfred/admin/tags/all
// Add tags for service
// @Access private
router.post('/tags/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateTagsInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Tags.findOne({label: req.body.label})
            .then(tags => {
                if(tags){
                    errors.label = 'This tags already exists';
                    return res.status(400).json({errors});
                } else {
                    const newTags = new Tags({
                        label: req.body.label
                    });

                    newTags.save().then(tags => res.json(tags)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/tags/all
// View all tags
// @Access private
router.get('/tags/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Tags.find()
            .then(tags => {
                if(!tags){
                    return res.status(400).json({msg: 'No tags found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',tags.length);
                res.json(tags);

            })
            .catch(err => res.status(404).json({ tags: 'No tags found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/admin/tags/all/:id
// View one tag
// @Access private
router.get('/tags/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Tags.findById(req.params.id)
            .then(tags => {
                if(!tags){
                    return res.status(400).json({msg: 'No tags found'});
                }
                res.json(tags);

            })
            .catch(err => res.status(404).json({ tags: 'No tags found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/tags/all/:id
// Delete one tag
// @Access private
router.delete('/tags/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Tags.findById(req.params.id)
        .then(tags => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            tags.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ tagsnotfound: 'No tags found' }));
});

// @Route PUT /myAlfred/admin/tags/all/:id
// Update a tag
// @Access private
router.put('/tags/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Tags.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(tags => {
                res.json(tags);
            })
            .catch(err => res.status(404).json({ tagsnotfound: 'No tags found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// CATEGORY

// @Route POST /myAlfred/admin/category/all
// Add category for prestation
// @Access private
router.post('/category/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Category.findOne({label: req.body.label})
            .then(category => {
                if(category){
                    errors.label = 'This category already exists';
                    return res.status(400).json({errors});
                } else {
                    const newCategory = new Category({
                        label: req.body.label,
                        picture: `https://source.unsplash.com/${req.body.picture}/400x300`
                    });

                    newCategory.save().then(category => res.json(category)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/category/all
// View all categories
// @Access private
router.get('/category/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Category.find()
            .then(category => {
                if(!category){
                    return res.status(400).json({msg: 'No category found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',category.length);
                res.json(category);

            })
            .catch(err => res.status(404).json({ category: 'No billing found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/admin/category/all/:id
// View one category
// @Access private
router.get('/category/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Category.findById(req.params.id)
            .then(category => {
                if(!category){
                    return res.status(400).json({msg: 'No category found'});
                }
                res.json(category);

            })
            .catch(err => res.status(404).json({ billing: 'No category found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/category/all/:id
// Delete one category
// @Access private
router.delete('/category/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Category.findById(req.params.id)
        .then(category => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            category.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ category: 'No category found' }));
});

// @Route PUT /myAlfred/admin/category/all/:id
// Update a category
// @Access private
router.put('/category/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Category.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label,picture: req.body.picture}}, {new: true})
            .then(category => {
                res.json(category);
            })
            .catch(err => res.status(404).json({ categorynotfound: 'No category found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// EQUIPMENTS
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/equipments/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const upload = multer({ storage: storage });
// @Route POST /myAlfred/admin/equipment/all
// Add equipment for service
// @Access private
router.post('/equipment/all',upload.single('logo'),passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {


        Equipment.findOne({label: req.body.label})
            .then(equipment => {
                if(equipment){
                    errors.label = 'This equipment already exists';
                    return res.status(400).json({errors});
                } else {
                    const newEquipment = new Equipment({
                        label: req.body.label,
                        logo: req.file.path,
                        name_logo: req.file.filename
                    });

                    newEquipment.save().then(equipment => res.json(equipment)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/equipment/all
// View all equipments
// @Access private
router.get('/equipment/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Equipment.find()
            .then(equipment => {
                if(!equipment){
                    return res.status(400).json({msg: 'No equipment found'});
                }
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',equipment.length);
                res.json(equipment);

            })
            .catch(err => res.status(404).json({ equipment: 'No equipment found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/admin/equipment/all/:id
// View one equipments
// @Access private
router.get('/equipment/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Equipment.findById(req.params.id)
            .then(equipment => {
                if(!equipment){
                    return res.status(400).json({msg: 'No equipment found'});
                }
                res.json(equipment);

            })
            .catch(err => res.status(404).json({ equipment: 'No equipment found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/admin/equipment/all/:id
// Delete one equipment system
// @Access private
router.delete('/equipment/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Equipment.findById(req.params.id)
        .then(equipment => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            equipment.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ equipmentnotfound: 'No equipment found' }));
});

// @Route PUT /myAlfred/admin/equipment/all/:id
// Update a equipment system
// @Access private
router.put('/equipment/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Equipment.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(equipment => {
                res.json(equipment);



            })
            .catch(err => res.status(404).json({ equipmentnotfound: 'No equipment found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// SERVICE

// @Route POST /myAlfred/admin/service/all
// Add service for prestation
// @Access private
router.post('/service/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Service.findOne({label: req.body.label})
            .then(service => {
                if(service){
                    errors.label = 'This service already exists';
                    return res.status(400).json({errors});
                } else {
                    const newService = new Service({
                        label: req.body.label,
                        category: mongoose.Types.ObjectId(req.body.category),
                        equipments: req.body.equipments,
                        tags: req.body.tags,
                        picture: `https://source.unsplash.com/${req.body.picture}/400x300`,
                        description: req.body.description

                    });

                    newService.save().then(service => res.json(service)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/admin/service/all
// View all service
// @Access private
router.get('/service/all',(req,res)=> {
    if(req.query.category != null) {
        let label = req.query.category;
        Service.find({category: mongoose.Types.ObjectId(label) })
            .populate('tags', ['label'])
            .populate('equipments', 'label')
            .populate('category', 'label')
            .then(service => {
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',service.length);
                res.json(service)
            })
    }else {
        Service.find()
            .populate('tags', ['label'])
            .populate('equipments', 'label')
            .populate('category', 'label')
            .then(service => {
                if (!service) {
                    return res.status(400).json({msg: 'No service found'});
                }
                res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
                res.setHeader('X-Total-Count', service.length);
                res.json(service);

            })
            .catch(err => res.status(404).json({service: 'No service found'}));
    }

});

// @Route GET /myAlfred/admin/service/all/:id
// View one service
// @Access private
router.get('/service/all/:id',(req,res)=> {

    Service.findById(req.params.id)
        .then(service => {
            if(!service){
                return res.status(400).json({msg: 'No service found'});
            }
            res.json(service);

        })
        .catch(err => res.status(404).json({ billing: 'No service found' }));

});

// @Route DELETE /myAlfred/admin/service/all/:id
// Delete one service
// @Access private
router.delete('/service/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Service.findById(req.params.id)
        .then(service => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            service.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ service: 'No service found' }));
});

// @Route PUT /myAlfred/admin/service/all/:id
// Update a service
// @Access private
router.put('/service/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Service.findByIdAndUpdate({_id: req.params.id},
            {
                $set: { label: req.body.label, equipments: req.body.equipments,category: mongoose.Types.ObjectId(req.body.category),
                    tags: req.body.tags,
                    picture: `https://source.unsplash.com/${req.body.picture}/400x300`},

            } , {new: true})
            .then(service => {
                res.json(service);


            })
            .catch(err => res.status(404).json({ servicenotfound: 'No service found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});


// PRESTATION

// @Route POST /myAlfred/admin/prestation/all
// Add a prestation
// @Access private
router.post('/prestation/all',passport.authenticate('jwt',{session: false}),(req,res) => {
    const {errors, isValid} = validatePrestationInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Prestation.findOne({label: req.body.label, filter_presentation: req.body.filter_presentation})
            .then(prestation => {
                if(prestation) {
                    errors.label = 'This prestation already exist';
                } else {
                    const newPrestation = new Prestation({
                        label: req.body.label,
                        price: req.body.price,
                        service: mongoose.Types.ObjectId(req.body.service),
                        billing: mongoose.Types.ObjectId(req.body.billing),
                        filter_presentation: mongoose.Types.ObjectId(req.body.filter_presentation),
                        search_filter: req.body.search_filter,
                        category: mongoose.Types.ObjectId(req.body.category),
                        calculating: mongoose.Types.ObjectId(req.body.calculating),
                        job: mongoose.Types.ObjectId(req.body.job)
                    });
                    newPrestation.save().then(prestation => res.json(prestation)).catch(err => console.log(err))


                }
            })
    }else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/prestation/all
// Get all prestations
// @Access public
router.get('/prestation/all',(req,res) => {
    Prestation.find()
        .populate('category')
        .populate('job')
        .populate('service')
        .populate('billing')
        .populate('search_filter')
        .populate('filter_presentation')
        .populate('calculating')
        .then(prestation => {
            if(!prestation){
                return res.status(400).json({msg: 'No prestation found'});
            }
            res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
            res.setHeader('X-Total-Count',prestation.length);
            res.json(prestation);

        })
        .catch(err => res.status(404).json({ billing: 'No prestation found' }));
});

// @Route GET /myAlfred/api/admin/prestation/all/:id
// View one prestation
// @Access public
router.get('/prestation/all/:id',(req,res)=> {

    Prestation.findById(req.params.id)
        .populate('service')
        .populate('billing')
        .populate('filter_presentation')
        .populate('category')
        .populate('search_filter')
        .populate('calculating')
        .populate('job')
        .then(prestation => {
            if(!prestation){
                return res.status(400).json({msg: 'No prestation found'});
            }
            res.json(prestation);

        })
        .catch(err => res.status(404).json({ prestation: 'No prestation found' }));


});

// @Route DELETE /myAlfred/api/admin/prestation/all/:id
// Delete one prestation
// @Access private
router.delete('/prestation/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Prestation.findById(req.params.id)
        .then(prestation => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            prestation.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ prestationnotfound: 'No prestation found' }));
});

// @Route PUT /myAlfred/api/admin/prestation/all/:id
// Update a prestation
// @Access private
router.put('/prestation/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Prestation.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label,
                price: req.body.price,
                service: mongoose.Types.ObjectId(req.body.service),
                billing: mongoose.Types.ObjectId(req.body.billing),
                filter_presentation: mongoose.Types.ObjectId(req.body.filter_presentation),
                search_filter: req.body.search_filter,
                category: mongoose.Types.ObjectId(req.body.category),
                calculating: mongoose.Types.ObjectId(req.body.calculating),
                job: mongoose.Types.ObjectId(req.body.job)}}, {new: true})
            .then(prestation => {
                res.json(prestation);
            })
            .catch(err => res.status(404).json({ prestationnotfound: 'No prestation found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// SHOP BANNER

// @Route POST /myAlfred/api/admin/shopBanner/all
// Add picture for shop banner
// @Access private
router.post('/shopBanner/all', passport.authenticate('jwt',{session: false}),(req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {

        ShopBanner.findOne({label: req.body.label})
            .then(service => {
                if(service){
                    return res.status(400).json({msg:'This picture already exists'});
                } else {
                    const newBanner = new ShopBanner({
                        label: req.body.label,
                        picture: `https://source.unsplash.com/${req.body.picture}/1920x1080`,


                    });

                    newBanner.save().then(banner => res.json(banner)).catch(err => console.log(err));
                }
            })
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/shopBanner/all
// Get all picture banner
router.get('/shopBanner/all',(req,res) => {
    ShopBanner.find()
        .then(banner => {
            if(!banner){
                return res.status(400).json({msg: 'No banner found'});
            }
            res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
            res.setHeader('X-Total-Count',banner.length);
            res.json(banner);

        })
        .catch(err => res.status(404).json({banner: 'No banner found' }));
});

// @Route GET /myAlfred/api/admin/shopBanner/all/:id
// View one shop banner
router.get('/shopBanner/all/:id',(req,res)=> {

    ShopBanner.findById(req.params.id)
        .then(banner => {
            if(!banner){
                return res.status(400).json({msg: 'No banner found'});
            }
            res.json(banner);

        })
        .catch(err => res.status(404).json({ banner: 'No banner found' }));


});

// @Route DELETE /myAlfred/api/admin/shopBanner/all/:id
// Delete one shop banner
// @Access private
router.delete('/shopBanner/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    ShopBanner.findById(req.params.id)
        .then(banner => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            banner.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ bannernotfound: 'No banner found' }));
});

// @Route PUT /myAlfred/api/admin/shopBanner/all/:id
// Update a shop banner
// @Access private
router.put('/shopBanner/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
       ShopBanner.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label,picture: req.body.picture
                }}, {new: true})
            .then(banner => {
                res.json(banner);
            })
            .catch(err => res.status(404).json({ bannernotfound: 'No banner found' }));
    } else {
        res.status(400).json({msg: 'Access denied'});
    }

});


module.exports = router;
