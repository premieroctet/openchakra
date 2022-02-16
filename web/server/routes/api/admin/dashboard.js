const Prestation = require('../../../models/Prestation');
const Service = require('../../../models/Service');
const Equipment = require('../../../models/Equipment');
const Category = require('../../../models/Category');
const Job = require('../../../models/Job');
const FilterPresentation = require('../../../models/FilterPresentation');
const ServiceUser = require('../../../models/ServiceUser');
const moment = require('moment');
const { BOOK_STATUS } = require('../../../../utils/consts');
const { mangoApi } = require('../../../utils/mangopay');
const Review = require('../../../models/Review')
const EventLog = require('../../../models/EventLog')
const Commission = require('../../../models/Commission')
const Company = require('../../../models/Company')
const UIConfiguration = require('../../../models/UIConfiguration')
const Booking = require('../../../models/Booking')
const {IMAGE_FILTER, createDiskMulter} = require('../../../utils/filesystem')
const {isValid} = require('date-fns')
const User = require('../../../models/User')
const Billing = require('../../../models/Billing')
const {getRegisterCode}=require('../../../utils/register')
const {sendRegisterInvitation}=require('../../../utils/mailing')
const {EDIT_PROFIL}=require('../../../../utils/i18n')
const {hasRefs}=require('../../../utils/database')
const {getIdentifiers, getKeys, getQueries}=require('../../../utils/i18n_extraction')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const validateBillingInput = require('../../../validation/billing')
const {validateCompanyProfile} = require('../../../validation/simpleRegister')
const validatePrestationInput = require('../../../validation/prestation')
const validateRegisterAdminInput = require('../../../validation/registerAdmin')
const validateCategoryInput = require('../../../validation/category')
const validateServiceInput = require('../../../validation/service')
const {addIdIfRequired} = require('../../../utils/mangopay')
const {normalize} = require('../../../../utils/text')
const {counterArray} = require('../../../../utils/converters')
const {ADMIN} = require('../../../../utils/consts')
const axios = require('axios')
const {computeUrl}=require('../../../../config/config')
const {get_token, send_cookie, get_logged_id}=require('../../../utils/serverContext')
const {createUIConfiguration} = require('../../../utils/ui_generation')
const {logEvent}=require('../../../utils/events')
const Validator = require('validator')
const lodash=require('lodash')

// Upload multers
// CATEGORY
const uploadCat = createDiskMulter('static/category/', IMAGE_FILTER)
// EQUIPMENT
const uploadEquipment = createDiskMulter('static/equipments/', IMAGE_FILTER)
// SERVICE
const uploadService = createDiskMulter('static/service/', IMAGE_FILTER)
// PRESTATION
const uploadPrestation = createDiskMulter('static/prestation/', IMAGE_FILTER)
// UI CUSTOM
const uploadCustom = createDiskMulter('static/custom/', IMAGE_FILTER)


// @Route POST /myAlfred/api/admin/billing/all
// Add billing for prestation
// @Access private
router.post('/billing/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid}=validateBillingInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Billing.findOne({label: req.body.label})
    .then(billing => {
      if (billing) {
        errors.label = 'Cette méthode de facturation existe déjà'
        return res.status(400).json(errors)
      }

      const newBilling={
        label: req.body.label,
      }

      Billing.create(newBilling)
        .then(billing => res.json(billing))
        .catch(err => console.error(err))
    })
})

// @Route GET /myAlfred/api/admin/billing/all
// View all billings system
// @Access private
router.get('/billing/all', passport.authenticate('admin', {session: false}), (req, res) => {
  Billing.find()
    .sort({label: 1})
    .then(billings => {
      res.json(billings)
    })
    .catch(() => res.status(404).json({billing: 'No billing found'}))
})

// @Route GET /myAlfred/api/admin/billing/all/:id
// View one billings system
// @Access private
router.get('/billing/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Billing.findById(req.params.id)
    .then(billing => {
      if (!billing) {
        return res.status(400).json({msg: 'No billing found'})
      }
      res.json(billing)

    })
    .catch(() => res.status(404).json({billing: 'No billing found'}))
})

// @Route DELETE /myAlfred/api/admin/billing/:id
// Delete one billing system
// @Access private
router.delete('/billing/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Promise.all(['Prestation.billing', 'ServiceUser.billing'].map(f => hasRefs(req, f, req.params.id)))
    .then(refs => {
      if (refs.some(t => t)) {
        return res.status(400).json('Cette méthode de facturation est utilisée')
      }
      Billing.findByIdAndRemove(req.params.id)
        .then(() => res.json({success: true}))
        .catch(() => res.status(404).json({billingnotfound: 'No billing found'}))
    })
})

// @Route PUT /myAlfred/api/admin/billing/all/:id
// Update a billing system
// @Access private
router.put('/billing/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Billing.findByIdAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
    .then(billing => {
      res.json(billing)
    })
    .catch(() => res.status(404).json({billingnotfound: 'No billing found'}))
})

// USERS

