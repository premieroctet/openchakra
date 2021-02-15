const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const path = require('path');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const {is_production, is_validation}=require('../../../config/config');
const {validateCompanyProfile} = require('../../validation/simpleRegister');
const moment = require('moment');
moment.locale('fr');
const Comppany = require('../../models/Company');
const crypto = require('crypto');
const multer = require('multer');
const axios = require('axios');
const {computeUrl} = require('../../../config/config');
const emptyPromise = require('../../../utils/promise.js');


const {mangoApi, addIdIfRequired, addRegistrationProof, createMangoClient,install_hooks} = require('../../../utils/mangopay');


axios.defaults.withCredentials = true;

const storageIdPicture = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/profile/');
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    let key = crypto.randomBytes(5).toString('hex');
    cb(null, datetimestamp + '_' + key + '_' + file.originalname);
  },
});
const uploadIdPicture = multer({
  storage: storageIdPicture,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.PDF') {
      return callback(new Error('Only images are allowed'));
    }
    callback(null, true);
  },
});

// Registration proof storage
const storageRegProof = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/profile/registrationProof/');
  },
  filename: function (req, file, cb) {
    let datetimestamp = Date.now();
    let key = crypto.randomBytes(5).toString('hex');
    let key2 = crypto.randomBytes(10).toString('hex');
    cb(null, datetimestamp + '_' + key + '_' + key2 + path.extname(file.originalname));

  },
});
const uploadRegProof = multer({
  storage: storageRegProof,
  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg' && ext !== '.PNG' && ext !== '.JPG' && ext !== '.JPEG' && ext !== '.PDF') {
      return callback(new Error('Error extension'));
    }
    callback(null, true);
  },
});

// @Route PUT /myAlfred/api/companies/profile/billingAddress
// Set the main address in the profile
// @Access private
router.put('/profile/billingAddress', passport.authenticate('jwt', {session: false}), (req, res) => {

  Company.findById(req.company.id)
    .then(company => {
      company.billing_address = {};
      company.billing_address.address = req.body.address;
      company.billing_address.zip_code = req.body.zip_code;
      company.billing_address.city = req.body.city;
      company.billing_address.country = req.body.country;
      company.billing_address.gps.lat = req.body.gps.lat;
      company.billing_address.gps.lng = req.body.gps.lng;
      company.save().then(company => res.json(company)).catch(err => console.error(err));

    });
});

// @Route PUT /myAlfred/api/companies/profile/serviceAddress
// Add an other address in the profile
// @Access private
router.put('/profile/serviceAddress', passport.authenticate('jwt', {session: false}), (req, res) => {

  Company.findById(req.company.id)
    .then(company => {
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
      };
      company.service_address.push(address);


      company.save().then(company => res.json(company)).catch(err => console.error(err));


    });
});

// @Route GET /myAlfred/api/companies/profile/address/:id
// Get service address by id
// @Access private
router.get('/profile/address/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Company.findById(req.company.id)
    .then(company => {
      const index = req.params.id;
      const address = company.service_address;
      const selected = address.map(item => item.id)
        .indexOf(index);
      const obj = address[selected];
      res.json(obj);
    })
    .catch(err => console.error(err));
});

