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
const {is_production, is_validation, computeUrl}=require('../../../config/config');
const {validateCompanyProfile, validateCompanyMember, validateCompanyGroup} = require('../../validation/simpleRegister');
const moment = require('moment');
moment.locale('fr');
const Company = require('../../models/Company');
const User = require('../../models/User');
const Group = require('../../models/Group');
const Service = require('../../models/Service');
const crypto = require('crypto');
const multer = require('multer');
const axios = require('axios');
const emptyPromise = require('../../../utils/promise');
const {ADMIN, MANAGER, EMPLOYEE, ROLES} = require('../../../utils/consts')
var _ = require('lodash')
const {addRegistrationProof, createOrUpdateMangoCompany} = require('../../utils/mangopay');


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
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
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
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.pdf' && ext !== '.jpeg') {
      return callback(new Error('Error extension'));
    }
    callback(null, true);
  },
});

// @Route PUT /myAlfred/api/companies/profile/billingAddress
// Set the main address in the profile
// @Access private
router.put('/profile/billingAddress', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  Company.findById(req.user.company)
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
router.put('/profile/serviceAddress', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  Company.findById(req.user.company)
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
router.get('/profile/address/:id', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  Company.findById(req.user.company)
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
router.put('/profile/address/:id', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  Company.findById(req.user.company)
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
router.delete('/profile/address/:id', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  Company.findById(req.user.company)
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
router.post('/profile/picture', uploadIdPicture.single('myImage'), passport.authenticate('b2badmin', {session: false}), (req, res) => {
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
router.put('/profile/pictureLater', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  Company.findByIdAndUpdate(req.company.id, {picture: req.body.picture}, {new: true})
    .then(company => {
      res.json(company);
    })
    .catch(err => console.error(err));
});

// @Route POST /myAlfred/api/companies/profile/registrationProof/add
// Add a registration proof
// @Access private
router.post('/profile/registrationProof/add', uploadRegProof.single('registrationProof'), passport.authenticate('b2badmin', {session: false}), (req, res) => {
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
router.delete('/profile/registrationProof', passport.authenticate('b2badmin', {session: false}), (req, res) => {
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

// @Route GET /myAlfred/api/companies/current
// Get the company for the current logged user
router.get('/current', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  Company.findById(req.user.company)
    .then(company => {
      if (!company) {
        return res.status(400).json({msg: 'No company found'});
      }
      res.json(company);

    })
    .catch(err => {
      console.error(err)
      res.status(404).json({company: 'No company found'
      })});
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
router.put('/profile/editProfile', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const {errors, isValid} = validateCompanyProfile(req.body);
  const companyId = req.user.company;

  Company.findOne({name: req.body.name})
    .then(company => {
      if (company && JSON.stringify(company._id) !== JSON.stringify(companyId)) {
        return res.status(400).json({name: 'Une société de ce nom existe déjà'});
      }
      else if(!isValid){
        return res.status(400).json(errors);
      }
      else {
        Company.findByIdAndUpdate(companyId, {
          name: req.body.name,
          description: req.body.description,
          website: req.body.website,
          activity: req.body.activity,
          size: req.body.size,
          siret: req.body.siret,
          vat_number: req.body.vat_number,
          billing_address: req.body.billing_address,
          vat_subject : req.body.vat_subject
        }, {new: true})
          .then(company => {
            if(company){
              res.json({success: 'Entreprise mise à jour !'});
            }else{
              res.json({error: 'Entreprise introuvable'});
            }
          })
          .catch(err => console.error(err));
      }
    })
    .catch(err => console.error(err));
});

// @Route GET /myAlfred/api/companies/account/rib
// Get comppany RIBs
// @Access private
router.get('/account/rib', passport.authenticate('b2badmin', {session: false}), (req, res) => {

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

// @Route PUT /myAlfred/api/companies/account/rib
// Edit rib
// @Access private
router.put('/account/rib', passport.authenticate('b2badmin', {session: false}), (req, res) => {

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

// @Route POST /myAlfred/api/companies/mambers
// Creates a member in the company
// @Access private
router.post('/members', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const {errors, isValid} = validateCompanyMember(req.body);
  if (!isValid) {
    return res.status(400).json({error: errors});
  }

  User.findOne({email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({error: "L'email existe déjà"});
      }
      else {
        const company_id = req.user.company
        const newUser= new User({
          firstname : req.body.firstname,
          name : req.body.name,
          email : req.body.email,
          company : company_id,
          password: crypto.randomBytes(10).toString('hex'),
          roles: [EMPLOYEE],
        })
        newUser.save()
          .then( newUser => {
            res.json(newUser)
          })
          .catch( err => {
            console.error(err)
            res.status(500).json({error: err})
          })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    });
});

// @Route DELETE /myAlfred/api/companies/mamber/:member_id
// removes member from the copany
// @Access private
router.delete('/members/:member_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const member_id = req.params.member_id;

  const company_id = req.user.company;
  User.find({company: company_id, roles: { "$in" : [ADMIN]}, _id : { $ne : member_id } })
    .then( users => {
      if (users.length==0) {
        return res.status(400).json({error: 'Il doit rester au moins un administrateur'})
      }
      else {
        User.findByIdAndUpdate(member_id, { roles : [], company : null})
          .then(user => {
            if (!user) {
              return res.status(404).json({error : 'Utilisateur inconnu'})
            }
            return res.json(user)
          })
          .catch(err => {
            console.error(err)
            res.status(500).json({error: err})
          })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    })
});

// @Route GET /myAlfred/api/companies/members
// Returns all meembers from current company
// @Access private
router.get('/members', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  const company_id = req.user.company

  User.find({company : company_id}, 'firstname name email company roles birthday')
    .then (users => {
      res.json(users)
    })
    .catch( err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route PUT /myAlfred/api/companies/representative
// Sets the legal representative to this company
// @Access private
router.put('/representative', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  const company_id = req.user.company
  const representative_id = req.body.representative_id

  Company.findByIdAndUpdate(company_id, {representative : representative_id}, { new : true} )
    .populate('representative')
    .then (company => {
      if (!company.representative.birthday) {
        res.status(400).json('Indiquer la date de naissance du représentant légal')
        return
      }
      createOrUpdateMangoCompany(company)
      res.json(company)
    })
    .catch( err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route PUT /myAlfred/api/companies/admins
// Adds an admin to this company
// @Access private
router.put('/admin', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  const company_id = req.user.company
  const admin_id = req.body.admin_id

  const new_account = req.body.new_account

  User.findByIdAndUpdate(admin_id, {company : company_id, $addToSet : {roles : ADMIN}}, { new : true} )
    .then (user => {
      if (new_account) {
        axios.post(new URL(`/myAlfred/api/users/forgotPassword`, computeUrl(req)), { email: user.email, role: ROLES[ADMIN]})
          .then(() => {})
          .catch (err => {})
      }
      res.json(user)
    })
    .catch( err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route PUT /myAlfred/api/companies/admins
// Adds an admin to this company
// @Access private
router.delete('/admin/:admin_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  const company_id = req.user.company
  const admin_id = req.params.admin_id

  User.count({company: company_id, roles: { "$in" : [ADMIN]}, _id : { $ne : admin_id } })
    .then( remainingAdmins => {
      if (remainingAdmins==0) {
        return res.status(400).json({error: 'Il doit rester au moins un administrateur'})
      }
      else {
        User.findByIdAndUpdate(admin_id, { $pull : { roles : ADMIN}}, { new : true })
          .then(user => {
            if (!user) {
              return res.status(404).json({error : 'Utilisateur inconnu'})
            }
            return res.json(user)
          })
          .catch(err => {
            console.error(err)
            res.status(500).json({error: err})
          })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: err})
    })
});

// @Route GET /myAlfred/api/companies/billings
// Returns bookings having a billing number for current company
// @Access private
router.get('/billings', passport.authenticate('b2badmin', {session: false}),
  (req, res) => {
    const company_id = req.user.company

    User.find({company: company_id})
      .then(users => {
        const user_ids = users.map(u => u._id)
        Booking.find({
          user: {$in: user_ids},
          user_role: {$in: [ADMIN, MANAGER]},
          $where: "this.billing_number && this.billing_number.length>0",
        })
          .populate('user')
          .populate('alfred')
          .then(bookings => {
            console.log(bookings.length)
            res.json(bookings)
          })
          .catch(err => {
            console.error(err)
            res.status(500).json({error: err})
          })
      })
      .catch(err => {
        console.error(err)
        res.status(500).json({error: err})
      })
})

router.get('/name/:company_id', (req, res) => {
  Company.findById(req.params.company_id, 'name')
    .then( company => {
      res.json(company)
    })
    .catch(err => {
      console.error(err)
      res.status(400).json()
    })
})

module.exports = router;
