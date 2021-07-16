const express = require('express')
const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const moment = require('moment')
const crypto = require('crypto')

const validateBillingInput = require('../../../validation/billing')
const {validateCompanyProfile} = require('../../../validation/simpleRegister')
const validatePrestationInput = require('../../../validation/prestation')
const validateRegisterAdminInput = require('../../../validation/registerAdmin')
const validateCategoryInput = require('../../../validation/category')
const validateServiceInput = require('../../../validation/service')
const {addIdIfRequired} = require('../../../utils/mangopay')
const multer = require('multer')
const path = require('path')
const {normalizePhone, bufferToString, normalize, isMobilePhone} = require('../../../../utils/text')
const {counterArray} = require('../../../../utils/converters')
const {ADMIN} = require('../../../../utils/consts')
const csv_parse = require('csv-parse/lib/sync')
const axios = require('axios')
const _ = require('lodash')
const {computeUrl}=require('../../../../config/config')
const {delayedPromise}=require('../../../../utils/promise')
const {get_token, send_cookie}=require('../../../utils/serverContext')
const {ensureDirectoryExists, isTxtFile} = require('../../../utils/filesystem')

// For Node < 12.0
if (!Promise.allSettled) {
  Promise.allSettled = promises =>
    Promise.all(
      promises.map(promise => {
        return promise
          .then(value => ({
            status: 'fulfilled',
            value,
          }))
          .catch(reason => ({
            status: 'rejected',
            reason,
          }))
      },
      ),
    )
}