// @Route PUT /myAlfred/api/companies/profile/address/:id
// Edit service address by id
// @Access private
router.put('/profile/address/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Company.findById(req.company.id)
    .then(company => {
      const index = company.service_address
        .map(item => item.id)
        .indexOf(req.params.id);
      company.service_address[index].label = req.body.label;
      company.service_address[index].address = req.body.address;
      company.service_address[index].zip_code = req.body.zip_code;
      company.service_address[index].city = req.body.city;
      company.service_address[index].floor = req.body.floor;
      company.service_address[index].note = req.body.note;
      company.service_address[index].phone_address = req.body.phone;
      company.service_address[index].lat = req.body.lat;
      company.service_address[index].lng = req.body.lng;

      company.save().then(address => res.json(address)).catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

// @Route DELETE /myAlfred/api/companies/profile/address/:id
// Delete service address by id
// @Access private
router.delete('/profile/address/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Company.findById(req.company.id)
    .then(company => {
      const index = company.service_address
        .map(item => item.id)
        .indexOf(req.params.id);
      company.service_address.splice(index, 1);

      company.save().then(address => res.json(address)).catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

// @Route PUT /myAlfred/api/companies/profile/picture
// Add a picture profile
// @Access private
router.post('/profile/picture', uploadIdPicture.single('myImage'), passport.authenticate('jwt', {session: false}), (req, res) => {
  Company.findByIdAndUpdate(req.company.id, {
    picture: req.file ? req.file.path : '',
  }, {new: true})
    .then(company => {
      res.json(company);
    })
    .catch(err => {
      console.error(err);
    });
});

// @Route PUT /myAlfred/api/companies/profile/pictureLater
// Add a picture profile
// @Access private
router.put('/profile/pictureLater', passport.authenticate('jwt', {session: false}), (req, res) => {
  Company.findByIdAndUpdate(req.company.id, {picture: req.body.picture}, {new: true})
    .then(company => {
      res.json(company);
    })
    .catch(err => console.error(err));
});

// @Route POST /myAlfred/api/companies/profile/registrationProof/add
// Add a registration proof
// @Access private
router.post('/profile/registrationProof/add', uploadRegProof.single('registrationProof'), passport.authenticate('jwt', {session: false}), (req, res) => {
  Company.findById(req.company.id)
    .then(company => {
      company.registration_proof = req.file.path;
      return company.save();
    })
    .then(company => {
      addRegistrationProof(company);
      res.json(company);
    })
    .catch(err => {
      console.error(err);
    });
});

// @Route DELETE /myAlfred/api/companies/profile/registrationProof
// Deletes a registration proof
// @Access private
router.delete('/profile/registrationProof', passport.authenticate('jwt', {session: false}), (req, res) => {
  Company.findById(req.company.id)
    .then(company => {
      company.registration_proof = null;
      return company.save();
    })
    .then(company => {
      res.json(company);
    })
    .catch(err => {
      console.error(err);
    });
});

// @Route GET /myAlfred/api/companies/companies/:id
// Get one company
router.get('/companies/:id', (req, res) => {
  Company.findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(400).json({msg: 'No company found'});
      }
      res.json(company);

    })
    .catch(err => res.status(404).json({company: 'No company found'}));
});

// @Route PUT /myAlfred/api/companies/alfredViews/:id
// Update number of views for an alfred
router.put('/alfredViews/:id', (req, res) => {
  Company.findByIdAndUpdate(req.params.id, {$inc: {number_of_views: 1}}, {new: true})
    .then(company => {
      if (!company) {
        return res.status(400).json({msg: 'No company found'});
      }
      res.json(company);

    })
    .catch(err => res.status(404).json({company: 'No company found'}));
});

// @Route PUT /myAlfred/api/companies/profile/editProfile
// Edit email, job and phone
// @Access private
router.put('/profile/editProfile', passport.authenticate('jwt', {session: false}), (req, res) => {

  const {errors, isValid} = validateCompanyProfil(req.body);

  Company.findOne({name: req.body.name})
    .then(company => {
      if (company && req.body.name != req.company.emailname) {
        return res.status(400).json({errors: {namme: 'Une société de ce nom existe déjà'}});
      }
      else if(!isValid){
        return res.status(400).json(errors);
      }
      else {
        Company.findByIdAndUpdate(req.company.id, {
          name: req.body.name,
          description: req.body.description,
          website: req.body.website,
          activity: req.body.activity,
          size: req.body.size,
          siret: req.body.siret,
          vat_number: req.body.vat_number,
        }, {new: true})
          .then(company => {
              res.json({success: 'Entreprise mise à jour !'});
          })
          .catch(err => console.error(err));
      }
    })
    .catch(err => console.error(err));
});

// @Route PUT /myAlfred/api/companies/account/rib
// Edit rib
// @Access private
router.put('/account/rib', passport.authenticate('jwt', {session: false}), (req, res) => {

  Company.findById(req.company.id)
    .then(company => {
      company.account = {};
      company.account.name = req.body.name;
      company.account.bank = req.body.bank;
      company.account.bic = req.body.bic;
      company.account.iban = req.body.iban;


      company.save()
        .then(result => res.json(result))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

module.exports = router;