// @Route GET /myAlfred/api/admin/users/all
// List all users
router.get('/users/all', passport.authenticate('admin', {session: false}), (req, res) => {
  User.find({}, 'firstname name email is_alfred is_admin id_mangopay mangopay_provider_id creation_date birthday billing_address phone comment hidden')
    .populate({path: 'shop', select: 'creation_date'})
    .sort({creation_date: -1})
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({user: 'No users found'})
    })
})

// @Route PUT /myAlfred/api/admin/users/:user_id
// List all users
router.put('/users/:user_id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.params.user_id, req.body)
    .then(() => {
      res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({user: 'No users found'})
    })
})

// @Route GET /myAlfred/api/admin/serviceusers/all
// List all serviuceusers
router.get('/serviceusers/all', passport.authenticate('jwt', {session: false}), (req, res) => {
  ServiceUser.find({}, '_id perimeter location service_address.zip_code service_address.city travel_tax')
    .populate({path: 'service', select: 'label category picture', populate: {path: 'category', select: 'label'}})
  // .populate('service.category', 'label')
    .populate({path: 'user', select: 'email shop', populate: {path: 'shop', select: 'is_professional'}})
    .then(services => {
      res.json(services)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({user: 'No services found'})
    })
})

// @Route GET /myAlfred/api/admin/users/all_light
// List all users (firstname, name, email)
router.get('/users/all_light', passport.authenticate('admin', {session: false}), (req, res) => {
  User.find({active: true}, 'firstname name email roles')
    .sort({name: 1})
    .then(user => {
      if (!user) {
        res.status(400).json({msg: 'No users found'})
      }
      res.json(user)
    })
    .catch(() => res.status(404).json({user: 'No users found'}))
})

// @Route GET /myAlfred/api/admin/serviceUsersMap
// View all service per user for map view (light)
// @Access private
router.get('/serviceUsersMap', passport.authenticate('admin', {session: false}), (req, res) => {

  ServiceUser.find({}, '_id service_address.gps')
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

  const email = req.body.username
  const role = req.body.role

  // Find user by email
  User.findOne({email})
    .populate('shop', 'is_particular')
    .then(user => {
      // Check for user
      if (!user) {
        errors = `Pas d'utilisateur connu avec l'email ${email}`
        return res.status(400).json(errors)
      }

      if (user.active) {
        send_cookie(user, role, res, req.user._id)
        logEvent(req, 'Administration', 'Connexion en tant que',
          `Connexion en tant que ${user.full_name}(${user._id})`,
        )
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
  User.find({is_admin: false, is_alfred: false})
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
})

// @Route GET /myAlfred/api/admin/users/users/:id
// Get one user
router.get('/users/users/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findById(req.params.id)
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
})

// @Route PUT /myAlfred/api/admin/users/users/:id
// Update a user
// @Access private
router.put('/users/users/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {$set: {active: req.body.active}}, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({usernotfound: 'No user found'})
    })
})

// @Route PUT /myAlfred/api/admin/users/users/idCard/:id
// Validate id card for a user
// @Access private
router.put('/users/users/idCard/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: true}}, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({usernotfound: 'No user found'})
    })
})

// @Route PUT /myAlfred/api/admin/users/users/idCard/delete:id
// Delete id card for a user
// @Access private
router.put('/users/users/idCard/delete/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: false}}, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(() => res.status(404).json({usernotfound: 'No user found'}))
})

// @Route DELETE /myAlfred/api/admin/users/users/:id
// Delete one user
// @Access private
router.delete('/users/users/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  return res.status(400).json('Ne peut supprimer un utilisateur')
  /** TODO Check consistency before removing
  User.findById(req.params.id)
    .then(user => {
      user.remove().then(() => res.json({success: true}))
    })
    .catch(() => res.status(404).json({user: 'No user found'}))
  */
})

// @Route GET /myAlfred/api/admin/users/alfred
// List all alfred
router.get('/users/alfred', passport.authenticate('admin', {session: false}), (req, res) => {
  User.find({is_alfred: true})
    .sort({name: 1})
    .then(user => {
      if (!user) {
        res.status(400).json({msg: 'No alfred found'})
      }

      res.json(user)
    })
    .catch(() => res.status(404).json({alfred: 'No alfred found'}))
})

// @Route GET /myAlfred/api/admin/users/alfred/:id
// Get one alfred
router.get('/users/alfred/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No user found'})
      }
      res.json(user)

    })
    .catch(() => res.status(404).json({user: 'No user found'}))
})

// @Route PUT /myAlfred/api/admin/users/alfred/:id
// Update an alfred
// @Access private
router.put('/users/alfred/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {
    $set: {
      is_alfred: req.body.is_alfred,
      active: req.body.active,
      super_alfred: req.body.super_alfred,
    },
  }, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(() => res.status(404).json({usernotfound: 'No user found'}))
})

// @Route PUT /myAlfred/api/admin/users/alfred/idCard/:id
// Validate id card for an alfred
// @Access private
router.put('/users/alfred/idCard/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: true}}, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(() => res.status(404).json({usernotfound: 'No user found'}))
})

