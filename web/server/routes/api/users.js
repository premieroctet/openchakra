const {getIO} = require('../../utils/socketIO')
const {getLocationSuggestions}=require('../../../utils/geo')
const User = require('../../models/User')
const ServiceUser = require('../../models/ServiceUser')
require('../../models/ResetToken')
const Album = require('../../models/Album')
const {REGISTER_WITHOUT_CODE}=require('../../../utils/context')
const {checkRegisterCodeValidity, setRegisterCodeUsed}=require('../../utils/register')
const {EDIT_PROFIL}=require('../../../utils/i18n')
const {logEvent}=require('../../utils/events')
const {IMAGE_FILTER, createDiskMulter} = require('../../utils/filesystem')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const {is_production, is_validation, computeUrl}=require('../../../config/config')
const CronJob = require('cron').CronJob
const {validateSimpleRegisterInput, validateEditProfile, validateEditProProfile, validateBirthday} = require('../../validation/simpleRegister')
const validateLoginInput = require('../../validation/login')
const {sendResetPassword, sendVerificationMail, sendVerificationSMS, sendB2BAccount, sendAlert} = require('../../utils/mailing')
const moment = require('moment')
const crypto = require('crypto')
const axios = require('axios')
const {ROLES}=require('../../../utils/consts')
const {mangoApi, addIdIfRequired, addRegistrationProof, createMangoClient, createMangoProvider, install_hooks} = require('../../utils/mangopay')
const {send_cookie}=require('../../utils/serverContext')
const gifFrames = require('gif-frames')
const fs = require('fs').promises
const lodash=require('lodash')

moment.locale('fr')

axios.defaults.withCredentials = true

const HOOK_TYPES = 'KYC_SUCCEEDED KYC_FAILED KYC_VALIDATION_ASKED'.split(' ')
install_hooks(HOOK_TYPES, '/myAlfred/api/users/hook')

// Profile picture storage
const uploadIdPicture = createDiskMulter('static/profile', IMAGE_FILTER)
// Id card storage
const uploadIdCard = createDiskMulter('static/profile/idCard/', IMAGE_FILTER)
// Registration proof storage
const uploadRegProof = createDiskMulter('static/profile/registrationProof/', IMAGE_FILTER)
// Album picture storage
const uploadAlbumPicture =createDiskMulter('static/profile/album/', IMAGE_FILTER)

