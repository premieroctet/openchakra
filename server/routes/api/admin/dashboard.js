const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const moment=require('moment')

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
const Options = require('../../../models/Options');
const Prospect = require('../../../models/Prospect');
const keys = require('../../../config/keys');
const validatePrestationInput = require('../../../validation/prestation');
const validateRegisterAdminInput = require('../../../validation/registerAdmin');
const validateCategoryInput = require('../../../validation/category');
const validateServiceInput = require('../../../validation/service');
const {addIdIfRequired} = require('../../../../utils/mangopay')
const multer = require("multer");

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
                    errors.label = 'Cette méthode de facturation existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newBilling = new Billing({
                        label: req.body.label
                    });

                    newBilling.save().then(billing => res.json(billing)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/billing/all
// View all billings system
// @Access private
router.get('/shops/extract',passport.authenticate('jwt',{session:false}),(req,res)=> {
  var result=[]
  User.find()
  .then( users => {
      Shop.find()
        .then ( shops => {
            users.forEach ( user => {
              var shop=shops.filter( s => s.alfred && s.alfred._id.equals(user._id))
              shop=shop.length>0?shop[0]:{_doc:{}}
              var data={}
              Object.keys(user._doc).forEach( k => {
                  data[`user.${k}`]=JSON.stringify(user[k]);
              })
              Object.keys(shop._doc).forEach( k => {
                  data[`shop.${k}`]=JSON.stringify(shop[k]);
              })
              result.push(data)
            })
            res.json(result)
        })
        .catch ()
  })
});

// @Route GET /myAlfred/api/admin/prospect/tocontact
// View all billings system
// @Access public
router.get('/prospect/tocontact/:category/:keywords?',(req,res)=> {
  const keywords=req.params.keywords || ''
  var result=[]
  Prospect.find(
    {$and : [{ category: req.params.category, keywords: keywords}, { $or : [{ contacted : false}, { contacted : null}]}]}
  )
  .sort({category: 1})
  .then( prospects => {
    Prospect.updateMany(
      {$and : [{ category: req.params.category, keywords: keywords}, { $or : [{ contacted : false}, { contacted : null}]}]},
      { contacted : true }
    )
    .then ( dummy => {
      prospects.forEach ( p => {
        data=[]
        data.push(`="${p.phone.replace(/^0/, '+33')}"`)
        data.push(p.category+"/"+p.keywords)
        data.push(p.name)
        data.push(p.city)
        data.push(p.zip_code)
        result.push(data.join(';'))
      })
      const filename=`export_${req.params.category}_${keywords}_${moment().format('DDMMYYHHmm')}.csv`
      res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      res.set('Content-Disposition', `attachment; filename="${filename}"`)
      res.send(result.join('\n'))
    })
  })
  .catch ()
});

// @Route GET /myAlfred/api/admin/billing/all
// View all billings system
// @Access private
router.get('/billing/all',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Billing.find()
            .sort({label: 1})
            .then(billings => {
                if (!billings) {
                    return res.status(400).json({msg: 'No billing found'});
                }

                res.json(billings);

            })
            .catch(err => res.status(404).json({billing: 'No billing found'}));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/billing/all/:id
// View one billings system
// @Access private
router.get('/billing/all/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Billing.findById(req.params.id)
            .then(billing => {
                if (!billing) {
                    return res.status(400).json({msg: 'No billing found'});
                }
                res.json(billing);

            })
            .catch(err => res.status(404).json({billing: 'No billing found'}));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


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
        res.status(403).json({msg: 'Access denied'});
    }

});

// USERS