// @Route PUT /myAlfred/api/admin/users/alfred/idCard/delete:id
// Delete id card for an alfred
// @Access private
router.put('/users/alfred/idCard/delete/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {$set: {id_confirmed: false}}, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(() => res.status(404).json({usernotfound: 'No user found'}))
})

// @Route DELETE /myAlfred/api/admin/users/alfred/:id
// Delete one alfred
// @Access private
router.delete('/users/alfred/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.remove().then(() => res.json({success: true}))
    })
    .catch(() => res.status(404).json({user: 'No user found'}))
})

// @Route GET /myAlfred/api/admin/users/admin
// List all admin
// @Access private and for admin only
router.get('/users/admin', passport.authenticate('admin', {session: false}), (req, res) => {
  User.find({is_admin: true})
    .sort({name: 1})
    .then(user => {
      if (!user) {
        res.status(400).json({msg: 'No admin found'})
      }

      res.json(user)
    })
    .catch(() => res.status(404).json({admin: 'No admin found'}))
})

// @Route GET /myAlfred/api/admin/users/admin/:id
// Get one admin
// @Access private and for admin only
router.get('/users/admin/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No user found'})
      }
      res.json(user)

    })
    .catch(() => res.status(404).json({user: 'No user found'}))
})

// @Route POST /myAlfred/api/admin/users/admin
// Add an admin
// @Access private and for admin only
router.post('/users/admin', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateRegisterAdminInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({email: req.body.email, is_admin: true})
    .then(user => {
      if (user) {
        errors.email = EDIT_PROFIL.duplicate_email
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
      bcrypt.genSalt(10, (_, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err
          }
          newUser.password = hash
          User.create(newUser)
            .then(user => res.json(user))
            .catch(err => console.error(err))
        })
      })
    })
})


// @Route PUT /myAlfred/api/admin/users/admin/:id
// Update an admin
// @Access private
router.put('/users/admin/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOneAndUpdate({_id: req.params.id}, {
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
    .catch(() => res.status(404).json({usernotfound: 'No user found'}))
})

router.put('/users/:user_id/admin/:admin_status', passport.authenticate('admin', {session: false}), (req, res) => {
  if (!['true', 'false'].includes(req.params.admin_status)) {
    return res.status(404).json('Statut admin true/false attendu')
  }
  if (req.params.user_id==get_logged_id(req)) {
    return res.status(404).json('Vous ne pouvez pas vous retirer le statut d\'administrateur')
  }
  const set_admin = req.params.admin_status=='true'
  User.findOneAndUpdate({_id: req.params.user_id}, {is_admin: set_admin})
    .then(() => {
      res.json()
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/users/:user_id/hidden/:hidden_status', passport.authenticate('admin', {session: false}), (req, res) => {
  if (!['true', 'false'].includes(req.params.hidden_status)) {
    return res.status(404).json('Statut hidden true/false attendu')
  }
  const set_hidden = req.params.hidden_status=='true'
  User.findByIdAndUpdate(req.params.user_id, {hidden: set_hidden})
    .then(() => {
      res.json()
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// @Route DELETE /myAlfred/api/admin/users/admin/:id
// Delete one admin
// @Access private
router.delete('/users/admin/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  return res.status(400).json('Ne peut supprimer un administrateur')
  /**  TODO Check consistency before removing
  User.findById(req.params.id)
    .then(user => {
      user.remove().then(() => res.json({success: true}))
    })
    .catch(() => res.status(404).json({user: 'No user found'}))
  */
})
// FILTER PRESENTATION

// @Route POST /myAlfred/api/admin/filterPresentation/all
// Add filterPresentation for prestation
// @Access private
router.post('/filterPresentation/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  FilterPresentation.findOne({label: req.body.label})
    .then(filterPresentation => {
      if (filterPresentation) {
        errors.label = 'Ce filtre existe déjà'
        return res.status(400).json(errors)
      }
      const newFilterPresentation={
        label: req.body.label,
      }

      FilterPresentation.create(newFilterPresentation)
        .then(filterPresentation => res.json(filterPresentation))
        .catch(err => console.error(err))
    })
})

// @Route GET /myAlfred/api/admin/filterPresentation/all
// View all filterPresentation
// @Access private
router.get('/filterPresentation/all', passport.authenticate('admin', {session: false}), (req, res) => {
  FilterPresentation.find()
    .sort({label: 1})
    .then(filterPresentation => {
      if (!filterPresentation) {
        return res.status(400).json({msg: 'No filterPresentation found'})
      }
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      res.setHeader('X-Total-Count', filterPresentation.length)
      res.json(filterPresentation)

    })
    .catch(() => res.status(404).json({filterPresentation: 'No billing found'}))
})

// @Route GET /myAlfred/api/admin/filterPresentation/all/:id
// View one filterPresentation
// @Access private
router.get('/filterPresentation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  FilterPresentation.findById(req.params.id)
    .then(filterPresentation => {
      if (!filterPresentation) {
        return res.status(400).json({msg: 'No filterPresentation found'})
      }
      res.json(filterPresentation)

    })
    .catch(() => res.status(404).json({billing: 'No filterPresentation found'}))
})

// @Route DELETE /myAlfred/api/admin/filterPresentation/all/:id
// Delete one filterPresentation
// @Access private
router.delete('/filterPresentation/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Promise.all(['Prestation.filter_presentation'].map(f => hasRefs(req, f, req.params.id)))
    .then(refs => {
      if (refs.some(t => t)) {
        return res.status(400).json('Ce filtre de présentation est utilisé')
      }
      FilterPresentation.findByIdAndRemove(req.params.id)
        .then(() => res.json({success: true}))
        .catch(() => res.status(404).json({filterPresentation: 'No filterPresentation found'}))
    })
})

// @Route PUT /myAlfred/api/admin/filterPresentation/all/:id
// Update a filterPresentation
// @Access private
router.put('/filterPresentation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  FilterPresentation.findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
    .then(filterPresentation => {
      res.json(filterPresentation)
    })
    .catch(() => res.status(404).json({filterPresentationnotfound: 'No filterPresentation found'}))
})

// JOB

// @Route POST /myAlfred/api/admin/job/all
// Add job for prestation
// @Access private
router.post('/job/all', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Job.findOne({label: req.body.label})
    .then(job => {
      if (job) {
        errors.label = 'Ce métier existe déjà'
        return res.status(400).json(errors)
      }
      const newJob={
        label: req.body.label,
      }

      Job.create(newJob)
        .then(job => res.json(job))
        .catch(err => console.error(err))
    })
})

