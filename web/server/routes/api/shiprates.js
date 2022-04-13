const express = require('express')
const passport = require('passport')
const lodash=require('lodash')
const moment = require('moment')
const xlsx=require('node-xlsx')
const {extractCsv, shipRatesImport} = require('../../utils/import')
const {TEXT_FILTER, createMemoryMulter} = require('../../utils/filesystem')
const {SHIPRATE} = require('../../../utils/feurst/consts')
const ShipRate = require('../../models/ShipRate')
const {addItem} = require('../../utils/commands')
const {getDataFilter, isActionAllowed} = require('../../utils/userAccess')

const router = express.Router()
const {VIEW}=require('../../../utils/consts')

moment.locale('fr')

const DATA_TYPE=SHIPRATE
const MODEL=ShipRate

// SHIP RATES
const uploadShipRates = createMemoryMulter(TEXT_FILTER)

// @Route GET /myAlfred/api/orders/template
// Returns an order xlsx template for import
// @Access private
router.get('/template', passport.authenticate('jwt', {session: false}), (req, res) => {
  const data = [
    ['Réference', 'Quantité'],
    ['AAAXXXZ', 6],
  ]
  let buffer = xlsx.build([{data: data}])
  res.setHeader('Content-Type', 'application/vnd.openxmlformats')
  res.setHeader('Content-Disposition', 'attachment; filename=order_template.xlsx')
  res.end(buffer, 'binary')
})

// @Route GET /myAlfred/api/shiprates
// View all shiprates
// @Access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, VIEW)) {
    return res.status(301)
  }

  MODEL.find(getDataFilter(req.user, DATA_TYPE, VIEW))
    .then(data => {
      return res.json(data)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route POST /myAlfred/api/products/import
// Imports products from csv
router.post('/import', passport.authenticate('admin', {session: false}), (req, res) => {
  uploadShipRates.single('buffer')(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(404).json({errors: err.message})
    }

    shipRatesImport(req.file.buffer)
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
