
const express = require('express')
const passport = require('passport')
const moment = require('moment')
const xlsx=require('node-xlsx')
const {HTTP_CODES} = require('../../utils/errors')
const {shipRatesImport} = require('../../utils/import')
const {TEXT_FILTER, createMemoryMulter} = require('../../utils/filesystem')
const {SHIPRATE} = require('../../../utils/consts')
const ShipRate = require('../../models/ShipRate')
const {isActionAllowed} = require('../../utils/userAccess')

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
    return res.sendStatus(HTTP_CODES.FORBIDDEN)
  }

  MODEL.find()
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
      return res.status(HTTP_CODES.NOT_FOUND).json({errors: err.message})
    }

    const options=JSON.parse(req.body.options)

    shipRatesImport(req.file.buffer, options)
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