// @Route GET /myAlfred/api/admin/job/all
// View all job
// @Access private
router.get('/job/all', passport.authenticate('admin', {session: false}), (req, res) => {
  Job.find()
    .sort({label: 1})
    .then(job => {
      if (!job) {
        return res.status(400).json({msg: 'No job found'})
      }
      res.json(job)

    })
    .catch(() => res.status(404).json({job: 'No billing found'}))
})

// @Route GET /myAlfred/api/admin/job/all/:id
// View one job
// @Access private
router.get('/job/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Job.findById(req.params.id)
    .then(job => {
      if (!job) {
        return res.status(400).json({msg: 'No job found'})
      }
      res.json(job)

    })
    .catch(() => res.status(404).json({billing: 'No job found'}))
})

// @Route DELETE /myAlfred/api/admin/job/all/:id
// Delete one job
// @Access private
router.delete('/job/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Promise.all(['Prestation.job'].map(f => hasRefs(req, f, req.params.id)))
    .then(refs => {
      if (refs.some(t => t)) {
        return res.status(400).json('Ce métier est utilisé')
      }
      Job.findByIdAndRemove(req.params.id)
        .then(() => res.json({success: true}))
        .catch(() => res.status(404).json({job: 'No job found'}))
    })
})

// @Route PUT /myAlfred/api/admin/job/all/:id
// Update a job
// @Access private
router.put('/job/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Job.findOneAndUpdate({_id: req.params.id}, {$set: {label: req.body.label}}, {new: true})
    .then(job => {
      res.json(job)
    })
    .catch(() => res.status(404).json({jobnotfound: 'No job found'}))
})

// @Route POST /myAlfred/api/admin/category/all
// Add category for prestation
// @Access private
router.post('/category/all', uploadCat.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateCategoryInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Category.findOne({label: req.body.label})
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
      }

      Category.create(newCategory)
        .then(category => res.json(category))
        .catch(err => console.error(err))

    })
})

// @Route POST /myAlfred/api/admin/category/editPicture/:id
// Edit the picture of a category
// @Access private
router.put('/category/editPicture/:id', uploadCat.fields([
  {name: 'particular_picture', maxCount: 1},
  {name: 'professional_picture', maxCount: 1}]),
passport.authenticate('admin', {session: false}), (req, res) => {

  let attributes = {}
  if (req.files.particular_picture) {
    attributes.particular_picture = req.files.particular_picture[0].path
  }
  if (req.files.professional_picture) {
    attributes.professional_picture = req.files.professional_picture[0].path
  }
  Category.findByIdAndUpdate(req.params.id, attributes, {new: true})
    .then(category => {
      res.json(category)
    })
})

// @Route GET /myAlfred/api/admin/category/all
// View all categories
// @Access private
router.get('/category/all', passport.authenticate('admin', {session: false}), (req, res) => {
  Category.find()
    .sort({'label': 1})
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
})

// @Route GET /myAlfred/api/admin/category/all/:id
// View one category
// @Access private
router.get('/category/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      if (!category) {
        return res.status(400).json({msg: 'No category found'})
      }
      res.json(category)

    })
    .catch(() => res.status(404).json({billing: 'No category found'}))
})

// @Route DELETE /myAlfred/api/admin/category/all/:id
// Delete one category
// @Access private
router.delete('/category/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Promise.all(['Service.category', 'Prestation.category'].map(f => hasRefs(req, f, req.params.id)))
    .then(refs => {
      if (refs.some(t => t)) {
        return res.status(400).json('Cette catégorie est utilisée')
      }
      Category.findByIdAndRemove(req.params.id)
        .then(() => res.json())
        .catch(() => res.status(404).json({category: 'No category found'}))
    })
})