router.get('/check_register_code/:code', (req, res) => {
  checkRegisterCodeValidity(req, req.params.code)
    .then(result => res.json(result))
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route POST /myAlfred/api/users/register
// Register
router.post('/register', (req, res) => {

  const {errors, isValid} = validateSimpleRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const registerCode=req.body.is_alfred && req.body.is_alfred!=REGISTER_WITHOUT_CODE ? req.body.is_alfred : null

  let user={}
  // In case of pending registration
  const user_id = req.body.user_id

  const checkCode=registerCode ? checkRegisterCodeValidity(req, registerCode) : Promise.resolve()
  checkCode
    .then(() => {
      return User.findOne({email: req.body.email})
    })
    .then(db_user => {
      if (db_user && (!user_id || db_user._id.toString()!=user_id)) {
        errors.email = EDIT_PROFIL.duplicate_email
        return Promise.reject(errors)
      }


      user.name = req.body.name
      user.gender = req.body.gender
      user.firstname = req.body.firstname
      user.email = req.body.email
      user.password = req.body.password
      user.birthday = req.body.birthday

      user.billing_address = {
        address: req.body.address,
        zip_code: req.body.zip_code,
        city: req.body.city,
        country: req.body.country,
        gps: {
          lat: req.body.lat,
          lng: req.body.lng,
        },
      }
      user.service_address = []
      user.last_login = []
      user.professional = req.body.company
      user.is_alfred = !!req.body.is_alfred
      return bcrypt.hash(user.password, 10)

    })
    .then(hash => {
      user.password = hash
      return User.create(user)
    })
    .then(user => {
      createMangoClient(user)
        .then(user => user.save().then().catch(err => console.error(err)))
        .catch(err => console.error(err))
      sendVerificationMail(user, req)
      // Warning si adresse incomplète
      if (!user.billing_address.gps.lat) {
        User.find({is_admin: true}, 'firstname email phone')
          .then(admins => {
            let log_link = new URL(`/dashboard/logAsUser?email=${user.email}`, computeUrl(req))
            const msg=`Compléter l'adresse pour le compte ${user.email}, connexion via ${log_link}`
            const subject=`Alerte adresse incorrecte pour ${user.email}`
            admins.forEach(admin => {
              sendAlert(admin, subject, msg)
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
      if (registerCode) {
        setRegisterCodeUsed(req, registerCode)
          .then(result => console.log(result))
          .catch(err => console.log(err))
      }
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route GET /myAlfred/api/users/sendMailVerification
// Send email
// @access private
router.get('/sendMailVerification', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      sendVerificationMail(user, req)
      res.json({})
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route POST /myAlfred/api/users/sendSMSVerification
// Send email
// @access private
router.post('/checkSMSVerification', passport.authenticate('jwt', {session: false}), (req, res) => {
  const sms_code = req.body.sms_code
  User.findById(req.user.id)
    .then(user => {
      if (user.sms_code == sms_code) {
        console.log('Code SMS OK pour moi')
        User.findByIdAndUpdate(req.user, {sms_code: null, phone_confirmed: true})
          .then(() => console.log('OK'))
          .catch(err => console.error(err))
        res.json({sms_code_ok: true})
      }
      else {
        res.json({sms_code_ok: false})
      }
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route POST /myAlfred/api/users/sendSMSVerification
// Send email
// @access private
router.post('/sendSMSVerification', passport.authenticate('jwt', {session: false}), (req, res) => {
  const code = Math.floor(Math.random() * Math.floor(10000)).toString().padStart(4, '0')
  console.log(`Création code sms ${code} pour ${req.user}`)
  User.findByIdAndUpdate(req.user, {sms_code: code}, {new: true})
    .then(user => {
      if (req.body.phone) {
        user.phone = req.body.phone
      }
      if (!sendVerificationSMS(user)) {
        res.status(400).json({error: 'Impossible d\'envoyer le SMS'})
        return
      }
      res.json({sms_code: is_production() ? 'ok' : code})
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route PUT /myAlfred/api/users/validateAccount
// Validate account after register
router.post('/validateAccount', (req, res) => {
  User.findByIdAndUpdate(req.body.user_id, {is_confirmed: true})
    .then(() => {
      const io=getIO()
      io.emit('joinProfile')
      io.emit('onProfileChange', req.body.user_id)
      return res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route PUT /myAlfred/api/users/profile/billingAddress
// Set the main address in the profile
// @Access private
router.put('/profile/billingAddress', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      user.billing_address = req.body
      user.save()
        .then(
          user => {
            ServiceUser.updateMany({user: user.id}, {service_address: user.billing_address})
            createMangoClient(user)
            if (user.mangopay_provider_id) {
              req.context.getModel('Shop').findOne({alfred: user._id})
                .then(shop => {
                  createMangoProvider(user, shop)
                })
            }
          },
        )
        .catch(
          err => console.error(err),
        )
    })
    .catch(err => console.error(err))
    .finally(user => { res.json(user) })
})

// @Route PUT /myAlfred/api/users/profile/languages
// Sets the languages
// @Access private
router.put('/profile/languages', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      user.languages = req.body.languages
      user.save().then(user => res.json(user)).catch(err => console.error(err))
    })
})

// @Route PUT /myAlfred/api/users/profile/description
// Sets the description
// @Access private
router.put('/profile/description', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      user.description = req.body.description
      user.save().then(user => res.json(user)).catch(err => console.error(err))
    })
})

// @Route PUT /myAlfred/api/users/profile/serviceAddress
// Add an other address in the profile
// @Access private
router.put('/profile/serviceAddress', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      const address = {
        address: req.body.address,
        city: req.body.city,
        zip_code: req.body.zip_code,
        lat: req.body.lat,
        lng: req.body.lng,
        label: req.body.label,
        floor: req.body.floor,
        note: req.body.note,
        phone_address: req.body.phone,
      }
      user.service_address.push(address)


      user.save().then(user => res.json(user)).catch(err => console.error(err))


    })
})

// @Route GET /myAlfred/api/users/profile/address/:id
// Get service address by id
// @Access private
router.get('/profile/address/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      const index = req.params.id
      const address = user.service_address
      const selected = address.map(item => item.id)
        .indexOf(index)
      const obj = address[selected]
      res.json(obj)
    })
    .catch(err => console.error(err))
})

// @Route PUT /myAlfred/api/users/profile/address/:id
// Edit service address by id
// @Access private
router.put('/profile/address/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      const index = user.service_address
        .map(item => item.id)
        .indexOf(req.params.id)
      user.service_address[index].label = req.body.label
      user.service_address[index].address = req.body.address
      user.service_address[index].zip_code = req.body.zip_code
      user.service_address[index].city = req.body.city
      user.service_address[index].floor = req.body.floor
      user.service_address[index].note = req.body.note
      user.service_address[index].phone_address = req.body.phone
      user.service_address[index].lat = req.body.lat
      user.service_address[index].lng = req.body.lng

      user.save().then(address => res.json(address)).catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

// @Route DELETE /myAlfred/api/users/profile/address/:id
// Delete service address by id
// @Access private
router.delete('/profile/address/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      const index = user.service_address
        .map(item => item.id)
        .indexOf(req.params.id)
      user.service_address.splice(index, 1)

      user.save().then(address => res.json(address)).catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

// @Route PUT /myAlfred/api/users/profile/phone
// Add phone number in profile
// @Access private
router.put('/profile/phone', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {
    phone: req.body.phone,
    phone_confirmed: req.body.phone_confirmed,
  }, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route PUT /myAlfred/api/users/profile/job
// Add job in profile
// @Access private
router.put('/profile/job', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {
    job: req.body.job,
  }, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route PUT /myAlfred/api/users/profile/picture
// Add a picture profile
// @Access private
router.post('/profile/picture', uploadIdPicture.single('myImage'), passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {
    picture: req.file ? req.file.path : '',
  }, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route PUT /myAlfred/api/users/profile/pictureLater
// Add a picture profile
// @Access private
router.put('/profile/pictureLater', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {picture: req.body.picture}, {new: true})
    .then(user => {
      res.json(user)
    })
    .catch(err => console.error(err))
})

// @Route POST /myAlfred/api/users/profile/idCard
// Add an identity card
// @Access private
router.post('/profile/idCard', uploadIdCard.fields([{name: 'myCardR', maxCount: 1}, {
  name: 'myCardV',
  maxCount: 1,
}]), passport.authenticate('jwt', {session: false}), (req, res) => {
  if (!req.files.myCardR && !req.files.myCardV) {
    return res.status(200).json('Aucun photo à sauvegarder')
  }
  User.findById(req.user.id)
    .then(user => {
      if (req.files.myCardR) {
        user.id_card.recto = req.files.myCardR[0].path
      }
      if (req.files.myCardV) {
        user.id_card.verso = req.files.myCardV[0].path
      }

      user.save()
        .then(user => {
          console.log(`Saved idCard user:${JSON.stringify(user.id_card)}`)
          addIdIfRequired(user)
          res.json(user)
        })
        .catch(err => console.error(err))
    })
    .catch(err => {
      console.error(err)
      res.statut(400, err)
    })
})

// @Route POST /myAlfred/api/users/profile/registrationProof/add
// Add a registration proof
// @Access private
router.post('/profile/registrationProof/add', uploadRegProof.single('registrationProof'), passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      user.registration_proof = req.file.path
      return user.save()
    })
    .then(user => {
      addRegistrationProof(user)
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route DELETE /myAlfred/api/users/profile/registrationProof
// Deletes a registration proof
// @Access private
router.delete('/profile/registrationProof', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .then(user => {
      user.registration_proof = null
      return user.save()
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
})

// @Route POST /myAlfred/api/users/login
// Login
// TODO 934169 Gérer si cookies non autorisés (pas de login)
router.post('/login', (req, res) => {

  const {errors, isValid} = validateLoginInput(req.body)

  if (!isValid) {
    console.warn(`Invalid login data:${JSON.stringify(errors)}`)
    return res.status(400).json(errors)
  }

  const email = req.body.username.toLowerCase().trim()
  const password = req.body.password
  let role = req.body.role

  // Find user by email
  User.findOne({email: new RegExp(`^${lodash.escapeRegExp(email)}$`, 'i')})
    .populate('shop', 'is_particular')
    .then(user => {
      // Check for user
      if (!user) {
        console.warn(`Invalid login : no user for ${email}`)
        errors.username = 'Mot de passe ou email incorrect'
        return res.status(400).json(errors)
      }

      // Si roles et pas de rôle indiqué, prendre le seul possible
      if (!role && user.roles.length==1) {
        role=user.roles[0]
      }

      if (user.is_employee && !role) {
        errors.role = 'Vous devez sélectioner un rôle'
        return res.status(400).json(errors)
      }

      if (user.is_employee && !ROLES[role]) {
        errors.role = `Rôle ${role} inconnu`
        return res.status(400).json(errors)
      }

      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch && user.active === true) {
            // Keep last 10 connexion dates
            user.last_login.unshift(Date.now())
            while (user.last_login.length>10) {
              user.last_login.pop()
            }
            user.save()
              .then(() => {})
              .catch(err => console.error(err))
            // Sign token
            send_cookie(user, role, res)
          }
          else {
            console.warn(`Invalid login : bad password ${password} for ${email}`)
            errors.password = 'Mot de passe ou email incorrect'
            return res.status(400).json(errors)
          }
        })
    })
})

router.get('/token', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .populate('shop', 'is_particular')
    .then(user => {
      send_cookie(user, null, res, req.context.getLoggedAs())
    })
    .catch(err => {
      console.error(err)
      res.status('404')
    })
})

// @Route GET /myAlfred/api/users/logout
// logout
router.get('/logout', (req, res) => {
  res.status(200).send({success: false, token: null})
})

// @Route GET /myAlfred/api/users/all
// List all users
router.get('/all', (req, res) => {

  User.find({is_admin: false})
    .then(user => {
      if (!user) {
        res.status(400).json({msg: 'No users found'})
      }
      res.json(user)
    })
    .catch(err => res.status(404).json({user: 'No users found'}))
})

// @Route GET /myAlfred/api/users/users
// List all simple users
router.get('/users', (req, res) => {
  User.find({is_admin: false, is_alfred: false})
    .then(user => {
      if (!user) {
        res.status(400).json({msg: 'No users found'})
      }
      res.json(user)
    })
    .catch(err => res.status(404).json({users: 'No billing found'}))
})

// @Route GET /myAlfred/api/users/roles/:email
// Get roles for an email's user
router.get('/roles/:email', (req, res) => {

  User.findOne({email: req.params.email}, 'roles')
    .then(user => {
      if (!user) {
        console.log(`Request roles for email ${req.params.email}:[]`)
        return res.json([])
      }
      console.log(`Request roles for email ${req.params.email}:${user.roles}`)
      res.json(user.roles)
    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// @Route GET /myAlfred/api/users/users/:id
// Get one user
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No user found'})
      }
      res.json(user)

    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// @Route DELETE /myAlfred/api/users/:id/role/:role
// Get one user
router.delete('/:id/role/:role', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No user found'})
      }
      user.roles=(user.roles||[]).filter(r => r!=req.params.role)
      if (user.roles.length==0) {
        user.roles = null
        user.company = null
      }
      user.save()
        .then(() => res.json(user))
        .catch(err => {
          console.error(err)
          res.status(404).json({user: 'Erreur à la suppression du rôle'})
        })
    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// @Route PUT /myAlfred/api/users/users/becomeAlfred
// Update one user is_alfred's status
router.put('/users/becomeAlfred', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {is_alfred: true}, {new: true})
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No user found'})
      }
      res.json(user)

    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// @Route PUT /myAlfred/api/users/users/deleteAlfred
// Update one user is_alfred's status
router.put('/users/deleteAlfred', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {is_alfred: false}, {new: true})
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No user found'})
      }
      res.json(user)

    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// @Route PUT /myAlfred/api/users/alfredViews/:id
// Update number of views for an alfred
router.put('/alfredViews/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {$inc: {number_of_views: 1}}, {new: true})
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No user found'})
      }
      res.json(user)

    })
    .catch(err => res.status(404).json({user: 'No user found'}))
})

// @Route GET /myAlfred/api/users/home/alfred
// List alfred homepage
router.get('/home/alfred', (req, res) => {
  User.find({is_alfred: true})
    .sort({creation_date: -1})
    .limit(10)
    .then(user => {
      if (!user) {
        res.status(400).json({msg: 'No alfred found'})
      }
      res.json(user)
    })
    .catch(err => res.status(404).json({alfred: 'No alfred found'}))
})

// @Route GET /myAlfred/api/users/alfred
// List all alfred
router.get('/alfred', (req, res) => {
  User.find({is_alfred: true})
    .then(user => {
      if (!user) {
        return res.status(400).json({msg: 'No alfred found'})
      }
      return res.json(user)
    })
    .catch(err => {
      return res.status(404).json({alfred: `No alfred found:${err}`})
    })
})

// @Route GET /myAlfred/api/users/current
// Get the current user
// @Access private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findById(req.user.id)
    .populate('resetToken')
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.error(`During User.findById:${err}`)
      res.status(404).json({alfred: 'No alfred found'})
    })
})

// @Route POST /myAlfred/api/users/forgotPassword
// Send email with link for reset password
router.post('/forgotPassword', (req, res) => {
  const email = (req.body.email || '').toLowerCase().trim()
  const role = req.body.role

  User.findOne({email: new RegExp(`^${lodash.escapeRegExp(email)}$`, 'i')})
    .populate('company')
    .then(user => {
      if (user === null) {
        console.error(`email ${email} not in database`)
        return res.status(404).json({error: 'Aucun compte avec cet email'})
      }
      const token = crypto.randomBytes(20).toString('hex')
      ResetToken.create({token: token})
        .then(token => {
          user.update({resetToken: token._id})
            .catch(err => console.error(err))
        })
      // Role ? création d'un compte B2B
      if (req.body.role) {
        sendB2BAccount(user, user.email, ROLES[role], user.company.name, token, req)
      }
      else {
        sendResetPassword(user, token, req)
      }
      res.json(user)
    })
})

// @Route POST /myAlfred/api/users/resetPassword
// Reset the password
router.post('/resetPassword', (req, res) => {
  const password = req.body.password
  const token = req.body.token
  ResetToken.findOne({token: token})
    .then(resetToken => {
      User.findOne({resetToken: resetToken._id})
        .then(user => {
          if (!user) {
            throw 'No user'
          }
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) {
                throw err
              }
              user.updateOne({password: hash, resetToken: undefined})
                .then(result => res.json(user))
                .catch(err => console.error(err))
            })
          })
        })
        .catch(err => {
          console.error(err)
          res.status(400).json({msg: 'Token expiré'})
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json({msg: 'Token invalide'})
    })
})

