const mongoose = require('mongoose')
const Category = require('../../models/Category')
const Service = require('../../models/Service')
const ServiceUser = require('../../models/ServiceUser')
const express = require('express')

const router = express.Router()
const passport = require('passport')
const _ = require('lodash')

router.get('/test', (req, res) => res.json({msg: 'Category Works!'}))

// @Route GET /myAlfred/api/category/currentAlfred
// View all categories
router.get('/currentAlfred', passport.authenticate('jwt', {session: false}), async(req, res) => {

  let serviceUsers = await ServiceUser.find({user: req.user})
  serviceUsers = serviceUsers.map(s => s.service)

  Service.find({_id: {$nin: serviceUsers}})
    .sort({'label': 1})
    .populate('category')
    .sort({'category.label': 1})
    .then(services => {
      if (services.length > 0) {
        let categories = services.map(s => s.category)
        categories = [...new Set(categories)]
        categories.sort((c1, c2) => { return c1.label > c2.label ? 1 : -1 })
        return res.json(categories)
      }
      return res.status(400).json({msg: 'No category found'})
    })
    .catch(err => {
      return res.status(404).json({category: `No category found error:${err}`})
    })
})

// @Route GET /myAlfred/api/category/all
// View all categories
router.get('/particular', (req, res) => {
  Service.find({particular_access: true}, 'category')
    .populate('category')
    .then(services => {
      let categories=_.uniqBy(services.map(s => s.category), c => c._id)
      categories = _.orderBy(categories, 'particular_label')
      res.json(categories)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/category/professional
// View all pro categories, i.e. having at least one service with professional_access
router.get('/professional', (req, res) => {
  Service.find({professional_access: true}, 'category')
    .populate('category')
    .then(services => {
      let categories=_.uniqBy(services.map(s => s.category), c => c._id)
      categories = _.orderBy(categories, 'professional_label')
      res.json(categories)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route GET /myAlfred/api/category/:id
// View one category
router.get('/:id', (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      res.json(category)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})


module.exports = router