// @Route PUT /myAlfred/api/admin/category/all/:id
// Update a category
// @Access private
router.put('/category/all/:id?', passport.authenticate('admin', {session: false}), (req, res) => {

  let attributes={
    particular_label: req.body.particular_label,
    s_particular_label: normalize(req.body.particular_label),
    professional_label: req.body.professional_label,
    s_professional_label: normalize(req.body.professional_label),
    description: req.body.description,
  }
  const promise=req.params.id ?
    Category.findByIdAndUpdate(req.params.id, attributes, {new: true})
    :
    Category.create(attributes)
  promise
    .then(category => {
      res.json(category)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({categorynotfound: 'No category found'})
    })
})

// @Route POST /myAlfred/api/admin/equipment/all
// Add equipment for service
// @Access private
router.post('/equipment/all', uploadEquipment.single('logo'), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateBillingInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Equipment.findOne({label: req.body.label})
    .then(equipment => {
      if (equipment) {
        errors.label = 'Cet équipement existe déjà '
        return res.status(400).json(errors)
      }
      const newEquipment={
        label: req.body.label,
        logo: req.file.originalname,
      }

      Equipment.create(newEquipment)
        .then(equipment => res.json(equipment))
        .catch(err => console.error(err))
    })
})

// @Route PUT /myAlfred/api/admin/equipment/all/:id
// Update a equipment system
// @Access private
router.put('/equipment/all/:id', uploadEquipment.single('logo'), passport.authenticate('admin', {session: false}), (req, res) => {
  let data={label: req.body.label}
  if (req.file && req.file.path) {
    data.logo=req.file.originalname
  }
  console.log(JSON.stringify(req.file))
  Equipment.findOneAndUpdate({_id: req.params.id}, {$set: data}, {new: true})
    .then(equipment => {
      res.json(equipment)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({equipmentnotfound: 'No equipment found'})
    })
})

// @Route GET /myAlfred/api/admin/equipment/all
// View all equipments
// @Access private
router.get('/equipment/all', passport.authenticate('admin', {session: false}), (req, res) => {
  Equipment.find()
    .sort({label: 1})
    .then(equipment => {
      if (!equipment) {
        return res.status(400).json({msg: 'No equipment found'})
      }
      res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count')
      res.setHeader('X-Total-Count', equipment.length)
      res.json(equipment)

    })
    .catch(err => {
      console.error(err)
      res.status(404).json({equipment: 'No equipment found'})
    })
})

// @Route GET /myAlfred/api/admin/equipment/all/:id
// View one equipments
// @Access private
router.get('/equipment/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Equipment.findById(req.params.id)
    .then(equipment => {
      if (!equipment) {
        return res.status(400).json({msg: 'No equipment found'})
      }
      res.json(equipment)

    })
    .catch(err => {
      console.error(err)
      res.status(404).json({equipment: 'No equipment found'})
    })
})

// @Route DELETE /myAlfred/api/admin/equipment/all/:id
// Delete one equipment system
// @Access private
router.delete('/equipment/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Promise.all(['Booking.equipments', 'Service.equipments', 'ServiceUser.equipments'].map(f => hasRefs(req, f, req.params.id)))
    .then(refs => {
      if (refs.some(t => t)) {
        return res.status(400).json('Cet équipement est utilisé')
      }
      Equipment.findByIdAndRemove(req.params.id)
        .then(() => res.json({success: true}))
        .catch(err => {
          console.error(err)
          res.status(404).json({equipmentnotfound: 'No equipment found'})
        })
    })
})

// @Route POST /myAlfred/api/admin/service/all
// Add service for prestation
// @Access private
router.post('/service/all', uploadService.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Service.findOne({label: req.body.label})
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

      Service.create(newService)
        .then(service => res.json(service))
        .catch(err => console.error(err))
    })
})

// @Route POST /myAlfred/api/admin/service/editPicture/:id
// Edit picture
// @Access private
router.post('/service/editPicture/:id', uploadService.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  Service.findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
    .then(service => {
      res.json(service)
    })
})

// @Route GET /myAlfred/api/admin/service/all
// View all service
// @Access private
router.get('/service/all', passport.authenticate('admin', {session: false}), (req, res) => {

  Service.find()
    .sort({'label': 1})
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
})

// @Route GET /myAlfred/api/admin/service/all/:id
// View one service
// @Access private
router.get('/service/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Service.findById(req.params.id)
    .populate('equipments')
    .populate('category')
    .then(service => {
      if (!service) {
        return res.status(400).json({msg: 'No service found'})
      }
      res.json(service)

    })
    .catch(err => {
      console.error(err)
      res.status(404).json({billing: 'No service found'})
    })
})