router.put('/profile/email', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.exists({email: req.body.email, _id: {$ne: req.user._id}})
    .then(duplicate_exists => {
      if (duplicate_exists) {
        return Promise.reject(EDIT_PROFIL.duplicate_email)
      }
      return User.findById(req.user.id)
    })
    .then(user => {
      if (user.email != req.body.email) {
        user.email=req.body.email
        user.is_confirmed=false
      }
      return user.save()
    })
    .then(() => {
      return res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(404).json(err)
    })
})

router.put('/profile/status', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findByIdAndUpdate(req.user.id,
    {professional: req.body.company},
  )
    .then(() => { res.json('ok') })
    .catch(err => res.status(500).json(err))
})

// @Route PUT /myAlfred/api/users/profile/editProfile
// Edit email, job and phone
// @Access private
router.put('/profile/editProfile', passport.authenticate('jwt', {session: false}), (req, res) => {

  let {errors, isValid} = validateEditProfile(req.body)

  User.findOne({email: req.body.email})
    .then(user => {
      if (user && req.body.email != req.context.getUser().email) {
        errors={...errors, email: EDIT_PROFIL.duplicate_email}
        isValid=false
      }
      if(!isValid) {
        return res.status(400).json({...errors})
      }

      User.findByIdAndUpdate(req.user, {
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname,
        gender: req.body.gender,
        description: req.body.description,
        birthday: req.body.birthday,
        phone: req.body.phone,
        diplomes: req.body.diplomes,
        school: req.body.school,
        job: req.body.job,
      }, {new: true})
        .then(user => {
          if(req.user.email !== req.body.email) {
            User.findByIdAndUpdate(req.user, {
              is_confirmed: false,
            }).then(() => {
              sendVerificationMail(user, req)
              res.json({success: 'Profil mise à jour et e-mail envoyé !'})
            }).catch(err => console.error(err))
          }
          else{
            res.json({success: 'Profil mis à jour !'})
          }
        })
        .catch(err => console.error(err))

    })
    .catch(err => console.error(err))
})