// @Route GET /myAlfred/api/admin/users/all
// List all users
router.get('/users/all',passport.authenticate('jwt',{session:false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.find({}, 'firstname name email is_alfred is_admin id_mangopay mangopay_provider_id creation_date id_card')
            .sort({creation_date: -1})
            .then(user => {
                if (!user) {
                    res.status(400).json({msg: 'No users found'});
                }

                res.json(user);
            })
            .catch(err => res.status(404).json({user: 'No users found'}))
    } else {
        res.status(400).json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/api/admin/users/all_light
// List all users (firstname, name, email)
router.get('/users/all_light',passport.authenticate('jwt',{session:false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.find({ active: true}, 'firstname name email')
          .sort({name: 1})
          .then(user => {
              if (!user) {
                  res.status(400).json({msg: 'No users found'});
              }
              res.json(user);
          })
          .catch(err => res.status(404).json({user: 'No users found'}))
    } else {
        res.status(400).json({msg: 'Access denied'});
    }
});

// @Route POST /myAlfred/api/admin/loginAs
// Login as user (for admins only)
router.post('/loginAs', passport.authenticate('jwt',{session:false}), (req, res)=> {

    const user=req.user
    if (!user.is_admin) {
      res.status(403).json({msg: 'Access denied'});
      return
    }
    const email = req.body.username;

    // Find user by email
    User.findOne({email})
      .then(user => {
        // Check for user
        if(!user) {
          errors = `Pas d'utilisateur connu avec l'email ${email}`;
          return res.status(400).json(errors);
        }

        if(user.active === true) {
          // User matched
          const payload = {id: user.id, name: user.name, firstname: user.firstname, is_admin: user.is_admin, is_alfred: user.is_alfred}; // Create JWT payload
          // Sign token
          jwt.sign(payload, keys.secretOrKey, (err, token) => {
            jwt.sign(payload, keys.JWT.secretOrKey, (err, token) => {
              res.cookie('token', 'Bearer ' + token,{
                httpOnly: false,
                secure: true,
                sameSite: true
              }).status(201).json()
            });
          });
        } else {
          errors = 'Utilisateur inactif';
          return res.status(400).json(errors);
        }
      });
});


// @Route GET /myAlfred/api/admin/users/users
// List all simple users
router.get('/users/users',passport.authenticate('jwt',{session:false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        User.find({is_admin: false, is_alfred: false})
            .then(user => {
                if(!user) {
                    res.status(400).json({msg: 'No users found'});
                }
                res.json(user);
            })
            .catch(err => res.status(404).json({ users: 'No billing found' }))
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/users/users/:id
// Get one user
router.get('/users/users/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).json({msg: 'No user found'});
                }
                res.json(user);

            })
            .catch(err => res.status(404).json({user: 'No user found'}));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route PUT /myAlfred/api/admin/users/users/:id
// Update a user
// @Access private
router.put('/users/users/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {active: req.body.active}}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route PUT /myAlfred/api/admin/users/users/idCard/:id
// Validate id card for a user
// @Access private
router.put('/users/users/idCard/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {id_confirmed: true }}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route PUT /myAlfred/api/admin/users/users/idCard/delete:id
// Delete id card for a user
// @Access private
router.put('/users/users/idCard/delete/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {id_confirmed: false }}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
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
                if (!admin) {
                    return res.status(401).json({notauthorized: 'User not authorized'});


                }
                user.remove().then(() => res.json({success: true}));
            })
            .catch(err => res.status(404).json({user: 'No user found'}));

});

// @Route GET /myAlfred/api/admmin/shop/all
// View all shop
router.get('/shop/all', (req, res) => {
    Shop.find({}, '_id creation_date')
      .sort({creation_date:-1})
      .populate('alfred','_id firstname name email id_mangopay mangopay_provider_id kyc_status kyc_error id_card')
      .then(shop => {
          if (typeof shop !== 'undefined' && shop.length > 0) {
              res.json(shop);
          }
          else {
              return res.status(400).json({
                  msg: 'No shop found'
              });
          }
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({shop: 'No shop found'})});
});


// @Route GET /myAlfred/api/admin/users/alfred
// List all alfred
router.get('/users/alfred',passport.authenticate('jwt',{session:false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.find({is_alfred: true})
            .sort({name: 1})
            .then(user => {
                if (!user) {
                    res.status(400).json({msg: 'No alfred found'});
                }

                res.json(user);
            })
            .catch(err => res.status(404).json({alfred: 'No alfred found'}))
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/api/admin/users/alfred/:id
// Get one alfred
router.get('/users/alfred/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).json({msg: 'No user found'});
                }
                res.json(user);

            })
            .catch(err => res.status(404).json({user: 'No user found'}));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route PUT /myAlfred/api/admin/users/alfred/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route PUT /myAlfred/api/admin/users/alfred/idCard/:id
// Validate id card for an alfred
// @Access private
router.put('/users/alfred/idCard/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {id_confirmed: true }}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route PUT /myAlfred/api/admin/users/alfred/idCard/delete:id
// Delete id card for an alfred
// @Access private
router.put('/users/alfred/idCard/delete/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        User.findOneAndUpdate({_id: req.params.id},{$set: {id_confirmed: false }}, {new: true})
            .then(user => {
                res.json(user);
            })
            .catch(err => res.status(404).json({ usernotfound: 'No user found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/users/alfred/:id
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

// @Route GET /myAlfred/api/admin/users/admin
// List all admin
// @Access private and for admin only
router.get('/users/admin',passport.authenticate('jwt',{session: false}),(req, res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin){
        User.find({is_admin: true})
            .sort({ name: 1})
            .then(user => {
                if(!user) {
                    res.status(400).json({msg: 'No admin found'});
                }

                res.json(user);
            })
            .catch(err => res.status(404).json({ admin: 'No admin found' }))
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/api/admin/users/admin/:id
// Get one admin
// @Access private and for admin only
router.get('/users/admin/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        User.findById(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(400).json({msg: 'No user found'});
                }
                res.json(user);

            })
            .catch(err => res.status(404).json({user: 'No user found'}));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route POST /myAlfred/api/admin/users/admin
// Add an admin
// @Access private and for admin only
router.post('/users/admin', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateRegisterAdminInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin){
        if(!isValid) {
            return res.status(400).json(errors);
        }

        User.findOne({email: req.body.email,is_admin: true})
            .then(user => {
                if(user) {
                    errors.email = 'Email déjà existant';
                    return res.status(400).json(errors);
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
                                .catch(err => console.error(err));
                        })
                    })
                }


            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});


// @Route PUT /myAlfred/api/admin/users/admin/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/users/admin/:id
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
                    errors.label = 'Cette méthode de calcul existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newCalculating = new Calculating({
                        label: req.body.label
                    });

                    newCalculating.save().then(calculating => res.json(calculating)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/calculating/all
// View all calculating system
// @Access private
router.get('/calculating/all',passport.authenticate('jwt',{session:false}), (req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Calculating.find()
            .then(calculating => {
                if (!calculating) {
                    return res.status(400).json({msg: 'No calculating found'});
                }

                res.json(calculating);

            })
            .catch(err => res.status(404).json({calculating: 'No billing found'}));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/calculating/all/:id
// View one calculating system
// @Access private
router.get('/calculating/all/:id',passport.authenticate('jwt',{session:false}), (req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Calculating.findById(req.params.id)
            .then(calculating => {
                if(!calculating){
                    return res.status(400).json({msg: 'No calculating found'});
                }
                res.json(calculating);

            })
            .catch(err => res.status(404).json({ billing: 'No calculating found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route DELETE /myAlfred/api/admin/calculating/all/:id
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

// @Route PUT /myAlfred/api/admin/calculating/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// FILTER PRESENTATION


// @Route POST /myAlfred/api/admin/filterPresentation/all
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
                    errors.label = 'Ce filtre existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newFilterPresentation = new FilterPresentation({
                        label: req.body.label
                    });

                    newFilterPresentation.save().then(filterPresentation => res.json(filterPresentation)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/filterPresentation/all
// View all filterPresentation
// @Access private
router.get('/filterPresentation/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        FilterPresentation.find()
            .sort({label: 1})
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/filterPresentation/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/filterPresentation/all/:id
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

// @Route PUT /myAlfred/api/admin/filterPresentation/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// JOB

// @Route POST /myAlfred/api/admin/job/all
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
                    errors.label = 'Ce métier existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newJob = new Job({
                        label: req.body.label
                    });

                    newJob.save().then(job => res.json(job)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/job/all
// View all job
// @Access private
router.get('/job/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Job.find()
            .sort({label: 1})
            .then(job => {
                if(!job){
                    return res.status(400).json({msg: 'No job found'});
                }
                res.json(job);

            })
            .catch(err => res.status(404).json({ job: 'No billing found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/job/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/job/all/:id
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

// @Route PUT /myAlfred/api/admin/job/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// SEARCH FILTER

// @Route POST /myAlfred/api/admin/searchFilter/all
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
                    errors.label = 'Ce filtre existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newSearchFilter = new SearchFilter({
                        label: req.body.label
                    });

                    newSearchFilter.save().then(searchFilter => res.json(searchFilter)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/searchFilter/all
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/searchFilter/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/searchFilter/all/:id
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

// @Route PUT /myAlfred/api/admin/searchFilter/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// TAGS

// @Route POST /myAlfred/api/admin/tags/all
// Add tags for service
// @Access private
router.post('/tags/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
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
                    errors.label = 'Ce tags existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newTags = new Tags({
                        label: req.body.label,
                        title: req.body.title,
                        description: req.body.description
                    });

                    newTags.save().then(tags => res.json(tags)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/tags/all
// View all tags
// @Access private
router.get('/tags/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Tags.find()
            .sort({label: 1})
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/tags/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/tags/all/:id
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

// @Route PUT /myAlfred/api/admin/tags/all/:id
// Update a tag
// @Access private
router.put('/tags/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Tags.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label, title: req.body.title, description: req.body.description}}, {new: true})
            .then(tags => {
                res.json(tags);
            })
            .catch(err => res.status(404).json({ tagsnotfound: 'No tags found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// CATEGORY

const storageCat = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/category/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const uploadCat = multer({ storage: storageCat });

// @Route POST /myAlfred/api/admin/category/all
// Add category for prestation
// @Access private
router.post('/category/all', uploadCat.single('picture'),passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateCategoryInput(req.body);
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
                    errors.label = 'Cette catégorie existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newCategory = new Category({
                        label: req.body.label,
                        picture: req.file.path,
                        description: req.body.description,
                        tags: JSON.parse(req.body.tags),
                    });

                    newCategory.save().then(category => res.json(category)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route POST /myAlfred/api/admin/category/editPicture/:id
// Edit the picture of a category
// @Access private
router.post('/category/editPicture/:id', uploadCat.single('picture'),passport.authenticate('jwt',{session: false}),(req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {


        Category.findByIdAndUpdate(req.params.id,{picture: req.file.path},{new: true})
            .then(category => {
                res.json(category);
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/category/all
// View all categories
// @Access private
router.get('/category/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Category.find()
	    .sort({'label': 1})
            .populate('tags')
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/category/all/:id
// View one category
// @Access private
router.get('/category/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Category.findById(req.params.id)
            .populate('tags')
            .then(category => {
                if(!category){
                    return res.status(400).json({msg: 'No category found'});
                }
                res.json(category);

            })
            .catch(err => res.status(404).json({ billing: 'No category found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/category/all/:id
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

// @Route PUT /myAlfred/api/admin/category/all/:id
// Update a category
// @Access private
router.put('/category/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Category.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label,tags: req.body.tags,
            description: req.body.description}}, {new: true})
            .then(category => {
                res.json(category);
            })
            .catch(err => res.status(404).json({ categorynotfound: 'No category found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// EQUIPMENTS


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/equipments/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const upload = multer({ storage: storage });
// @Route POST /myAlfred/api/admin/equipment/all
// Add equipment for service
// @Access private
router.post('/equipment/all',upload.fields([{name: 'logo',maxCount: 1}, {name:'logo2',maxCount:1}]),passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid) {
            return res.status(400).json(errors);
        }

        Equipment.findOne({label: req.body.label})
            .then(equipment => {
                if(equipment){
                    errors.label = 'Cet équipement existe déjà ';
                    return res.status(400).json(errors);
                } else {
                    const newEquipment = new Equipment({
                        label: req.body.label,
                        logo: req.files['logo'][0].path,
                        name_logo: req.files['logo'][0].filename,
                        logo2: req.files['logo2'][0].path,
                        name_logo2: req.files['logo2'][0].filename
                    });

                    newEquipment.save().then(equipment => res.json(equipment)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route POST /myAlfred/api/admin/equipment/editPicture/:id
// Edit the logo for equipment
// @Access private
router.post('/equipment/editPicture/:id',upload.fields([{name: 'logo',maxCount: 1}, {name:'logo2',maxCount:1}]),passport.authenticate('jwt',{session: false}),(req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {

        Equipment.findByIdAndUpdate(req.params.id, {logo: req.files['logo'][0].path,logo2: req.files['logo2'][0].path},{new: true})
            .then(equipment => {
                res.json(equipment);
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/equipment/all
// View all equipments
// @Access private
router.get('/equipment/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Equipment.find()
            .sort({ label: 1})
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/equipment/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/equipment/all/:id
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

// @Route PUT /myAlfred/api/admin/equipment/all/:id
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
        res.status(403).json({msg: 'Access denied'});
    }

});

// SERVICE

const storageService = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/service/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const uploadService = multer({ storage: storageService });

// @Route POST /myAlfred/api/admin/service/all
// Add service for prestation
// @Access private
router.post('/service/all', uploadService.single('picture'),passport.authenticate('jwt',{session: false}),(req, res) => {
    console.log("Req.body is "+JSON.stringify(req.body));
    const {errors, isValid} = validateServiceInput(req.body);
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
                    errors.label = 'Ce service existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newService = new Service({
                        label: req.body.label,
                        category: mongoose.Types.ObjectId(req.body.category),
                        equipments: JSON.parse(req.body.equipments),
                        tags: JSON.parse(req.body.tags),
                        picture: req.body.picture.path,
                        description: req.body.description,
                        majoration: req.body.majoration,
                        location : {
                          alfred: req.body['location.alfred']=="true",
                          client: req.body['location.client']=="true",
                          visio:  req.body['location.visio']=="true"
                        },
                        pick_tax: req.body.pick_tax,
                        travel_tax: req.body.travel_tax
                    });

                    newService.save().then(service => res.json(service)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route POST /myAlfred/api/admin/service/editPicture/:id
// Edit picture
// @Access private
router.post('/service/editPicture/:id',uploadService.single('picture'),passport.authenticate('jwt',{session: false}),(req,res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {

        Service.findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
            .then(service => {
                res.json(service);
            })
    }else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/service/all
// View all service
// @Access private
router.get('/service/all',passport.authenticate('jwt',{session:false}),(req,res)=> {
    if(req.query.category != null) {
        let label = req.query.category;
        Service.find({category: mongoose.Types.ObjectId(label) })
	    .sort({'label': 1})
            .populate('tags', ['label'])
            .populate('equipments', 'label')
            .populate('category', 'label')
            .then(service => {
                res.setHeader('Access-Control-Expose-Headers','X-Total-Count');
                res.setHeader('X-Total-Count',service.length);
                res.json(service)
            })
    }else {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.decode(token);
        const admin = decode.is_admin;

        if(admin) {
        Service.find()
	    .sort({'label': 1})
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
        } else {
            res.status(403).json({msg: 'Access denied'});
        }
    }

});

// @Route GET /myAlfred/api/admin/service/all/:id
// View one service
// @Access private
router.get('/service/all/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
    Service.findById(req.params.id)
        .populate('tags')
        .populate('equipments')
        .populate('category')
        .then(service => {
            if(!service){
                return res.status(400).json({msg: 'No service found'});
            }
            res.json(service);

        })
        .catch(err => res.status(404).json({ billing: 'No service found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/service/all/:id
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

// @Route PUT /myAlfred/api/admin/service/all/:id
// Update a service
// @Access private
router.put('/service/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    console.log("Received:"+JSON.stringify(req.body));
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Service.findByIdAndUpdate({_id: req.params.id},
            {
                $set: { label: req.body.label, equipments: req.body.equipments,category: mongoose.Types.ObjectId(req.body.category),
                    tags: req.body.tags,
                     description: req.body.description, majoration: req.body.majoration, location:req.body.location,
                     travel_tax: req.body.travel_tax, pick_tax: req.body.pick_tax
                     },

            } , {new: true})
            .then(service => {
                res.json(service);


            })
            .catch(err => res.status(404).json({ servicenotfound: 'No service found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});


// PRESTATION

const storagePrestation = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/prestation/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const uploadPrestation = multer({ storage: storagePrestation });

// @Route POST /myAlfred/api/admin/prestation/all
// Add a prestation
// @Access private
router.post('/prestation/all',uploadPrestation.single('picture'),passport.authenticate('jwt',{session: false}),(req,res) => {
    const {errors, isValid} = validatePrestationInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }

        Prestation.findOne({label: req.body.label, filter_presentation: req.body.filter_presentation, service: req.body.service})
            .then(prestation => {
                if(prestation) {
                    errors.label = 'Cette prestation existe déjà';
                    return res.status(400).json(errors);
                } else {
                    console.log(`Body:${JSON.stringify(req.body)}`)
                    const newPrestation = new Prestation({
                        label: req.body.label,
                        price: req.body.price,
                        service: mongoose.Types.ObjectId(req.body.service),
                        billing: JSON.parse(req.body.billing),
                        filter_presentation: mongoose.Types.ObjectId(req.body.filter_presentation),
                        search_filter: null,
                        category: null,
                        calculating: null,
                        job: mongoose.Types.ObjectId(req.body.job),
                        description: req.body.description,
                        //picture: req.body.picture.path,
                        picture: req.file.path,
                        tags: JSON.parse(req.body.tags),
                        cesu_eligible: req.body.cesu_eligible,
                    });
                    newPrestation.save()
                     .then(prestation => res.json(prestation))
                     .catch(err => res.status(400).json(err))


                }
            })
    }else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route POST /myAlfred/api/admin/prestation/editPicture/:id
// Edit picture
// @Access private
router.post('/prestation/editPicture/:id',uploadPrestation.single('picture'),passport.authenticate('jwt',{session: false}),(req,res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {

        Prestation.findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
            .then(prestation => {
                res.json(prestation);
            })
    }else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/prestation/all
// Get all prestations
// @Access public
router.get('/prestation/all',passport.authenticate('jwt',{session:false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Prestation.find({}, 'label private_alfred cesu_eligible')
            .sort({s_label:1, category:1})
            .populate({path : 'service', select : 'label', populate : {path : 'category', select : 'label'}})
            .populate('filter_presentation', 'label')
            .then(prestation => {
                if (!prestation) {
                    return res.status(400).json({msg: 'No prestation found'});
                }

                res.json(prestation);

            })
            .catch(err => res.status(404).json({billing: 'No prestation found'}));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/api/admin/prestation/all/:id
// View one prestation
// @Access public
router.get('/prestation/all/:id',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
    Prestation.findById(req.params.id)
        .populate('service')
        .populate('billing')
        .populate('filter_presentation')
        .populate('category')
        .populate('search_filter')
        .populate('calculating')
        .populate('job')
        .populate('tags')
        .then(prestation => {
            if(!prestation){
                return res.status(400).json({msg: 'No prestation found'});
            }
            res.json(prestation);

        })
        .catch(err => res.status(404).json({ prestation: 'No prestation found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


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
                billing: req.body.billing,
                filter_presentation: mongoose.Types.ObjectId(req.body.filter_presentation),
                search_filter: req.body.search_filter,
                category: null,
                calculating: mongoose.Types.ObjectId(req.body.calculating),
                job: req.body.job ? mongoose.Types.ObjectId(req.body.job) : null,
                description: req.body.description,
                tags: req.body.tags,
                cesu_eligible: req.body.cesu_eligible,
              }},
              {new: true})
            .then(prestation => {
                res.json(prestation);
            })
            .catch(err => {
              console.error(err)
              res.status(404).json({ error: err })
            });
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// SHOP BANNER

const storageBanner = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/shopBanner/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname  )
    }
});
const uploadBanner = multer({ storage: storageBanner });

// @Route POST /myAlfred/api/admin/shopBanner/all
// Add picture for shop banner
// @Access private
router.post('/shopBanner/all', uploadBanner.single('picture'),passport.authenticate('jwt',{session: false}),(req, res) => {
    const {errors, isValid} = validateBillingInput(req.body);
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        if(!isValid){
            return res.status(400).json(errors);
        }
        ShopBanner.findOne({label: req.body.label})
            .then(service => {
                if(service){
                    errors.label = 'Cette bannière existe déjà';
                    return res.status(400).json(errors);
                } else {
                    const newBanner = new ShopBanner({
                        label: req.body.label,
                        picture: req.file.path,


                    });

                    newBanner.save().then(banner => res.json(banner)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route POST /myAlfred/api/admin/shopBanner/editPicture/:id
// Edit picture
// @Access private
router.post('/shopBanner/editPicture/:id',uploadBanner.single('picture'),passport.authenticate('jwt',{session: false}),(req,res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {

        ShopBanner.findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
            .then(banner => {
                res.json(banner);
            })
    }else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/shopBanner/all
// Get all picture banner
router.get('/shopBanner/all',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
    ShopBanner.find()
        .sort({label: 1})
        .then(banner => {
            if(!banner){
                return res.status(400).json({msg: 'No banner found'});
            }
            res.json(banner);

        })
        .catch(err => res.status(404).json({banner: 'No banner found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/api/admin/shopBanner/all/:id
// View one shop banner
router.get('/shopBanner/all/:id',passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
    ShopBanner.findById(req.params.id)
        .then(banner => {
            if(!banner){
                return res.status(400).json({msg: 'No banner found'});
            }
            res.json(banner);

        })
        .catch(err => res.status(404).json({ banner: 'No banner found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


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
       ShopBanner.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label}}, {new: true})
            .then(banner => {
                res.json(banner);
            })
            .catch(err => res.status(404).json({ bannernotfound: 'No banner found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// OPTIONS

// @Route POST /myAlfred/api/admin/options/all
// Add options
// @Access private
router.post('/options/all', passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {

        Options.findOne({label: req.body.label})
            .then(options => {
                if(options){
                    return res.status(400).json({msg: 'Cette option existe déjà'});
                } else {
                    const newOptions = new Options({
                        label: req.body.label,
                        description: req.body.description,
                        billing: req.body.billing
                    });

                    newOptions.save().then(options => res.json(options)).catch(err => console.error(err));
                }
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }


});

// @Route GET /myAlfred/api/admin/options/all
// View all options
// @Access private
router.get('/options/all', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Options.find()
            .then(options => {
                if(!options){
                    return res.status(400).json({msg: 'No options found'});
                }
                res.json(options);

            })
            .catch(err => res.status(404).json({ options: 'No options found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/options/all/:id
// View one option
// @Access private
router.get('/options/all/:id', passport.authenticate('jwt',{session: false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    if(admin) {
        Options.findById(req.params.id)
            .then(options => {
                if(!options){
                    return res.status(400).json({msg: 'No options found'});
                }
                res.json(options);

            })
            .catch(err => res.status(404).json({ options: 'No options found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route DELETE /myAlfred/api/admin/options/all/:id
// Delete one option
// @Access private
router.delete('/options/all/:id',passport.authenticate('jwt',{session: false}),(req,res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;
    Options.findById(req.params.id)
        .then(options => {
            if(!admin) {
                return res.status(401).json({ notauthorized: 'User not authorized' });


            }
            options.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ optionsnotfound: 'No options found' }));
});

// @Route PUT /myAlfred/api/admin/options/all/:id
// Update an option
// @Access private
router.put('/options/all/:id',passport.authenticate('jwt',{session: false}),(req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
        Options.findOneAndUpdate({_id: req.params.id},{$set: {label: req.body.label, description: req.body.description, billing: req.body.billing}}, {new: true})
            .then(options => {
                res.json(options);
            })
            .catch(err => res.status(404).json({ optionsnotfound: 'No options found' }));
    } else {
        res.status(403).json({msg: 'Access denied'});
    }

});

// @Route GET /myAlfred/api/admin/statistics
// Get satistics (users, shops, services)
// @Access private
//router.get('/statistics',passport.authenticate('jwt',{session:false}),(req,res)=> {
router.get('/statistics', (req,res)=> {
    //
    //const token = req.headers.authorization.split(' ')[1];
    //const decode = jwt.decode(token);
    //const admin = decode.is_admin;
    //
    const admin=true;

    if(admin) {
        var stats = {}
        User.count()
            .catch(err => res.status(404).json({statistics: 'Error on users'}))
            .then(nb_users => {
              stats['users']=nb_users;
              User.find({is_alfred:true}).count()
                .catch(err => res.status(404).json({statistics: 'Error on alfred'}))
                .then(nb_alfred => {
                   stats['alfred'] = nb_alfred;
                   ServiceUser.find()
                     .catch(err => res.status(404).json({statistics: 'Error on alfred'}))
                     .then(services => {
                       stats['services'] = services.length;
                       stats['prestations'] = services.map( s => s.prestations.length).reduce( (acc, value) => acc+value);
                       res.json(stats);
                   })
                })
            })
    } else {
        res.status(403).json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/api/admin/booking/all
// Get all bookings
// @Access private
router.get('/booking/all',passport.authenticate('jwt',{session:false}),(req,res)=> {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token);
    const admin = decode.is_admin;

    if(admin) {
      Booking.find()
        .populate('alfred', 'firstname name')
        .populate('user', 'firstname name')
        .sort({date : -1})
          .catch(err => {
            console.error(err)
            res.status(404).json({bookings: 'Error'})
          })
          .then(bookings => {
            res.json(bookings);
          })
    } else {
      res.status(403).json({msg: 'Access denied'});
    }
});

// @Route GET /myAlfred/api/admin/prospect/all
// Get all prospect
// @Access private
router.get('/prospect/all',passport.authenticate('jwt',{session:false}),(req,res)=> {
  const token = req.headers.authorization.split(' ')[1];
  const decode = jwt.decode(token);
  const admin = decode.is_admin;

  if(admin) {
    // TODO: Use aggregate
    Prospect.find()
      .sort({category: 1, keywords:1})
      .catch(err => {
        console.error(err)
        res.status(404).json({prospects: 'Error'})
      })
      .then(prospects => {
        counts={}
        contacted={}
        prospects.forEach( p => {
          const key=`${p.category}/${p.keywords}`
          counts[key] = counts.hasOwnProperty(key) ? counts[key]+1 : 1
          const contact = p.contacted ? 1 : 0
          contacted[key] = contacted.hasOwnProperty(key) ? contacted[key]+ contact : contact
        });
        var result=[]
        Object.keys(counts).forEach(key => {
          result.push({category: key, count : counts[key], contacted: contacted[key], not_contacted: counts[key]-contacted[key]})
        });

        res.json(result);
      })
  } else {
    res.status(403).json({prospects: 'Access denied'});
  }
});

// @Route POST /myAlfred/api/admin/kyc_validate/:alfred_id
// Get all prospect
// @Access private
router.post('/kyc_validate/:alfred_id',passport.authenticate('jwt',{session:false}),(req,res)=> {
  const token = req.headers.authorization.split(' ')[1];
  const decode = jwt.decode(token);
  const admin = decode.is_admin;

  if(admin) {
    User.findOne({ _id : mongoose.Types.ObjectId(req.params.alfred_id)})
      .then(user => {
        addIdIfRequired(user)
        res.json(result);
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({prospects: 'Error'})
      })

  } else {
    res.status(403).json({prospects: 'Access denied'});
  }
});

passport.authenticate('jwt',{session: false}),
module.exports = router;