// @Route DELETE /myAlfred/api/admin/service/all/:id
// Delete one service
// @Access private
router.delete('/service/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Promise.all(['Prestation.service', 'ServiceUser.service'].map(f => hasRefs(req, f, req.params.id)))
    .then(refs => {
      if (refs.some(t => t)) {
        return res.status(400).json('Ce service est utilisé')
      }
      Service.findByIdAndRemove(req.params.id)
        .then(() => res.json({success: true}))
        .catch(() => res.status(404).json({service: 'No service found'}))
    })
})

// @Route PUT /myAlfred/api/admin/service/all/:id
// Update a service
// @Access private
router.put('/service/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validateServiceInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Service.findByIdAndUpdate({_id: req.params.id},
    {
      $set: {
        label: req.body.label, equipments: req.body.equipments, category: mongoose.Types.ObjectId(req.body.category),
        s_label: normalize(req.body.label),
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
        Prestation.updateMany({service: service._id}, {$set: updates})
          .then(res => console.log(`Prestations updated:${JSON.stringify(res)}`))
          .catch(err => console.error(`Prestations update error:${err}`))
      }
      res.json(null)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({servicenotfound: 'No service found'})
    })
})


// @Route POST /myAlfred/api/admin/prestation/all
// Add a prestation
// @Access private
router.post('/prestation/all', uploadPrestation.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validatePrestationInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Prestation.findOne({
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
        category: null,
        job: req.body.job,
        description: req.body.description,
        // picture: req.body.picture.path,
        picture: req.file ? req.file.path : null,
        cesu_eligible: req.body.cesu_eligible,
        professional_access: req.body.professional_access,
        particular_access: req.body.particular_access,
        private_company: req.body.private_company,
        order: req.body.order ? parseInt(req.body.order) : 1,
        company_price: req.body.company_price && req.body.private_company ? parseInt(req.body.company_price) : 0,
      }

      Prestation.create(newPrestation)
        .then(prestation => res.json(prestation))
        .catch(err => res.status(400).json(err))
    })
})

// @Route POST /myAlfred/api/admin/prestation/editPicture/:id
// Edit picture
// @Access private
router.post('/prestation/editPicture/:id', uploadPrestation.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  Prestation.findByIdAndUpdate(req.params.id, {picture: req.file.path}, {new: true})
    .then(prestation => {
      res.json(prestation)
    })
})

// @Route GET /myAlfred/api/admin/prestation/all
// Get all prestations
// @Access public
router.get('/prestation/all', passport.authenticate('admin', {session: false}), (req, res) => {
  Prestation.find({}, 'label cesu_eligible particular_access professional_access order')
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
    .catch(() => res.status(404).json({billing: 'No prestation found'}))
})

// @Route GET /myAlfred/api/admin/prestation/all/:id
// View one prestation
// @Access public
router.get('/prestation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Prestation.findById(req.params.id)
    .populate('service')
    .populate('billing')
    .populate('filter_presentation')
    .populate('category')
    .populate('job')
    .then(prestation => {
      if (!prestation) {
        return res.status(400).json({msg: 'No prestation found'})
      }
      res.json(prestation)

    })
    .catch(() => res.status(404).json({prestation: 'No prestation found'}))
})

// @Route DELETE /myAlfred/api/admin/prestation/all/:id
// Delete one prestation
// @Access private
router.delete('/prestation/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Promise.all(['ServiceUser.prestations.prestation'].map(f => hasRefs(req, f, req.params.id)))
    .then(refs => {
      if (refs.some(t => t)) {
        return res.status(400).json('Cette prestation est utilisée')
      }
      Prestation.findByIdAndRemove(req.params.id)
        .then(() => res.json({success: true}))
        .catch(() => res.status(404).json({prestationnotfound: 'No prestation found'}))
    })
})

// @Route PUT /myAlfred/api/admin/prestation/all/:id
// Update a prestation
// @Access private
router.put('/prestation/all/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  const {errors, isValid} = validatePrestationInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  Prestation.findOneAndUpdate({_id: req.params.id}, {
    $set: {
      label: req.body.label,
      s_label: normalize(req.body.label),
      price: req.body.price,
      service: mongoose.Types.ObjectId(req.body.service),
      billing: req.body.billing,
      filter_presentation: mongoose.Types.ObjectId(req.body.filter_presentation),
      category: mongoose.Types.ObjectId(req.body.service.category),
      job: req.body.job ? mongoose.Types.ObjectId(req.body.job) : null,
      description: req.body.description,
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
})

// TODO: récupérer en sum/aggréation par mois
router.get('/registrations', passport.authenticate('admin', {session: false}), (req, res) => {
  User.find({}, 'creation_date')
    .sort({creation_date: 1})
    .then(users => {
      const monthDates = users.map(user => new Date(user.creation_date.getFullYear(), user.creation_date.getMonth()).getTime())
      const counts = counterArray(monthDates, 'x', 'y')
      res.json(counts)
    })
})

