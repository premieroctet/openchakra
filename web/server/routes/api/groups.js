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
const {computeUrl} = require('../../../config/config');
const emptyPromise = require('../../../utils/promise');
const {ADMIN, EMPLOYEE, MANAGER} = require('../../../utils/consts')
var _ = require('lodash')
const {mangoApi, addIdIfRequired, addRegistrationProof, createMangoClient,install_hooks} = require('../../../utils/mangopay');


axios.defaults.withCredentials = true;

// @Route PUT /myAlfred/api/groups/:group_id/allowedServices
// Data : service_id
// Put allowed service for current company
router.put('/:group_id/allowedServices', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const group_id = req.params.group_id
  const service_id = req.body.service_id

  Service.findById(service_id, 'label professional_access')
    .then ( service => {
      if (!service) {
        return res.status(404).json({error : `Service ${service._id} introuvable`})
      }
      if (!service.professional_access) {
        return res.status(400).json({error : `Le service ${service.label} n'est pas destiné aux professionnels`})
      }
      Group.findByIdAndUpdate(group_id, {  $addToSet : { allowed_services : service_id}})
        .then(group => {
          if (!group) {
            return res.status(400).json({msg: 'No group found'});
          }
          res.json(group);

        })
        .catch(err => res.status(404).json({company: 'No group found'}));
    })
    .catch(err => {
      console.error(err)
      res.status(404).json({company: 'No group found'})
    })
});

// @Route DELETE /myAlfred/api/groups/:group_id/allowedServices/:service_id
// Delete allowed service for current company
router.delete('/:group_id/allowedServices/:service_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {
  const group_id = req.params.group_id
  const service_id = req.params.service_id

  Group.findByIdAndUpdate(group_id, {  $pull : { allowed_services : service_id}})
    .then(group => {
      if (!group) {
        return res.status(400).json({msg: 'No group found'});
      }
      res.json(group);

    })
    .catch(err => res.status(404).json({company: 'No group found'}));
});

// @Route GET /myAlfred/api/groups
// Gets groups for a company
// @Access private
router.get('/', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const company_id = req.user.company

  Group.find({company : company_id})
    .populate('members', 'firstname name email roles company')
    .populate('allowed_services', 'label')
    .then ( groups => {
      res.json(groups)
    })
    .catch (err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route POST /myAlfred/api/groups
// Creates a group for the current company
// @Access private
router.post('/', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const {errors, isValid} = validateCompanyGroup(req.body);
  if (!isValid) {
    return res.status(400).json({error: errors});
  }

  const company_id = req.user.company

  Group.findOne({name : req.body.name, company : company_id})
    .then (group => {
      if (group) {
        res.status(400).json({error : 'Ce groupe existe déjà'})
        return
      }
      Group.create({name : req.body.name, company : company_id})
        .then ( group => { res.json(group) })
        .catch ( err => {
          console.error(err)
          res.status(500).json({error : JSON.stringify(err)})
        })

    })
    .catch( err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route PUT /myAlfred/api/groups/:group_id
// Updates a group (name, budget)
// @Access private
router.put('/:group_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const group_id = req.params.group_id

  const {errors, isValid} = validateCompanyGroup(req.body);
  if (!isValid) {
    return res.status(400).json({error: errors});
  }

  Group.findOneAndUpdate({ _id : group_id}, req.body, { new : true})
    .then (group => {
      if (!group) {
        return res.status(404).json({error: 'Groupe introuvable'})
      }
      res.json(group)
    })
    .catch( err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route DELETE /myAlfred/api/groups/:group_id
// Deletes a group for the current company
// @Access private
router.delete('/groups/:group_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const company_id = req.user.company

  Group.deleteOne({_id : req.params.group_id})
    .then (result => {
      if (result.deletedCount == 0) {
        res.status(404).json({error : `Le groupe ${req.params.group_id} n'existe pas`})
      }
      else {
        res.json(`Groupe ${req.params.group_id} supprimé`)
      }
    })
    .catch( err => {
      console.error(err)
      res.status(500).json({error: err})
    })
})

// @Route PUT /myAlfred/api/groups/:group_id/members
// Adds a member into a group for the current company
// @Access private
router.put('/:group_id/members', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const company_id = req.user.company
  const group_id = req.params.group_id
  const member_id = req.body.member_id

  User.findById(member_id)
    .then( user => {
      if (!user) {
        res.status(404).json({error: `User ${user_id} introuvable`})
        return
      }
      if (user.company && (user.company.toString() != company_id.toString())) {
        res.status(404).json({error: `User ${user_id} ne fait pas partie de cette compagnie`})
        return
      }
      Group.update( {_id : group_id}, { $addToSet : {members : member_id}})
        .then ( group => {
          res.json(group)
        })
        .catch ( err => {
          console.error(err)
          res.status(500).json({error: JSON.stringify(err)})
        })
    })
    .catch ( err => {
      console.error(err)
      res.status(500).json({error: JSON.stringify(err)})
    })

})

// @Route PUT /myAlfred/api/groups/:group_id/members
// Adds a member into a group for the current company
// @Access private
router.delete('/:group_id/members/:member_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const company_id = req.user.company
  const group_id = req.params.group_id
  const member_id = req.params.member_id

  Group.update( {_id : group_id}, { $pull : { members : member_id}})
    .then ( group => {
      res.json(group)
    })
    .catch ( err => {
      console.error(err)
      res.status(500).json({error: JSON.stringify(err)})
    })
})

// @Route PUT /myAlfred/api/groups/:group_id/managers
// Adds a manager into a group for the current company
// @Access private
router.put('/:group_id/managers', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const company_id = req.user.company
  const group_id = req.params.group_id
  const manager_id = req.body.member_id

  User.findByIdAndUpdate(manager_id, { $addToSet : { roles : MANAGER }})
    .then( user => {
      if (!user) {
        res.status(404).json({error: `User ${user_id} introuvable`})
        return
      }
      if (user.company && (user.company.toString() != company_id.toString())) {
        res.status(404).json({error: `User ${user_id} ne fait pas partie de cette compagnie`})
        return
      }
      Group.findByIdAndUpdate( group_id, { $addToSet : {members : manager_id}})
        .then ( group => {
          res.json(group)
        })
        .catch ( err => {
          console.error(err)
          res.status(500).json({error: JSON.stringify(err)})
        })
    })
    .catch ( err => {
      console.error(err)
      res.status(500).json({error: JSON.stringify(err)})
    })

})

// @Route PUT /myAlfred/api/groups/:group_id/managers
// Adds a manager into a group for the current company
// @Access private
router.delete('/:group_id/managers/:manager_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const company_id = req.user.company
  const group_id = req.params.group_id
  const manager_id = req.params.member_id

  User.findByIdAndUpdate(member_id, { $pull : { roles : MANAGER }}, { new : true})
    .then( user => {
      if (!user) {
        res.status(404).json({error: `User ${user_id} introuvable`})
        return
      }
      return res.json(user)
      if (user.company && (user.company.toString() != company_id.toString())) {
        res.status(404).json({error: `User ${user_id} ne fait pas partie de cette compagnie`})
        return
      }
    })
    .catch ( err => {
      console.error(err)
      res.status(500).json({error: JSON.stringify(err)})
    })

})


module.exports = router;