// @Route PUT /myAlfred/api/users/profile/birthday/:user_id
// Update birthday for user {birthday,
// @Access private
router.put('/profile/birthday/:user_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  console.log(`Setting birthday date ${req.body.birthday} to ${req.params.user_id}`)
  const errors= validateBirthday(req.body.birthday)
  if (errors) {
    res.status(400).json(errors)
    return
  }
  User.findByIdAndUpdate(req.params.user_id, {birthday: req.body.birthday})
    .then(() => res.json())
    .catch(err => {
      console.error(err)
      res.status(400).json('Date de naissance incorrecte')
    })
})

// @Route PUT /myAlfred/api/users/profile/editProProfile
// Edit email, job and phone
// @Access private
router.put('/profile/editProProfile', passport.authenticate('jwt', {session: false}), (req, res) => {

  console.log(`Received:${JSON.stringify(req.body)}`)
  const {errors, isValid} = validateEditProProfile(req.body)

  User.findOne({email: req.body.email})
    .then(user => {
      if (user && req.body.email != req.user.email) {
        return res.status(400).json({email: EDIT_PROFIL.duplicate_email})
      }
      else if(!isValid) {
        return res.status(400).json(errors)
      }

      User.findByIdAndUpdate(req.user, {
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname,
        position: req.body.position,
        birthday: req.body.birthday,
      }, {new: true})
        .populate('company')
        .then(user => {
          if(req.user.email !== req.body.email) {
            User.findByIdAndUpdate(req.user, {is_confirmed: false})
              .then(() => {
                sendVerificationMail(user, req)
                res.json({success: 'Profil mis à jour et e-mail envoyé !'})
              })
              .catch(err => console.error(err))
          }
          else{
            res.json({success: 'Profil mis à jour !'})
          }
        })
        .catch(err => console.error(err))

    })
    .catch(err => console.error(err))
})

