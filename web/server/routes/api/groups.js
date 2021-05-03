const express = require('express');
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const moment = require('moment');
moment.locale('fr');
const User = require('../../models/User');
const Group = require('../../models/Group');
const Booking = require('../../models/Booking');
const Service = require('../../models/Service');
const axios = require('axios');
const {validateCompanyGroup} = require("../../validation/simpleRegister");
const {MANAGER, ROLES, MONTH_PERIOD, YEAR_PERIOD, BOOK_STATUS, DASHBOARD_MODE, MICROSERVICE_MODE, CARETAKER_MODE} = require('../../../utils/consts')
const {computeUrl}=require('../../../config/config')
const _ = require('lodash');

axios.defaults.withCredentials = true;

// @Route PUT /myAlfred/api/groups/:group_id/allowedServices
// Data : service_id
// Put allowed service for current company
router.put('/:group_id/allowedServices', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const group_id = req.params.group_id
  const service_id = req.body.service_id
  const supported_percent = req.body.supported_percent

  Service.findById(service_id, 'label professional_access particular_access')
    .then ( service => {
      if (!service) {
        return res.status(404).json({error : `Service ${service._id} introuvable`})
      }
      Group.findById(group_id)
        .then(group => {
          if (!group) {
            return res.status(400).json({msg: 'Groupe introuvable'});
          }
          if (group.type==MICROSERVICE_MODE && !service.professional_access) {
            return res.status(400).json({msg: 'Un département ne peut autoriser que des service professionels'});
          }
          if (group.type==CARETAKER_MODE && !service.particular_access) {
            return res.status(400).json({msg: 'La conciergerie ne peut autoriser que des services aux particuliers'});
          }
          if (group.allowed_services.map(s => s.service).includes(service_id)) {
            return res.status(400).json({msg: 'Ce service est déjà autorisé'});
          }
          group.allowed_services.push({
            service: service_id,
            supported_percent: group.type==MICROSERVICE_MODE ?  1.0 : supported_percent
          })
          group.save()
           .then (group => {
             return res.json(group);
           })
           .catch(err => {
             console.error(err)
             return res.status(404).json({company: 'No group found'})
           })
        })
        .catch(err => {
          console.error(err)
          return res.status(404).json({company: 'No group found'})
        })
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

  Group.findByIdAndUpdate(group_id, {  $pull : { 'allowed_services' : {'_id' : service_id}}})
    .then(group => {
      if (!group) {
        return res.status(400).json({msg: 'No group found'});
      }
      res.json(group);

    })
    .catch(err => {
      console.error(err)
      res.status(404).json({company: 'No group found'})
    })
});

// @Route GET /myAlfred/api/groups
// Gets groups for a company
// @Access private
router.get('/type/:group_type', passport.authenticate('b2badmin', {session: false}), (req, res) => {

  const company_id = req.user.company

  const group_type=req.params.group_type

  if (!Object.keys(DASHBOARD_MODE).includes(group_type)) {
    return res.status(400).json({error: `Type groupe ${group_type} inconnu`})
  }
  Group.find({company : company_id, type: group_type})
    .populate('members', 'firstname name email roles company cards')
    .populate('allowed_services.service', 'label')
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
      Group.create({
        name : req.body.name,
        company : company_id,
        budget_period: req.body.budget_period,
        budget: req.body.budget,
        type: req.body.type,
        cards : req.body.cards
      })
        .then ( group => {res.json(group)})
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

  const {errors, isValid} = validateCompanyGroup(req.body, true);
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
router.delete('/:group_id', passport.authenticate('b2badmin', {session: false}), (req, res) => {

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
      Group.findByIdAndUpdate( group_id, { $addToSet : {members : member_id}})
        .then ( group => {
          Group.updateMany( {_id : { $ne : group_id}}, { $pull : {members : member_id}})
            .then ( () => {
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

  const new_account = req.body.new_account

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
          Group.updateMany({ _id : { $ne : group_id}} , { $pull : {members : manager_id}})
            .then (() => {
              if (new_account) {
                axios.post(new URL(`/myAlfred/api/users/forgotPassword`, computeUrl(req)).toString(), { email: user.email, role: MANAGER})
                  .then(() => {})
                  .catch (err => {})
              }
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
  const manager_id = req.params.manager_id

  User.findByIdAndUpdate(manager_id, { $pull : { roles : MANAGER }}, { new : true})
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

// @Route GET /myAlfred/api/groups/:group_id/budget
// Returns reamingin budget for this group in the period
// @Access private b2badminmanager
router.get('/:group_id/budget', passport.authenticate('b2badminmanager', {session: false}), (req, res) => {
  Group.findById(req.params.group_id, 'budget budget_period members')
    .then( group =>{
      if (!group.budget || !group.budget_period) {
        return res.status(400).json("Ce département n'a pas de budget")
      }
      const start_date=moment().startOf(group.budget_period==MONTH_PERIOD ? 'month' : 'year')
      // get not cancelled bookings for this group from start_date with user_role MANAGER
      Booking.find({
        user : { $in : group.members},
        date : {$gt: start_date},
        user_role : MANAGER,
        status : { $nin : [BOOK_STATUS.REFUSED, BOOK_STATUS.CANCELED, BOOK_STATUS.EXPIRED, BOOK_STATUS.INFO, BOOK_STATUS.PREAPPROVED]}
      })
        .then( bookings => {
          const consumed = _.sumBy(bookings, b => b.amount)
          const remaining = group.budget-consumed
          return res.json(remaining)
        })
        .catch (err => {
          return res.staatus(400).json(err)
        })
    })
    .catch( err =>{
      console.error(err)
      res.status(400).json(err)
    })
})

// @Route GET /myAlfred/api/groups/user/:user_id
// Returns the group for this user if any
// @Access private b2badminmanager
//router.get('/:group_id/budget', passport.authenticate('b2badminmanager', {session: false}), (req, res) => {
router.get('/user/:user_id', passport.authenticate('b2badminmanager', {session: false}), (req, res) => {
  Group.findOne({ members : mongoose.Types.ObjectId(req.params.user_id)})
    .then( group =>{
      res.json(group)
    })
    .catch( err =>{
      console.error(err)
      res.status(400).json(err)
    })
})
module.exports = router;