// @Route POST /myAlfred/api/admin/billing/all
// Add billing for prestation
// @Access private
router.post('/billing/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Billing').findOne({label: req.body.label})
      .then(billing => {
        if (billing) {
          errors.label = 'Cette méthode de facturation existe déjà'
          return res.status(400).json(errors)
        }

        const newBilling={
          label: req.body.label,
        }

        req.context.getModel('Billing').create(newBilling)
          .then(billing => res.json(billing))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/billing/all
// View all billings system
// @Access private
router.get('/shops/extract', passport.authenticate('admin', {session: false}), (req, res) => {
  let result = []
  req.context.getModel('User').find()
    .then(users => {
      req.context.getModel('Shop').find()
        .then(shops => {
          users.forEach(user => {
            let shop = shops.filter(s => s.alfred && s.alfred._id.equals(user._id))
            shop = shop.length > 0 ? shop[0] : {_doc: {}}
            let data = {}
            Object.keys(user._doc).forEach(k => {
              data[`user.${k}`] = JSON.stringify(user[k])
            })
            Object.keys(shop._doc).forEach(k => {
              data[`shop.${k}`] = JSON.stringify(shop[k])
            })
            result.push(data)
          })
          res.json(result)
        })
        .catch()
    })
})

// @Route GET /myAlfred/api/admin/billing/all
// View all billings system
// @Access private
router.get('/billing/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Billing').find()
      .sort({label: 1})
      .then(billings => {
        res.json(billings)
      })
      .catch(() => res.status(404).json({billing: 'No billing found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/billing/all/:id
// View one billings system
// @Access private
router.get('/billing/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Billing').findById(req.params.id)
      .then(billing => {
        if (!billing) {
          return res.status(400).json({msg: 'No billing found'})
        }
        res.json(billing)

      })
      .catch(() => res.status(404).json({billing: 'No billing found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route DELETE /myAlfred/api/admin/billing/:id
// Delete one billing system
// @Access private
router.delete('/billing/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Billing').findById(req.params.id)
    .then(billing => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      billing.remove().then(() => res.json({success: true}))
    })
    .catch(() => res.status(404).json({billingnotfound: 'No billing found'}))
})

// @Route PUT /myAlfred/api/admin/billing/all/:id
// Update a billing system
// @Access private
router.put('/billing/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Billing').findByIdAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
      .then(billing => {
        res.json(billing)
      })
      .catch(() => res.status(404).json({billingnotfound: 'No billing found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// USERS

// @Route GET /myAlfred/api/admin/users/all
// List all users
router.get('/users/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').find({}, 'firstname name email is_alfred is_admin id_mangopay mangopay_provider_id creation_date birthday billing_address phone')
      .populate({path: 'shop', select: 'creation_date'})
      .sort({creation_date: -1})
      .then(users => {
        res.json(users)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({user: 'No users found'})
      })
  }
  else {
    res.status(400).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/serviceusers/all
// List all serviuceusers
router.get('/serviceusers/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('ServiceUser').find({}, '_id perimeter location service_address.zip_code service_address.city')
      .populate({path: 'service', select: 'label category', populate: {path: 'category', select: 'label'}})
      // .populate('service.category', 'label')
      .populate({path: 'user', select: 'email shop', populate: {path: 'shop', select: 'is_professional'}})
      .then(services => {
        res.json(services)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({user: 'No services found'})
      })
  }
  else {
    res.status(400).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/users/all_light
// List all users (firstname, name, email)
router.get('/users/all_light', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').find({active: true}, 'firstname name email roles')
      .sort({name: 1})
      .then(user => {
        if (!user) {
          res.status(400).json({msg: 'No users found'})
        }
        res.json(user)
      })
      .catch(() => res.status(404).json({user: 'No users found'}))
  }
  else {
    res.status(400).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/serviceUsersMap
// View all service per user for map view (light)
// @Access private
router.get('/serviceUsersMap', (req, res) => {

  req.context.getModel('ServiceUser').find({}, '_id service_address.gps')
    // .populate('user','-id_card')
    .populate('service', '_id label')
    .populate('user', 'firstname')
    .then(services => {
      res.json(services)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({service: 'No service found'})
    })
})


// @Route POST /myAlfred/api/admin/loginAs
// Login as user (for admins only)
router.post('/loginAs', passport.authenticate('admin', {session: false}), (req, res) => {

  const user = req.user
  if (!user.is_admin) {
    res.status(403).json({msg: 'Access denied'})
    return
  }
  const email = req.body.username
  const role = req.body.role

  // Find user by email
  req.context.getModel('User').findOne({email})
    .populate('shop', 'is_particular')
    .then(user => {
      // Check for user
      if (!user) {
        errors = `Pas d'utilisateur connu avec l'email ${email}`
        return res.status(400).json(errors)
      }

      if (user.active) {
        send_cookie(user, role, res)
      }
      else {
        errors = 'Utilisateur inactif'
        return res.status(400).json(errors)
      }
    })
})


// @Route GET /myAlfred/api/admin/users/users
// List all simple users
router.get('/users/users', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('User').find({is_admin: false, is_alfred: false})
      .then(user => {
        if (!user) {
          res.status(400).json({msg: 'No users found'})
        }
        res.json(user)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({users: 'No billing found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/users/users/:id
// Get one user
router.get('/users/users/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('User').findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).json({msg: 'No user found'})
        }
        res.json(user)

      })
      .catch(err => {
        console.error(err)
        res.status(404).json({user: 'No user found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route PUT /myAlfred/api/admin/users/users/:id
// Update a user
// @Access private
router.put('/users/users/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOneAndUpdate({_id: req.params.id}, {$set: {active: req.body.active}}, {new: true})
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({usernotfound: 'No user found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route PUT /myAlfred/api/admin/users/users/idCard/:id
// Validate id card for a user
// @Access private
router.put('/users/users/idCard/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: true}}, {new: true})
      .then(user => {
        res.json(user)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({usernotfound: 'No user found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route PUT /myAlfred/api/admin/users/users/idCard/delete:id
// Delete id card for a user
// @Access private
router.put('/users/users/idCard/delete/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: false}}, {new: true})
      .then(user => {
        res.json(user)
      })
      .catch(err => res.status(404).json({usernotfound: 'No user found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/users/users/:id
// Delete one user
// @Access private
router.delete('/users/users/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin


  req.context.getModel('User').findById(req.params.id)
    .then(user => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      user.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({user: 'No user found'}))

})

// @Route GET /myAlfred/api/admin/users/alfred
// List all alfred
router.get('/users/alfred', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').find({is_alfred: true})
      .sort({name: 1})
      .then(user => {
        if (!user) {
          res.status(400).json({msg: 'No alfred found'})
        }

        res.json(user)
      })
      .catch(err => res.status(404).json({alfred: 'No alfred found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/users/alfred/:id
// Get one alfred
router.get('/users/alfred/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).json({msg: 'No user found'})
        }
        res.json(user)

      })
      .catch(err => res.status(404).json({user: 'No user found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route PUT /myAlfred/api/admin/users/alfred/:id
// Update an alfred
// @Access private
router.put('/users/alfred/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOneAndUpdate({_id: req.params.id}, {
      $set: {
        is_alfred: req.body.is_alfred,
        active: req.body.active,
        super_alfred: req.body.super_alfred,
      },
    }, {new: true})
      .then(user => {
        res.json(user)
      })
      .catch(err => res.status(404).json({usernotfound: 'No user found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route PUT /myAlfred/api/admin/users/alfred/idCard/:id
// Validate id card for an alfred
// @Access private
router.put('/users/alfred/idCard/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: true}}, {new: true})
      .then(user => {
        res.json(user)
      })
      .catch(err => res.status(404).json({usernotfound: 'No user found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route PUT /myAlfred/api/admin/users/alfred/idCard/delete:id
// Delete id card for an alfred
// @Access private
router.put('/users/alfred/idCard/delete/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: false}}, {new: true})
      .then(user => {
        res.json(user)
      })
      .catch(err => res.status(404).json({usernotfound: 'No user found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/users/alfred/:id
// Delete one alfred
// @Access private
router.delete('/users/alfred/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('User').findById(req.params.id)
    .then(user => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      user.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// @Route GET /myAlfred/api/admin/users/admin
// List all admin
// @Access private and for admin only
router.get('/users/admin', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('User').find({is_admin: true})
      .sort({name: 1})
      .then(user => {
        if (!user) {
          res.status(400).json({msg: 'No admin found'})
        }

        res.json(user)
      })
      .catch(err => res.status(404).json({admin: 'No admin found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/users/admin/:id
// Get one admin
// @Access private and for admin only
router.get('/users/admin/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('User').findById(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).json({msg: 'No user found'})
        }
        res.json(user)

      })
      .catch(err => res.status(404).json({user: 'No user found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route POST /myAlfred/api/admin/users/admin
// Add an admin
// @Access private and for admin only
router.post('/users/admin', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateRegisterAdminInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('User').findOne({email: req.body.email, is_admin: true})
      .then(user => {
        if (user) {
          errors.email = 'Email déjà existant'
          return res.status(400).json(errors)
        }
        const newUser = {
          name: req.body.name,
          firstname: req.body.firstname,
          email: req.body.email,
          password: req.body.password,
          birthday: req.body.birthday,
          phone: req.body.phone,
          is_admin: true,
        }
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              throw err
            }
            newUser.password = hash
            req.context.getModel('User').create(newUser)
              .then(user => res.json(user))
              .catch(err => console.error(err))
          })
        })


      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})


// @Route PUT /myAlfred/api/admin/users/admin/:id
// Update an admin
// @Access private
router.put('/users/admin/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOneAndUpdate({_id: req.params.id}, {
      $set: {
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        phone: req.body.phone, active: req.body.active,
      },
    }, {new: true})
      .then(user => {
        res.json(user)
      })
      .catch(err => res.status(404).json({usernotfound: 'No user found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/users/admin/:id
// Delete one admin
// @Access private
router.delete('/users/admin/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin


  req.context.getModel('User').findById(req.params.id)
    .then(user => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      user.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// CALCULATING


// @Route POST /myAlfred/calculating/admin/all
// Add calculating for prestation
// @Access private
router.post('/calculating/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Calculating').findOne({label: req.body.label})
      .then(calculating => {
        if (calculating) {
          errors.label = 'Cette méthode de calcul existe déjà'
          return res.status(400).json(errors)
        }

        const newCalculating={
          label: req.body.label,
        }

        req.context.getModel('Calculating').create(newCalculating)
          .then(calculating => res.json(calculating))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/calculating/all
// View all calculating system
// @Access private
router.get('/calculating/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Calculating').find()
      .then(calculating => {
        res.json(calculating)
      })
      .catch(err => res.status(404).json({calculating: 'No billing found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/calculating/all/:id
// View one calculating system
// @Access private
router.get('/calculating/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Calculating').findById(req.params.id)
      .then(calculating => {
        if (!calculating) {
          return res.status(404).json({msg: 'No calculating found'})
        }
        res.json(calculating)
      })
      .catch(err => res.status(404).json({billing: 'No calculating found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route DELETE /myAlfred/api/admin/calculating/all/:id
// Delete one calculating system
// @Access private
router.delete('/calculating/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Calculating').findById(req.params.id)
    .then(calculating => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      calculating.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({calculating: 'No calculating found'}))
})

// @Route PUT /myAlfred/api/admin/calculating/all/:id
// Update a calculating system
// @Access private
router.put('calculating/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Calculating').findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
      .then(calculating => {
        res.json(calculating)
      })
      .catch(err => res.status(404).json({calculatingnotfound: 'No calculating found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// FILTER PRESENTATION


// @Route POST /myAlfred/api/admin/filterPresentation/all
// Add filterPresentation for prestation
// @Access private
router.post('/filterPresentation/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('FilterPresentation').findOne({label: req.body.label})
      .then(filterPresentation => {
        if (filterPresentation) {
          errors.label = 'Ce filtre existe déjà'
          return res.status(400).json(errors)
        }
        const newFilterPresentation={
          label: req.body.label,
        }

        req.context.getModel('FilterPresentation').create(newFilterPresentation)
          .then(filterPresentation => res.json(filterPresentation))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/filterPresentation/all
// View all filterPresentation
// @Access private
router.get('/filterPresentation/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('FilterPresentation').find()
      .sort({label: 1})
      .then(filterPresentation => {
        if (!filterPresentation) {
          return res.status(400).json({msg: 'No filterPresentation found'})
        }
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
        res.setHeader('X-Total-Count', filterPresentation.length)
        res.json(filterPresentation)

      })
      .catch(err => res.status(404).json({filterPresentation: 'No billing found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/filterPresentation/all/:id
// View one filterPresentation
// @Access private
router.get('/filterPresentation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('FilterPresentation').findById(req.params.id)
      .then(filterPresentation => {
        if (!filterPresentation) {
          return res.status(400).json({msg: 'No filterPresentation found'})
        }
        res.json(filterPresentation)

      })
      .catch(err => res.status(404).json({billing: 'No filterPresentation found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/filterPresentation/all/:id
// Delete one filterPresentation
// @Access private
router.delete('/filterPresentation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('FilterPresentation').findById(req.params.id)
    .then(filterPresentation => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      filterPresentation.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({filterPresentation: 'No filterPresentation found'}))
})

// @Route PUT /myAlfred/api/admin/filterPresentation/all/:id
// Update a filterPresentation
// @Access private
router.put('/filterPresentation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('FilterPresentation').findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
      .then(filterPresentation => {
        res.json(filterPresentation)
      })
      .catch(err => res.status(404).json({filterPresentationnotfound: 'No filterPresentation found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// JOB

// @Route POST /myAlfred/api/admin/job/all
// Add job for prestation
// @Access private
router.post('/job/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Job').findOne({label: req.body.label})
      .then(job => {
        if (job) {
          errors.label = 'Ce métier existe déjà'
          return res.status(400).json(errors)
        }
        const newJob={
          label: req.body.label,
        }

        req.context.getModel('Job').create(newJob)
          .then(job => res.json(job))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/job/all
// View all job
// @Access private
router.get('/job/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Job').find()
      .sort({label: 1})
      .then(job => {
        if (!job) {
          return res.status(400).json({msg: 'No job found'})
        }
        res.json(job)

      })
      .catch(err => res.status(404).json({job: 'No billing found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/job/all/:id
// View one job
// @Access private
router.get('/job/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Job').findById(req.params.id)
      .then(job => {
        if (!job) {
          return res.status(400).json({msg: 'No job found'})
        }
        res.json(job)

      })
      .catch(err => res.status(404).json({billing: 'No job found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/job/all/:id
// Delete one job
// @Access private
router.delete('/job/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Job').findById(req.params.id)
    .then(job => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      job.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({job: 'No job found'}))
})

// @Route PUT /myAlfred/api/admin/job/all/:id
// Update a job
// @Access private
router.put('/job/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Job').findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
      .then(job => {
        res.json(job)
      })
      .catch(err => res.status(404).json({jobnotfound: 'No job found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// SEARCH FILTER

// @Route POST /myAlfred/api/admin/searchFilter/all
// Add searchFilter for prestation
// @Access private
router.post('/searchFilter/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('SearchFilter').findOne({label: req.body.label})
      .then(searchFilter => {
        if (searchFilter) {
          errors.label = 'Ce filtre existe déjà'
          return res.status(400).json(errors)
        }
        const newSearchFilter={
          label: req.body.label,
        }

        req.context.getModel('SearchFilter').create(newSearchFilter)
          .then(searchFilter => res.json(searchFilter))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/searchFilter/all
// View all searchFilter
// @Access private
router.get('/searchFilter/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('SearchFilter').find()
      .then(searchFilter => {
        if (!searchFilter) {
          return res.status(400).json({msg: 'No searchFilter found'})
        }
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
        res.setHeader('X-Total-Count', searchFilter.length)
        res.json(searchFilter)

      })
      .catch(err => res.status(404).json({searchFilter: 'No billing found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/searchFilter/all/:id
// View one searchFilter
// @Access private
router.get('/searchFilter/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('SearchFilter').findById(req.params.id)
      .then(searchFilter => {
        if (!searchFilter) {
          return res.status(400).json({msg: 'No searchFilter found'})
        }
        res.json(searchFilter)

      })
      .catch(err => res.status(404).json({billing: 'No searchFilter found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/searchFilter/all/:id
// Delete one searchFilter
// @Access private
router.delete('/searchFilter/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('SearchFilter').findById(req.params.id)
    .then(searchFilter => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      searchFilter.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({searchFilter: 'No searchFilter found'}))
})

// @Route PUT /myAlfred/api/admin/searchFilter/all/:id
// Update a searchFilter
// @Access private
router.put('/searchFilter/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('SearchFilter').findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
      .then(searchFilter => {
        res.json(searchFilter)
      })
      .catch(err => res.status(404).json({searchFilternotfound: 'No searchFilter found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// TAGS

// @Route POST /myAlfred/api/admin/tags/all
// Add tags for service
// @Access private
router.post('/tags/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Tag').findOne({label: req.body.label})
      .then(tags => {
        if (tags) {
          errors.label = 'Ce tags existe déjà'
          return res.status(400).json(errors)
        }
        const newTag={
          label: req.body.label,
          title: req.body.title,
          description: req.body.description,
        }

        req.context.getModel('Tag').create(newTag)
          .then(tags => res.json(tags))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/tags/all
// View all tags
// @Access private
router.get('/tags/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Tag').find()
      .sort({label: 1})
      .then(tags => {
        res.json(tags)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({tags: 'No tags found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/tags/all/:id
// View one tag
// @Access private
router.get('/tags/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Tag').findById(req.params.id)
      .then(tags => {
        if (!tags) {
          return res.status(400).json({msg: 'No tags found'})
        }
        res.json(tags)

      })
      .catch(err => res.status(404).json({tags: 'No tags found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/tags/all/:id
// Delete one tag
// @Access private
router.delete('/tags/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Tag').findById(req.params.id)
    .then(tags => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      tags.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({tagsnotfound: 'No tags found'}))
})

// @Route PUT /myAlfred/api/admin/tags/all/:id
// Update a tag
// @Access private
router.put('/tags/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Tag').findOneAndUpdate({_id: req.params.id}, {
      $set: {
        label: req.body.label,
        title: req.body.title,
        description: req.body.description,
      },
    }, {new: true})
      .then(tags => {
        res.json(tags)
      })
      .catch(err => res.status(404).json({tagsnotfound: 'No tags found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// CATEGORY

ensureDirectoryExists('static/category/')
const storageCat = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/category/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  },
})
const uploadCat = multer({storage: storageCat})

const storageProspect = multer.memoryStorage()

const uploadProspect = multer({
  storage: storageProspect,
  fileFilter: function(req, file, callback) {
    if (!isTxtFile(file.originalName)) {
      return callback(new Error('Fichier csv attendu (.csv ou .txt)'))
    }
    callback(null, true)
  },
})

// @Route POST /myAlfred/api/admin/category/all
// Add category for prestation
// @Access private
router.post('/category/all', uploadCat.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateCategoryInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Category').findOne({label: req.body.label})
      .then(category => {
        if (category) {
          errors.label = 'Cette catégorie existe déjà'
          return res.status(400).json(errors)
        }
        const newCategory={
          label: req.body.label,
          s_label: normalize(req.body.label),
          picture: req.file.path,
          description: req.body.description,
          tags: JSON.parse(req.body.tags),
        }

        req.context.getModel('Category').create(newCategory)
          .then(category => res.json(category))
          .catch(err => console.error(err))

      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route POST /myAlfred/api/admin/category/editPicture/:id
// Edit the picture of a category
// @Access private
router.put('/category/editPicture/:id', uploadCat.fields([
  {name: 'particular_picture', maxCount: 1},
  {name: 'professional_picture', maxCount: 1}]),
passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    let attributes = {}
    if (req.files.particular_picture) {
      attributes.particular_picture = req.files.particular_picture[0].path
    }
    if (req.files.professional_picture) {
      attributes.professional_picture = req.files.professional_picture[0].path
    }
    req.context.getModel('Category').findByIdAndUpdate(req.params.id, attributes, {new: true})
      .then(category => {
        res.json(category)
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/category/all
// View all categories
// @Access private
router.get('/category/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Category').find()
      .sort({'label': 1})
      .populate('tags')
      .then(category => {
        if (!category) {
          return res.status(400).json({msg: 'No category found'})
        }
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
        res.setHeader('X-Total-Count', category.length)
        res.json(category)

      })
      .catch(err => {
        console.error(err)
        return res.status(404).json({category: 'No billing found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/category/all/:id
// View one category
// @Access private
router.get('/category/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Category').findById(req.params.id)
      .populate('tags')
      .then(category => {
        if (!category) {
          return res.status(400).json({msg: 'No category found'})
        }
        res.json(category)

      })
      .catch(err => res.status(404).json({billing: 'No category found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/category/all/:id
// Delete one category
// @Access private
router.delete('/category/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Category').findById(req.params.id)
    .then(category => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      category.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({category: 'No category found'}))
})

// @Route PUT /myAlfred/api/admin/category/all/:id
// Update a category
// @Access private
router.put('/category/all/:id?', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    let attributes={
      particular_label: req.body.particular_label,
      s_particular_label: normalize(req.body.particular_label),
      professional_label: req.body.professional_label,
      s_professional_label: normalize(req.body.professional_label),
      description: req.body.description,
      tags: req.body.tags,
    }
    const promise=req.params.id ?
      req.context.getModel('Category').findByIdAndUpdate(req.params.id, attributes, {new: true})
      :
      new Category(attributes).save()
    promise
      .then(category => {
        res.json(category)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({categorynotfound: 'No category found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// EQUIPMENTS
ensureDirectoryExists('static/equipments/')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/equipments/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({storage: storage})
// @Route POST /myAlfred/api/admin/equipment/all
// Add equipment for service
// @Access private
router.post('/equipment/all', upload.fields([{name: 'logo', maxCount: 1}, {
  name: 'logo2',
  maxCount: 1,
}]), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Equipment').findOne({label: req.body.label})
      .then(equipment => {
        if (equipment) {
          errors.label = 'Cet équipement existe déjà '
          return res.status(400).json(errors)
        }
        const newEquipment={
          label: req.body.label,
          logo: req.files.logo[0].path,
          name_logo: req.files.logo[0].filename,
          logo2: req.files.logo2[0].path,
          name_logo2: req.files.logo2[0].filename,
        }

        req.context.getModel('Equipment').create(newEquipment)
          .then(equipment => res.json(equipment))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route POST /myAlfred/api/admin/equipment/editPicture/:id
// Edit the logo for equipment
// @Access private
router.post('/equipment/editPicture/:id', upload.fields([{name: 'logo', maxCount: 1}, {
  name: 'logo2',
  maxCount: 1,
}]), passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {

    req.context.getModel('Equipment').findByIdAndUpdate(req.params.id, {
      logo: req.files.logo[0].path,
      logo2: req.files.logo2[0].path,
    }, {new: true})
      .then(equipment => {
        res.json(equipment)
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route GET /myAlfred/api/admin/equipment/all
// View all equipments
// @Access private
router.get('/equipment/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Equipment').find()
      .sort({label: 1})
      .then(equipment => {
        if (!equipment) {
          return res.status(400).json({msg: 'No equipment found'})
        }
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
        res.setHeader('X-Total-Count', equipment.length)
        res.json(equipment)

      })
      .catch(err => res.status(404).json({equipment: 'No equipment found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/equipment/all/:id
// View one equipments
// @Access private
router.get('/equipment/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    req.context.getModel('Equipment').findById(req.params.id)
      .then(equipment => {
        if (!equipment) {
          return res.status(400).json({msg: 'No equipment found'})
        }
        res.json(equipment)

      })
      .catch(err => res.status(404).json({equipment: 'No equipment found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/equipment/all/:id
// Delete one equipment system
// @Access private
router.delete('/equipment/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Equipment').findById(req.params.id)
    .then(equipment => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      equipment.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({equipmentnotfound: 'No equipment found'}))
})

// @Route PUT /myAlfred/api/admin/equipment/all/:id
// Update a equipment system
// @Access private
router.put('/equipment/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Equipment').findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
      .then(equipment => {
        res.json(equipment)


      })
      .catch(err => res.status(404).json({equipmentnotfound: 'No equipment found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// SERVICE
ensureDirectoryExists('static/service/')
const storageService = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/service/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  },
})
const uploadService = multer({storage: storageService})


// @Route POST /myAlfred/api/admin/service/all
// Add service for prestation
// @Access private
router.post('/service/all', uploadService.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateServiceInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Service').findOne({label: req.body.label})
      .then(service => {
        if (service) {
          errors.label = 'Ce service existe déjà'
          return res.status(400).json(errors)
        }
        const newService={
          label: req.body.label,
          s_label: normalize(req.body.label),
          category: mongoose.Types.ObjectId(req.body.category),
          equipments: JSON.parse(req.body.equipments),
          tags: JSON.parse(req.body.tags),
          picture: req.file.path,
          description: req.body.description,
          majoration: req.body.majoration,
          location: {
            alfred: req.body['location.alfred'] == 'true',
            client: req.body['location.client'] == 'true',
            visio: req.body['location.visio'] == 'true',
          },
          pick_tax: req.body.pick_tax,
          travel_tax: req.body.travel_tax,
          professional_access: req.body.professional_access,
          particular_access: req.body.particular_access,
        }

        req.context.getModel('Service').create(newService)
          .then(service => res.json(service))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route POST /myAlfred/api/admin/service/editPicture/:id
// Edit picture
// @Access private
router.post('/service/editPicture/:id', uploadService.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {

    req.context.getModel('Service').findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
      .then(service => {
        res.json(service)
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/service/all
// View all service
// @Access private
router.get('/service/all', passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Service').find()
      .sort({'label': 1})
      .populate('tags', ['label'])
      .populate('equipments', 'label')
      .populate('category', 'particular_label professional_label')
      .populate('prestations', 'particular_access professional_access')
      .then(service => {
        if (!service) {
          return res.status(400).json({msg: 'No service found'})
        }
        res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
        res.setHeader('X-Total-Count', service.length)
        res.json(service)

      })
      .catch(err => {
        console.error(err)
        res.status(404).json({service: 'No service found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/service/all/:id
// View one service
// @Access private
router.get('/service/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Service').findById(req.params.id)
      .populate('tags')
      .populate('equipments')
      .populate('category')
      .then(service => {
        if (!service) {
          return res.status(400).json({msg: 'No service found'})
        }
        res.json(service)

      })
      .catch(err => res.status(404).json({billing: 'No service found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/service/all/:id
// Delete one service
// @Access private
router.delete('/service/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Service').findById(req.params.id)
    .then(service => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      service.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({service: 'No service found'}))
})

// @Route PUT /myAlfred/api/admin/service/all/:id
// Update a service
// @Access private
router.put('/service/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    const {errors, isValid} = validateServiceInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Service').findByIdAndUpdate({_id: req.params.id},
      {
        $set: {
          label: req.body.label, equipments: req.body.equipments, category: mongoose.Types.ObjectId(req.body.category),
          s_label: normalize(req.body.label),
          tags: req.body.tags,
          description: req.body.description, majoration: req.body.majoration, location: req.body.location,
          travel_tax: req.body.travel_tax, pick_tax: req.body.pick_tax,
          professional_access: req.body.professional_access, particular_access: req.body.particular_access,
        },

      }, {new: false})
      .then(service => {
        // Update prestations if service access changed
        updates={}
        if (service.professional_access!=req.body.professional_access) {
          updates.professional_access=req.body.professional_access
        }
        if (service.particular_access!=req.body.particular_access) {
          updates.particular_access=req.body.particular_access
        }
        if (Object.keys(updates).length>0) {
          req.context.getModel('Prestation').updateMany({service: service._id}, {$set: updates})
            .then(res => console.log(`Prestations updated:${JSON.stringify(res)}`))
            .catch(err => console.error(`Prestations update error:${err}`))
        }
        res.json(null)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({servicenotfound: 'No service found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})


// PRESTATION
ensureDirectoryExists('static/prestation/')
const storagePrestation = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/prestation/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  },
})
const uploadPrestation = multer({storage: storagePrestation})

// @Route POST /myAlfred/api/admin/prestation/all
// Add a prestation
// @Access private
router.post('/prestation/all', uploadPrestation.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validatePrestationInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Prestation').findOne({
      label: req.body.label,
      filter_presentation: req.body.filter_presentation,
      service: req.body.service,
    })
      .then(prestation => {
        if (prestation) {
          errors.label = 'Cette prestation existe déjà'
          return res.status(400).json(errors)
        }

        const newPrestation={
          label: req.body.label,
          s_label: normalize(req.body.label),
          price: req.body.price,
          service: mongoose.Types.ObjectId(req.body.service),
          billing: req.body.billing,
          filter_presentation: mongoose.Types.ObjectId(req.body.filter_presentation),
          search_filter: null,
          category: null,
          calculating: null,
          job: req.body.job,
          description: req.body.description,
          // picture: req.body.picture.path,
          picture: req.file ? req.file.path : null,
          tags: req.body.tags,
          cesu_eligible: req.body.cesu_eligible,
          professional_access: req.body.professional_access,
          particular_access: req.body.particular_access,
          private_company: req.body.private_company,
          order: req.body.order ? parseInt(req.body.order) : 1,
          company_price: req.body.company_price && req.body.private_company ? parseInt(req.body.company_price) : 0,
        }

        req.context.getModel('Prestation').create(newPrestation)
          .then(prestation => res.json(prestation))
          .catch(err => res.status(400).json(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route POST /myAlfred/api/admin/prestation/editPicture/:id
// Edit picture
// @Access private
router.post('/prestation/editPicture/:id', uploadPrestation.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {

    req.context.getModel('Prestation').findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
      .then(prestation => {
        res.json(prestation)
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/prestation/all
// Get all prestations
// @Access public
router.get('/prestation/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Prestation').find({}, 'label cesu_eligible particular_access professional_access order')
      .sort({s_label: 1, category: 1})
      .populate({path: 'service', select: 'label', populate: {
        path: 'category', select: 'particular_label professional_label'},
      })
      .populate('filter_presentation', 'label')
      .populate('private_alfred', 'firstname name')
      .then(prestation => {
        if (!prestation) {
          return res.status(400).json({msg: 'No prestation found'})
        }

        res.json(prestation)

      })
      .catch(err => res.status(404).json({billing: 'No prestation found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/prestation/all/:id
// View one prestation
// @Access public
router.get('/prestation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('Prestation').findById(req.params.id)
      .populate('service')
      .populate('billing')
      .populate('filter_presentation')
      .populate('category')
      .populate('search_filter')
      .populate('calculating')
      .populate('job')
      .populate('tags')
      .then(prestation => {
        if (!prestation) {
          return res.status(400).json({msg: 'No prestation found'})
        }
        res.json(prestation)

      })
      .catch(err => res.status(404).json({prestation: 'No prestation found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route DELETE /myAlfred/api/admin/prestation/all/:id
// Delete one prestation
// @Access private
router.delete('/prestation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('Prestation').findById(req.params.id)
    .then(prestation => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      prestation.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({prestationnotfound: 'No prestation found'}))
})

// @Route PUT /myAlfred/api/admin/prestation/all/:id
// Update a prestation
// @Access private
router.put('/prestation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    const {errors, isValid} = validatePrestationInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Prestation').findOneAndUpdate({_id: req.params.id}, {
      $set: {
        label: req.body.label,
        s_label: normalize(req.body.label),
        price: req.body.price,
        service: mongoose.Types.ObjectId(req.body.service),
        billing: req.body.billing,
        filter_presentation: mongoose.Types.ObjectId(req.body.filter_presentation),
        search_filter: null,
        category: mongoose.Types.ObjectId(req.body.service.category),
        calculating: null,
        job: req.body.job ? mongoose.Types.ObjectId(req.body.job) : null,
        description: req.body.description,
        tags: req.body.tags,
        cesu_eligible: req.body.cesu_eligible,
        professional_access: req.body.professional_access,
        particular_access: req.body.particular_access,
        private_company: req.body.private_company,
        order: req.body.order ? parseInt(req.body.order) : 1,
        company_price: req.body.company_price && req.body.private_company ? parseInt(req.body.company_price) : 0,
      },
    },
    {new: true})
      .then(prestation => {
        res.json(prestation)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({error: err})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// SHOP BANNER
ensureDirectoryExists('static/shopBanner/')
const storageBanner = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'static/shopBanner/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  },
})
const uploadBanner = multer({storage: storageBanner})

// @Route POST /myAlfred/api/admin/shopBanner/all
// Add picture for shop banner
// @Access private
router.post('/shopBanner/all', uploadBanner.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    if (!isValid) {
      return res.status(400).json(errors)
    }
    req.context.getModel('ShopBanner').findOne({label: req.body.label})
      .then(service => {
        if (service) {
          errors.label = 'Cette bannière existe déjà'
          return res.status(400).json(errors)
        }
        const newBanner={
          label: req.body.label,
          picture: req.file.path,
        }
        req.context.getModel('ShopBanner').create(newBanner)
          .then(banner => res.json(banner))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route POST /myAlfred/api/admin/shopBanner/editPicture/:id
// Edit picture
// @Access private
router.post('/shopBanner/editPicture/:id', uploadBanner.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {

    req.context.getModel('ShopBanner').findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
      .then(banner => {
        res.json(banner)
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/shopBanner/all
// Get all picture banner
router.get('/shopBanner/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('ShopBanner').find()
      .sort({label: 1})
      .then(banner => {
        if (!banner) {
          return res.status(400).json({msg: 'No banner found'})
        }
        res.json(banner)

      })
      .catch(err => res.status(404).json({banner: 'No banner found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/shopBanner/all/:id
// View one shop banner
router.get('/shopBanner/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('ShopBanner').findById(req.params.id)
      .then(banner => {
        if (!banner) {
          return res.status(400).json({msg: 'No banner found'})
        }
        res.json(banner)

      })
      .catch(err => res.status(404).json({banner: 'No banner found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }


})

// @Route DELETE /myAlfred/api/admin/shopBanner/all/:id
// Delete one shop banner
// @Access private
router.delete('/shopBanner/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  req.context.getModel('ShopBanner').findById(req.params.id)
    .then(banner => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      banner.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({bannernotfound: 'No banner found'}))
})

// @Route PUT /myAlfred/api/admin/shopBanner/all/:id
// Update a shop banner
// @Access private
router.put('/shopBanner/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('ShopBanner').findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
      .then(banner => {
        res.json(banner)
      })
      .catch(err => res.status(404).json({bannernotfound: 'No banner found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// OPTIONS

// @Route POST /myAlfred/api/admin/options/all
// Add options
// @Access private
router.post('/options/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {

    Options.findOne({label: req.body.label})
      .then(options => {
        if (options) {
          return res.status(400).json({msg: 'Cette option existe déjà'})
        }
        const newOption={
          label: req.body.label,
          description: req.body.description,
          billing: req.body.billing,
        }

        req.context.getModel('Option').create(newOption)
          .then(options => res.json(options))
          .catch(err => console.error(err))
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/options/all
// View all options
// @Access private
router.get('/options/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    Options.find()
      .then(options => {
        if (!options) {
          return res.status(400).json({msg: 'No options found'})
        }
        res.json(options)

      })
      .catch(err => res.status(404).json({options: 'No options found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route GET /myAlfred/api/admin/options/all/:id
// View one option
// @Access private
router.get('/options/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  if (admin) {
    Options.findById(req.params.id)
      .then(options => {
        if (!options) {
          return res.status(400).json({msg: 'No options found'})
        }
        res.json(options)

      })
      .catch(err => res.status(404).json({options: 'No options found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// @Route DELETE /myAlfred/api/admin/options/all/:id
// Delete one option
// @Access private
router.delete('/options/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin
  Options.findById(req.params.id)
    .then(options => {
      if (!admin) {
        return res.status(401).json({notauthorized: 'User not authorized'})


      }
      options.remove().then(() => res.json({success: true}))
    })
    .catch(err => res.status(404).json({optionsnotfound: 'No options found'}))
})

// @Route PUT /myAlfred/api/admin/options/all/:id
// Update an option
// @Access private
router.put('/options/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    Options.findOneAndUpdate({_id: req.params.id}, {
      $set: {
        label: req.body.label,
        description: req.body.description,
        billing: req.body.billing,
      },
    }, {new: true})
      .then(options => {
        res.json(options)
      })
      .catch(err => res.status(404).json({optionsnotfound: 'No options found'}))
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})

// TODO: récupérer en sum/aggréation par mois
router.get('/registrations', (req, res) => {
  req.context.getModel('User').find({}, 'creation_date')
    .sort({creation_date: 1})
    .then(users => {
      const monthDates = users.map(user => new Date(user.creation_date.getFullYear(), user.creation_date.getMonth()).getTime())
      const counts = counterArray(monthDates, 'x', 'y')
      res.json(counts)
    })
})

// TODO: récupérer en sum/aggréation par age
router.get('/ages', (req, res) => {

  const get_label = age => {
    if (age<=25) { return '<25' }
    else if (age>=55) { return '>55' }

    step=Math.floor((age-25)/10)
    label = `${step*10+25}>${(step+1)*10+25}`
    return label

  }

  const alfred = JSON.parse(req.query.alfred || 'false')
  const fltr = alfred ? {is_alfred: true} : {}
  req.context.getModel('User').find(fltr, 'birthday')
    .sort({'birthday': -1})
    .then(users => {
      const labels=users.filter(u => u.age<100).map(u => get_label(u.age))
      let counts = counterArray(labels, 'label', 'angle')
      const total=users.length
      counts = counts.map(obj => {
        acc = {label: `${obj.label} (${Math.floor(obj.angle/total*100)}%)`, angle: obj.angle}
        return acc
      })
      res.json(counts)
    })
})

// @Route GET /myAlfred/api/admin/statistics
// Get satistics (users, shops, services)
// @Access private
// router.get('/statistics',passport.authenticate('admin',{session:false}),(req,res)=> {
router.get('/statistics', (req, res) => {
  //
  // const token = req.headers.authorization.split(' ')[1];
  // const decode = jwt.decode(token);
  // const admin = decode.is_admin;
  //
  const admin = true

  if (admin) {
    let stats = {}
    req.context.getModel('User').count()
      .catch(err => res.status(404).json({statistics: 'Error on users'}))
      .then(nb_users => {
        stats.users = nb_users
        req.context.getModel('User').find({is_alfred: true}).count()
          .catch(err => res.status(404).json({statistics: 'Error on alfred'}))
          .then(nb_alfred => {
            stats.alfred = nb_alfred
            req.context.getModel('ServiceUser').find()
              .catch(err => res.status(404).json({statistics: 'Error on alfred'}))
              .then(services => {
                stats.services = services.length
                stats.prestations = services.map(s => s.prestations.length).reduce((acc, value) => acc + value)
                res.json(stats)
              })
          })
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/booking/all
// Get all bookings
// @Access private
router.get('/booking/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const context = req.context
  if (context.isAdmin()) {
    context.getModel('Booking').find()
      .populate('alfred', 'firstname name')
      .populate('user', 'firstname name')
      .sort({date: -1})
      .catch(err => {
        console.error(err)
        res.status(404).json({bookings: 'Error'})
      })
      .then(bookings => {
        res.json(bookings)
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }
})

// @Route GET /myAlfred/api/admin/prospect/all
// Get all prospect
// @Access admin
router.get('/prospect/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (!admin) {
    return res.status(403).json({msg: 'Access denied'})
  }

  req.context.getModel('Prospect').aggregate([
    {$sort: {'category': 1, 'contacted': 1}},
    {$group: {_id: {'category': '$category', 'contacted': '$contacted'}, total: {$sum: 1}}},
  ])
    .then(prospects => {
      result={}
      prospects.forEach(p => {
        let r=result[p._id.category]||{category: p._id.category, count: 0, contacted: 0, not_contacted: 0}
        r[p._id.contacted ? 'contacted' : 'not_contacted']=p.total
        r.count += p.total
        result[p._id.category]=r
      })
      result=_.sortBy(Object.values(result), v => normalize(v.category))
      return res.json(result)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).json(err)
    })
})

router.get('/prospect/fields', passport.authenticate('admin', {session: false}), (req, res) => {
  const schema = req.context.getModel('Prospect').schema.obj
  const schema_fields = Object.keys(schema).sort()
  const schema_required = schema_fields.filter(k => schema[k].required && !schema[k].default)
  res.json({mandatory: schema_required, fields: schema_fields})
})

// companies

// @Route GET /myAlfred/api/admin/companies/all
// View all companies
// @Access private
router.get('/companies/all', passport.authenticate('admin', {session: false}), (req, res) => {

  req.context.getModel('Company').find()
    .sort({'name': 1})
    .lean()
    .then(companies => {
      if (!companies) {
        return res.status(400).json({msg: 'No company found'})
      }
      req.context.getModel('User').find({company: {$exists: true, $ne: null}}, 'company')
        .then(users => {
          companies.forEach(company => {
            company.employees = users.filter(u => u.company.toString() == company._id.toString()).length
          })
          res.json(companies)
        })
    })
    .catch(err => res.status(404).json({company: 'No company found'}))
})

// @Route GET /myAlfred/api/admin/companies/:id
// View one company
// @Access private
router.get('/companies/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  req.context.getModel('Company').findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(400).json({msg: 'No company found'})
      }
      res.json(company)

    })
})

// @Route GET /myAlfred/api/admin/companies/:id
// View one company
// @Access private
router.get('/companies/:id/users', passport.authenticate('admin', {session: false}), (req, res) => {
  req.context.getModel('User').find({company: req.params.id}, 'firstname name email roles')
    .then(users => {
      if (!users) {
        return res.status(400).json({msg: 'No company found'})
      }
      res.json(users)

    })
})

// @Route POST /myAlfred/api/admin/companies
// Adds or update a company
// @Access private
router.post('/companies', passport.authenticate('admin', {session: false}), (req, res) => {

  const {isValid, errors} = validateCompanyProfile(req.body)
  if (!isValid) {
    console.log(`Errors:${ JSON.stringify(errors)}`)
    return res.status(400).json(errors)
  }

  req.context.getModel('Company').findOne({name: req.body.name})
    .then(company => {
      if (company && company._id != req.body._id) {
        return res.status(400).json({error: 'Cette entreprise existe déjà'})
      }
      const promise=req.body._id ? req.context.getModel('Company').findByIdAndUpdate(req.body._id, req.body, {new: true})
        :
        new Company(req.body).save()
      promise
        .then(company => {
          if (!company) {
            return res.status(400).json({msg: 'No company found'})
          }
          if (req.body.admin_email) {
            req.context.getModel('User').findOne({email: req.body.admin_email})
              .then(user => {
                if (user) {
                  return res.status(400).json({error: 'Un compte avec cet email existe déjà'})
                }

                const newUser= {
                  firstname: req.body.admin_firstname,
                  name: req.body.admin_name,
                  email: req.body.admin_email,
                  company: company._id,
                  password: crypto.randomBytes(10).toString('hex'),
                  roles: [ADMIN],
                }
                console.log(`Generated user with password ${newUser.password}`)
                bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                      throw err
                    }
                    newUser.password = hash
                    req.context.getModel('User').create(newUser)
                      .then(() => {
                        axios.post(new URL('/myAlfred/api/users/forgotPassword', computeUrl(req)).toString(), {email: req.body.admin_email, role: ADMIN})
                          .then(() => {
                            return res.json(company)
                          })
                          .catch(err => {
                            console.error(err)
                          })
                      })
                      .catch(err => {
                        console.error(err)
                        return res.status(500).json({error: err})
                      })
                  })
                })

              })
              .catch(err => console.error(err))
          }
          else {
            return res.json(company)
          }
        })
        .catch(err => {
          console.error(err)
          return res.status(500).json({error: err})
        })
    })
})

// @Route PUT /myAlfred/api/admin/companies/all/:id
// Update a company
// @Access private
router.put('/companies/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {

  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    const {errors, isValid} = validateServiceInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    req.context.getModel('Service').findByIdAndUpdate({_id: req.params.id},
      {
        $set: {
          label: req.body.label, equipments: req.body.equipments, category: mongoose.Types.ObjectId(req.body.category),
          s_label: normalize(req.body.label),
          tags: req.body.tags,
          description: req.body.description, majoration: req.body.majoration, location: req.body.location,
          travel_tax: req.body.travel_tax, pick_tax: req.body.pick_tax,
          professional_access: req.body.professional_access, particular_access: req.body.particular_access,
        },

      }, {new: false})
      .then(service => {
        // Update prestations if service access changed
        updates={}
        if (service.professional_access!=req.body.professional_access) {
          updates.professional_access=req.body.professional_access
        }
        if (service.particular_access!=req.body.particular_access) {
          updates.particular_access=req.body.particular_access
        }
        if (Object.keys(updates).length>0) {
          req.context.getModel('Prestation').updateMany({service: service._id}, {$set: updates})
            .then(res => console.log(`Prestations updated:${JSON.stringify(res)}`))
            .catch(err => console.error(`Prestations update error:${err}`))
        }
        res.json(null)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({servicenotfound: 'No service found'})
      })
  }
  else {
    res.status(403).json({msg: 'Access denied'})
  }

})


// @Route POST /myAlfred/api/admin/prospect/search
// Launch prospects from le bon coin (api notifan)
// Body : category, url
// @Access private
router.post('/prospect/search', passport.authenticate('jwt', {session: false}), (req, res) => {
  const category = (req.body.category||'').trim()
  const url = (req.body.url||'').trim()
  const pages_count = 10
  if (!category || !url) {
    res.status(400).json('Catégorie et url requises')
  }

  if (url.includes('&page=')) {
    res.status(400).json("L'url doit être une recherche sur la première page")
  }

  const urls=Array.from(Array(pages_count).keys()).map(i => {
    if (url.includes('&')) {
      return `http://api.notifan.fr/search?url=${url}&page=${i+1}`
    }

    return `http://api.notifan.fr/search?url=${url}/p-${i+1}`

  })

  const DELAY=2000
  const TIMEOUT=2000

  const promises = urls.map((u, index) => delayedPromise(DELAY*(index+1), () => axios.get(u, {timeout: TIMEOUT})))

  let req_result=[`Pages demandées:${pages_count}\n`]
  Promise.allSettled(promises)
    .then(results => {
      var all_ads = []
      let error_reason = null
      results.forEach(result => {
        if (result.status=='fulfilled') {
          all_ads = all_ads.concat(result.value.data.ads)
        }
      })

      const requests_ok = results.filter(r => r.status=='fulfilled')
      const requests_nok = results.filter(r => r.status=='rejected')

      req_result.push(`Pages reçues:${requests_ok.length}`)
      if (requests_nok.length>0) {
        req_result.push(`Pages en erreur:${requests_nok.length}, cause:${_.uniq(requests_nok.map(r => r.reason.toString())).join(',')}`)
      }

      if (requests_ok.length==0) {
        return res.status(400).json(req_result)
      }

      var all_ads = [].concat(requests_ok.map(r => r.value.data.ads))
      req_result.push(`Annonces reçues:${all_ads.length}`)
      all_ads = all_ads.filter(a => a && a.status=='active' && a.has_phone)
      req_result.push(`Annonces actives avec téléphone:${all_ads.length}`)

      req.context.getModel('Prospect').find({list_id: {$exists: true}}, 'ad_id')
        .then(prospects => {
          prospects = prospects.map(p => p.list_id)
          // Retirer les prospects connus en BD par leur ad_id
          all_ads = all_ads.filter(ad => !prospects.includes(ad.list_id))
          req_result.push(`Annonces nouvelles:${all_ads.length}`)

          const phoneUrls = all_ads.map(ad => `http://api.notifan.fr/phone?list_id=${ad.list_id}`)
          const phonePromises = phoneUrls.map((url, index) => delayedPromise(DELAY*index, () => axios.get(url, {timeout: TIMEOUT})))
          req_result.push(`N°s tel demandés:${phonePromises.length}`)
          Promise.allSettled(phonePromises)
            .then(phone_results => {
              // Keep
              phone_results = phone_results.map(p => (p.status=='fulfilled' && p.value.data.utils.status=='OK' ? p.value.data.utils.phonenumber : null))
              const mobile_count = phone_results.filter(p => isMobilePhone(p))
              req_result.push(`N°s tel mobiles reçus:${mobile_count.length}`)
              let db_promises = []
              phone_results.forEach((phone, index) => {
                if (isMobilePhone(phone)) {
                  const ad = all_ads[index]
                  const pData={
                    category: category,
                    name: ad.owner.name,
                    title: ad.subject,
                    phone: phone,
                    city: ad.location.city,
                    zip_code: ad.location.zipcode,
                    provider: 'le bon coin',
                    ad_id: ad.list_id,
                  }
                  db_promises.push(req.context.getModel('Prospect').create(pData))
                }
              })
              Promise.allSettled(db_promises)
                .then(db_results => {
                  const db_results_ok = db_result.filter(r => r.status='fulfilled')
                  db_results.forEach((r, index) => {
                    if (r.status=='rejected') {
                      console.log(`Phone bd request rejectd, ad_id:${all_ads[index].list_id}, reason:${r.reason}`)
                    }
                  })

                  req_result.push(`Prospects ajoutés:${db_results_ok.length}`)
                  return res.json(req_result)
                })
            })
        })
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json([err])
    })
})

// @Route PROSPECT /myAlfred/api/admin/prospect/add
// INsert prospects from csv
router.post('/prospect/add', passport.authenticate('admin', {session: false}), (req, res) => {
  uploadProspect.single('prospects')(req, res, err => {
    if (err) {
      console.error(err)
      res.status(404).json({errors: err.message})
    }
    else {
      req.context.getModel('Prospect').find({}, 'phone')
        .then(phones => {
          const contents = bufferToString(req.file.buffer)
          let records = csv_parse(contents, {columns: true, delimiter: ';'})

          const schema = req.context.getModel('Prospect').schema.obj
          const schema_fields = Object.keys(schema).sort()
          const schema_required = schema_fields.filter(k => schema[k].required && !schema[k].default)
          const data_fields = Object.keys(records[0]).sort()
          const missing = schema_required.filter(att => !data_fields.includes(att))
          const extra = data_fields.filter(att => !schema_fields.includes(att))

          console.log(`Schema required:${schema_required}, ${JSON.stringify(Buffer.from(schema_required.join(',')))}`)
          console.log(`Data fields:${data_fields}, ${JSON.stringify(Buffer.from(data_fields.join(',')))}`)

          if (missing.length>0) {
            throw new Error(`Champ obligatoires manquants:${missing.join(',')}`)
          }
          if (extra.length>0) {
            throw new Error(`Champs inconnus:${extra.join(',')}`)
          }

          const before = records.length
          // Normalize phones
          records = records.map(r => { r.phone=normalizePhone(r.phone); return r })
          // Remove duplicates
          var phones = phones.map(p => p.phone)
          records = records.filter(r => {
            const known = phones.includes(r.phone)
            phones.push(r.phone)
            return !known
          })
          // Remove empty lines
          records = records.filter(r => Object.values(r).some(v => v))
          // Check records with empty mandatory data_fields
          const invalid_records = records.filter(r => schema_required.some(field => !r[field]))
          if (invalid_records.length>0) {
            throw new Error(`Champs obligatoires vides dans ${JSON.stringify(invalid_records)}`)
          }

          const counts=records.reduce((json, prospect) => ({...json, [prospect.phone]: (json[prospect.phone] | 0) + 1}), {})
          const duplicates = Object.keys(counts).filter(k => counts[k]>1)
          if (duplicates.length>0) {
            throw new Error(`Pas d'import, numéros dupliqués dans le fichier:${duplicates.join('\n')}`)
          }

          const after = records.length
          const delta=before-after

          req.context.getModel('Prospect').insertMany(records, {silent: true})
            .then(() => res.json(`${after}/${before} prospects importés après suppression des ${delta} doublons ou lignes vides`))
            .catch(err => {
              console.log('error')
              throw err
            })
        })
        .catch(err => {
          console.error(err)
          res.status(404).json({errors: err.message})
        })
    }
  })
})

// @Route GET /myAlfred/api/admin/prospect/tocontact
// View all billings system
// @Access public
router.get('/prospect/tocontact/:category', (req, res) => {
  let result = []
  req.context.getModel('Prospect').find(
    {$and: [{category: req.params.category}, {$or: [{contacted: false}, {contacted: null}]}]},
  )
    .sort({category: 1})
    .then(prospects => {
      req.context.getModel('Prospect').updateMany(
        {$and: [{category: req.params.category}, {$or: [{contacted: false}, {contacted: null}]}]},
        {contacted: true},
      )
        .then(dummy => {
          prospects.forEach(p => {
            data = []
            data.push(`="${p.phone.replace(/^0/, '+33')}"`)
            data.push(`${p.category }/${ p.keywords}`)
            data.push(p.name)
            data.push(p.city)
            data.push(p.zip_code)
            result.push(data.join(';'))
          })
          const filename = `export_${req.params.category}_${moment().format('DDMMYYHHmm')}.csv`
          res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
          res.set('Content-Disposition', `attachment; filename="${filename}"`)
          res.send(result.join('\n'))
        })
    })
    .catch()
})


// @Route POST /myAlfred/api/admin/kyc_validate/:alfred_id
// Get all prospect
// @Access private
router.post('/kyc_validate/:alfred_id', passport.authenticate('admin', {session: false}), (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const decode = jwt.decode(token)
  const admin = decode.is_admin

  if (admin) {
    req.context.getModel('User').findOne({_id: mongoose.Types.ObjectId(req.params.alfred_id)})
      .then(user => {
        addIdIfRequired(user)
        res.json(result)
      })
      .catch(err => {
        console.error(err)
        res.status(404).json({prospects: 'Error'})
      })

  }
  else {
    res.status(403).json({prospects: 'Access denied'})
  }
})

router.get('/context', (req, res) => {
  res.json(get_token(req))
})

passport.authenticate('admin', {session: false}),
module.exports = router