// @Route PUT /myAlfred/api/users/profile/editPassword
// Edit password
// @Access private
router.put('/profile/editPassword', passport.authenticate('jwt', {session: false}), (req, res) => {
  const password = req.body.password
  const newPassword = req.body.newPassword
  const admin = req.user.is_admin

  if (!newPassword.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')) {
    return res.status(400).json({error: 'Le nouveau mot de passe doit contenir au moins :\n\t- 8 caractères\n\t- 1 minuscule\n\t- 1 majuscule\n\t- 1 chiffre'})
  }
  User.findById(req.user.id)
    .then(user => {
      const promise = admin ? Promise.resolve(true) : Promise.resolve(bcrypt.compare(password, user.password))
      promise
        .then(isMatch => {
          if (isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newPassword, salt, (err, hash) => {
                if (err) {
                  throw err
                }
                user.password = hash
                user.save()
                  .then(user => res.json({success: 'Mot de passe mis à jour'}))
                  .catch(err => console.error(err))
              })
            })
          }
          else {
            return res.status(400).json({error: 'Mot de passe incorrect', wrongPassword: true})
          }
        })
    })

})

// @Route PUT /myAlfred/api/users/account/notifications
// Edit notifications preferences
// @Access private
router.put('/account/notifications', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      if (!user) {
        return res.status(404).json(`Unknown user ${req.user}`)
      }
      user.notifications_message = {
        email: req.body.messages_email,
        push: req.body.messages_push,
        sms: req.body.messages_sms,
      }

      user.notifications_rappel = {
        email: req.body.rappel_email,
        push: req.body.rappel_push,
        sms: req.body.rappel_sms,
      }

      user.notifications_promotions={
        email: req.body.promotions_email,
        push: req.body.promotions_push,
        sms: req.body.promotions_sms,
        phone: req.body.promotions_phone,
      }

      user.notifications_community = {
        email: req.body.community_email,
        push: req.body.community_push,
        sms: req.body.community_sms,
      }

      user.notifications_assistance={
        push: req.body.assistance_push,
        sms: req.body.assistance_sms,
      }

      user.save()
        .then(result => {
          res.json(result)
        })
        .catch(err => {
          console.error(err)
          res.status(400).json(err)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route PUT /myAlfred/api/users/account/rib
// Edit rib
// @Access private
router.put('/account/rib', passport.authenticate('jwt', {session: false}), (req, res) => {

  User.findById(req.user.id)
    .then(user => {
      user.account = {}
      user.account.name = req.body.name
      user.account.bank = req.body.bank
      user.account.bic = req.body.bic
      user.account.iban = req.body.iban


      user.save().then(result => res.json(result)).catch(err => console.error(err))
    })
    .catch(err => console.error(err))
})

// @Route PUT /myAlfred/api/users/account/indexGoogle
// Define preference for indexing account
// @Access private
router.put('/account/indexGoogle', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {index_google: req.body.index_google})
    .then(user => {
      res.json(user)
    })
    .catch(err => console.error(err))
})

// @Route DELETE /myAlfred/api/users/profile/picture/delete
// Delete the picture profile
// @Access private
router.delete('/profile/picture/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  User.findByIdAndUpdate(req.user, {
    picture: null,
  }, {new: true})
    .then(user => {
      return res.json(user)
    })
    .catch(err => {
      console.error(err)
      return res.status(400).json(err)
    })
})

