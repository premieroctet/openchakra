const express = require('express')
const passport = require('passport')
const moment = require('moment')
const {priceListImport} = require('../../utils/import')
const {isActionAllowed} = require('../../utils/userAccess')
const {VIEW, CREATE} = require('../../../utils/consts')
const {PRICELIST} = require('../../../utils/feurst/consts')
const PriceList = require('../../models/PriceList')
const {XL_FILTER, createMemoryMulter} = require('../../utils/filesystem')

const router = express.Router()
moment.locale('fr')

// PRODUCTS
const uploadProducts = createMemoryMulter(XL_FILTER)

const DATA_TYPE=PRICELIST

// @Route GET /myAlfred/api/products
// View all products
// optional ?pattern=XX filters on reference
// @Access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.sendStatus(301)
  }

  PriceList.find()
    .sort('name reference')
    .then(prices => {
      res.json(prices)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route POST /myAlfred/api/products/import-price
// Imports prices from csv
router.post('/import', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, CREATE)) {
    return res.sendStatus(301)
  }

  uploadProducts.single('buffer')(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(404).json({errors: err.message})
    }

    const options=JSON.parse(req.body.options)

    priceListImport(PriceList, req.file.buffer, null, {...options, key: 'reference', update: true})
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.error(err)
        res.status(500).error(err)
      })
  })
})


module.exports = router