// TODO: récupérer en sum/aggréation par age
router.get('/ages', passport.authenticate('admin', {session: false}), (req, res) => {

  const get_label = age => {
    if (age<=25) { return '<25' }
    else if (age>=55) { return '>55' }

    step=Math.floor((age-25)/10)
    label = `${step*10+25}>${(step+1)*10+25}`
    return label

  }

  const alfred = JSON.parse(req.query.alfred || 'false')
  const fltr = alfred ? {is_alfred: true} : {}
  User.find(fltr, 'birthday')
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
router.get('/statistics', passport.authenticate('admin', {session: false}), (req, res) => {
  let stats = {}
  User.count()
    .then(nb_users => {
      stats.users = nb_users
      User.find({is_alfred: true}).count()
        .then(nb_alfred => {
          stats.alfred = nb_alfred
          ServiceUser.find()
            .then(services => {
              stats.services = services.length
              stats.prestations = services.map(s => s.prestations.length).reduce((acc, value) => acc + value)
              res.json(stats)
            })
            .catch(() => res.status(404).json({statistics: 'Error on alfred'}))
        })
        .catch(() => res.status(404).json({statistics: 'Error on alfred'}))
    })
    .catch(() => res.status(404).json({statistics: 'Error on users'}))

})

// @Route GET /myAlfred/api/admin/booking/all
// Get all bookings
// @Access private
router.get('/bookings', passport.authenticate('admin', {session: false}), (req, res) => {
  Booking.find()
    .populate('alfred', 'firstname name')
    .populate('user', 'firstname name email phone')
    .populate({path: 'customer_booking', populate: {path: 'user'}})
    .sort({date: -1})
    .then(bookings => {
      console.log(`Typeof booking.prestation_date:${typeof bookings[0].prestation_date}`)
      res.json(bookings)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({bookings: 'Error'})
    })
})

// companies

// @Route GET /myAlfred/api/admin/companies
// View all companies
// @Access private
router.get('/companies', passport.authenticate('admin', {session: false}), (req, res) => {

  Company.find()
    .sort({'name': 1})
    .lean()
    .then(companies => {
      if (!companies) {
        return res.status(400).json({msg: 'No company found'})
      }
      User.find({company: {$exists: true, $ne: null}}, 'company')
        .then(users => {
          companies.forEach(company => {
            company.employees = users.filter(u => u.company.toString() == company._id.toString()).length
          })
          res.json(companies)
        })
    })
    .catch(() => res.status(404).json({company: 'No company found'}))
})

// @Route GET /myAlfred/api/admin/companies/:id
// View one company
// @Access private
router.get('/companies/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  Company.findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(400).json({msg: 'No company found'})
      }
      res.json(company)

    })
})