// @Route PUT /myAlfred/api/users/current/delete
// Delete the current user
// @Access private
router.put('/current/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  const hash = crypto.randomBytes(10).toString('hex')
  User.findByIdAndUpdate(req.user, {active: false, is_alfred: false, email: hash})
    .then(user => {
      logEvent(req, 'Compte', 'Suppression', `Compte de ${user.full_name}(${user._id}) supprimé`)
      res.json({msg: 'Compte désactivé'})
    })
    .catch(err => console.error(err))
})

// @Route DELETE /myAlfred/api/users/profile/idCard/recto
// Delete recto identity card
// @Access private
router.delete('/profile/idCard/:side', passport.authenticate('jwt', {session: false}), (req, res) => {
  const side=req.params.side
  if (!['recto', 'verso'].includes(side)) {
    return res.status(400).json(`Unkown idcard side during removal:${side}, expected 'recto' or 'verso'`)
  }
  User.findById(req.user.id)
    .then(user => {
      user.id_card[side]=null
      user.id_card_status = null
      user.id_card_error = null
      user.save()
        .then(user => {
          res.json(user)
        })
        .catch(err => {
          console.error(err)
        })
    })
    .catch(err => {
      console.error(err)
    })
})

/** ****** ALBUMS *********/
// @Route POST /myAlfred/api/users/profile/album/add
// Add an album
// @Access private
router.post('/profile/album/add', uploadAlbumPicture.single('myImage'), passport.authenticate('jwt', {session: false}), (req, res) => {
  const album=new Album({
    label: req.body.label,
    picture: req.file.path,
    user: req.user,
  })
  album.save()
    .then(album => {
      res.json(album)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route GET /myAlfred/api/users/profile/album
// Gets albums
// @Access private
router.get('/profile/album/:user_id', (req, res) => {
  Album.findOne({user: req.params.user_id})
    .then(album => {
      res.json(album && album.pictures || [])
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route POST /myAlfred/api/users/profile/album/picture/add
// Add a picture to an album
// @Access private
router.post('/profile/album/picture/add', uploadAlbumPicture.single('myImage'), passport.authenticate('jwt', {session: false}), (req, res) => {
  Album.findOneAndUpdate({user: req.user.id}, {$push: {pictures: req.file.path}}, {new: true, upsert: true})
    .then(() => {
      res.json({})
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})
router.post('/profile/album/picture/add', uploadAlbumPicture.single('myImage'), passport.authenticate('jwt', {session: false}), (req, res) => {
  Album.findOneAndUpdate({user: req.user.id}, {$push: {pictures: req.file.path}}, {new: true, upsert: true})
    .then(() => {
      res.json({})
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.delete('/profile/album/picture/:pic_index', passport.authenticate('jwt', {session: false}), (req, res) => {
  const remove_idx=parseInt(req.params.pic_index)
  Album.findOne({user: req.user.id})
    .then(album => {
      const path=album.pictures[remove_idx]
      album.pictures=album.pictures.filter((p, idx) => remove_idx!=idx)
      fs.unlink(path)
        .then(() => console.log(`Removed ${req.user.id}'s album picture ${path}`))
        .catch(err => console.log(`Remove ${req.user.id}'s album picture ${path}: error ${err}`))
      return album.save()
    })
    .then(() => {
      res.json({})
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

router.get('/still_profile/:filename', (req, res) => {
  res.set('Content-Type', 'image/*')
  gifFrames({url: `static/profile/${req.params.filename}`, frames: 0})
    .then(frameData => {
      const img=frameData[0].getImage().read()
      return res.send(img)
    })
    .catch(() => {
      fs.readFile(`static/profile/${req.params.filename}`)
        .then(data => {
          return res.send(data)
        })
        .catch(err => {
          console.error(err)
          return res.send()
        })
    })
})

// @Route GET /myAlfred/api/users/mangopay_kyc
// Send email
// @access private
router.get('/hook', (req, res) => {
  const doc_id = req.query.RessourceId
  const kyc_status = req.query.EventType
  console.log(`Mangopay called ${req.url}`)
  User.findOne({$or: [{identity_proof_id: doc_id}, {registration_proof_id: doc_id}]})
    .then(user => {
      if (user) {
        // Got callback for id proof or registration proof ?
        const is_id_card = user.identity_proof_id == doc_id
        const proof_prefix = is_id_card ? 'id_card' : 'registration_proof'
        console.log(`User ${user.email} received event ${kyc_status} for document ${doc_id} (${proof_prefix})`)
        mangoApi.KycDocuments.get(doc_id)
          .then(doc => {
            user[`${proof_prefix }_status`] = doc.Status
            user[`${proof_prefix }_error`] = doc.RefusedReasonType
            user.save()
          })
        res.status(200).json()
      }
      else {
        console.error(`Could not find user with identity_proof_id or registration_proof_id ${doc_id}`)
        res.status(200).json()
      }
    })
    .catch(err => {
      console.error(err)
      res.status(200).json()
    })
})

router.get('/locations', (req, res) => {
  const value=req.query.value
  const type=req.query.type
  getLocationSuggestions(value, type)
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json('Erreur')
    })
})

// Create mango client account for all user with no id_mangopay
// DISABLED because it operates on ALL DATABASES !!
if (is_production() || is_validation()) {
  new CronJob('0 */15 * * * *', () => {
    console.log('Customers who need mango account')
    User.find({id_mangopay: null, active: true})
      .limit(100)
      .then(usrs => {
        usrs.forEach(user => {
          if (user.age<18) {
            console.warn(`User ${user._id} ${user.full_name} skipped, age ${user.age}<18`)
          }
          else if (user.age>120) {
            console.warn(`User ${user._id} ${user.full_name} skipped, age ${user.age}>120`)
          }
          else {
            createMangoClient(user)
              .then(user => {
                console.log(`Created mango for ${user._id} ${user.full_name}`)
                user.save()
              })
              .catch(err => {
                console.error(err)
              })
          }
        })
      })
      .catch(err => console.error(err))
  }, null, true, 'Europe/Paris')
}

module.exports = router