// @Route GET /myAlfred/api/admin/companies/:id/users
// View company users
// @Access private
router.get('/companies/:id/users', passport.authenticate('admin', {session: false}), (req, res) => {
  User.find({company: req.params.id}, 'firstname name email roles')
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

  Company.findOne({name: req.body.name})
    .then(company => {
      if (company && company._id != req.body._id) {
        return res.status(400).json({error: 'Cette entreprise existe déjà'})
      }
      const promise=req.body._id ? Company.findByIdAndUpdate(req.body._id, req.body, {new: true})
        :
        Company.create(req.body)
      promise
        .then(company => {
          if (!company) {
            return res.status(400).json({msg: 'No company found'})
          }
          if (req.body.admin_email) {
            User.findOne({email: req.body.admin_email})
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
                bcrypt.genSalt(10, (_, salt) => {
                  bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                      throw err
                    }
                    newUser.password = hash
                    User.create(newUser)
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

// @Route POST /myAlfred/api/admin/kyc_validate/:alfred_id
// Validate KYC
// @Access private
router.post('/kyc_validate/:alfred_id', passport.authenticate('admin', {session: false}), (req, res) => {
  User.findOne({_id: mongoose.Types.ObjectId(req.params.alfred_id)})
    .then(user => {
      addIdIfRequired(user)
      res.json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({err})
    })

})

router.get('/context', passport.authenticate('admin', {session: false}), (req, res) => {
  res.json(get_token(req))
})

router.get('/uiConfiguration', passport.authenticate('admin', {session: false}), (req, res) => {
  UIConfiguration.find()
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.post('/uiConfiguration/generate', passport.authenticate('admin', {session: false}), (req, res) => {
  UIConfiguration.find()
    .then(config => {
      createUIConfiguration(config)
      res.json('ok')
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

router.put('/uiConfiguration/:id/:att/picture', uploadCustom.single('picture'), passport.authenticate('admin', {session: false}), (req, res) => {
  UIConfiguration.findById(req.params.id)
    .then(config => {
      const att=config.attributes.find(att => att.name==req.params.att)
      if (att) {
        att.value=req.file.path
      }
      else {
        config.attributes.push({name: req.params.att, value: reqf.file.path})
      }
      config.save()
        .then(config => {
          res.json(config)
        })
        .catch(err => {
          console.error(err)
          res.status(500).json(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.put('/uiConfiguration/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  // Hide "file" attributes
  req.body.attributes.forEach(a => {
    if (typeof a.value == 'object') {
      a.value=null
    }
  })
  UIConfiguration.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.get('/i18n-keys', (req, res) => {
  let keys=getKeys()
  res.send(keys.join('\n'))
})

router.get('/i18n-items', (req, res) => {
  let ids=getIdentifiers()
  res.send(ids.join('\n'))
})

router.get('/i18n-queries', (req, res) => {
  let ids=getQueries()
  res.send(ids.join('\n'))
})

router.get('/commissions', passport.authenticate('admin', {session: false}), (req, res) => {
  Commission.find()
    .then(result => res.json(result))
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.post('/commissions', passport.authenticate('admin', {session: false}), (req, res) => {
  Commission.create(req.body)
    .then(commission => {
      res.json(commission)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.put('/commissions/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  console.log(`put:${req.params.id}:${JSON.stringify(req.body)}`)
  Commission.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
    .then(custo => {
      res.json(custo)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.delete('/commissions/:id', passport.authenticate('admin', {session: false}), (req, res) => {
  console.log(`delete:${req.params.id}`)
  Commission.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.get('/reviews', passport.authenticate('admin', {session: false}), (req, res) => {
  Review.find()
    .populate('alfred', 'firstname name')
    .populate('user', 'firstname name email phone')
    .populate({path: 'serviceUser', select: 'service', populate: {path: 'service', select: 'label'}})
    .then(reviews => {
      res.json(reviews)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/reviews/:review_id', passport.authenticate('admin', {session: false}), (req, res) => {
  Review.findByIdAndUpdate(req.params.review_id, req.body)
    .then(review => {
      res.json(review)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/eventlogs', passport.authenticate('admin', {session: false}), (req, res) => {
  EventLog.find()
    .populate('account.user')
    .populate('user', 'firstname name')
    .populate({path: 'serviceUser', select: 'service', populate: {path: 'service', select: 'label'}})
    .then(events => {
      res.json(events)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/register_invitation', passport.authenticate('admin', {session: false}), (req, res) => {
  const email=req.body.email
  console.log(`Register invitation for ${email}`)
  if (!(email && Validator.isEmail(email))) {
    return res.status(404).json("L'adresse email est invalide")
  }
  getRegisterCode(req, email)
    .then(code => {
      sendRegisterInvitation(req.user, email, code, req)
      return res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

router.get('/warnings', passport.authenticate('admin', {session: false}), (req, res) => {
  const warnings=[]
  Commission.count()
    .then(count => {
      if (count==0) {
        warnings.push("Aucune commission n'a été défnie")
      }
      return Company.count()
    })
    .then(count => {
      if (count==0) {
        warnings.push("Aucune compagnie n'a été défnie")
      }
      res.json(warnings)
    })
})

router.get('/fees', passport.authenticate('admin', {session: false}), (req, res) => {
  const startMoment=req.query.start_date && moment(parseInt(req.query.start_date)*1000).startOf('day')
  const endMoment=req.query.end_date && moment(parseInt(req.query.end_date)*1000).endOf('day')

  const REQUIRED_FIELDS='_id amount alfred.full_name user.full_name status service date_prestation_moment'.split(' ')

  const linkedPromise= (userData, childPromise) => {
    return new Promise((resolve, reject) => {
      childPromise
        .then(result => {
          result.userData=userData
          resolve(result)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  // const filter={$and: [{end_date: {$gt: startMoment}}, {end_date: {$lt: endMoment}}]}
  let filter={status: BOOK_STATUS.FINISHED}
  const criterions=[]
  if (startMoment) {
    criterions.push({end_date: {$gt: startMoment}})
  }
  if (endMoment) {
    criterions.push({end_date: {$lt: endMoment}})
  }
  if (criterions.length) {
    filter={...filter, $and: criterions}
  }
  Booking.find(filter)
    .populate('alfred', 'firstname name')
    .populate('user', 'firstname name')
    .then(bookings => {
      let mangoPromises=[]
      bookings.forEach(b => {
        mangoPromises=mangoPromises.concat([
          b.mangopay_payin_id && linkedPromise(b._id, mangoApi.PayIns.get(b.mangopay_payin_id)),
          b.mangopay_transfer_id && linkedPromise(b.id, mangoApi.Transfers.get(b.mangopay_transfer_id)),
          b.mangopay_payout_id && linkedPromise(b._id, mangoApi.PayOuts.get(b.mangopay_payout_id)),
        ]).filter(e => !!e)
      })
      Promise.allSettled(mangoPromises)
        .then(events => {
          events = events.filter(e => e.status=='fulfilled').map(e => e.value)
          events = events.filter(e => e.Fees && e.Fees.Amount
            && (!req.query.start_date || e.ExecutionDate >= parseInt(req.query.start_date))
            && (!req.query.end_date || e.ExecutionDate <= parseInt(req.query.end_date)),
          )
          bookings=bookings.map(booking => lodash.pick(booking, REQUIRED_FIELDS))
          events.forEach(event => {
            const booking=bookings.find(b => b._id.toString()==event.userData.toString())
            booking.commission = (booking.commission||0)+event.Fees.Amount/100.0
          })
          bookings = bookings.filter(b => b.commission)

          return res.json(bookings)
        })
        .catch(err => {
          console.error(err)
          res.json(err)
        })
    })
})

module.exports = router
