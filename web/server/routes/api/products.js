const fs=require('fs')
const path=require('path')
const lodash=require('lodash')
const express = require('express')
const passport = require('passport')
const moment = require('moment')

const CronJob = require('cron').CronJob
const PriceList = require('../../models/PriceList')
const {JSON_TYPE} = require('../../../utils/feurst/consts')
const storage = require('../../utils/storage')
const {getExchangeDirectory} = require('../../../config/config')
const {
  productsImport,
  stockImport,
} = require('../../utils/import')
const {isActionAllowed} = require('../../utils/userAccess')
const {DELETE} = require('../../../utils/feurst/consts')
const {XL_FILTER, createMemoryMulter} = require('../../utils/filesystem')
const {PRODUCT, CREATE} = require('../../../utils/consts')
const Product = require('../../models/Product')
const {validateProduct}=require('../../validation/product')

const router = express.Router()

moment.locale('fr')

// PRODUCTS
const uploadProducts = createMemoryMulter(XL_FILTER)

const DATA_TYPE=PRODUCT

// @Route GET /myAlfred/api/products
// View all products
// optional ?pattern=XX filters on reference
// @Access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {

  let andFilter= () => true
  let noSpaceFilter= () => true

  if (req.query.pattern) {
    const pattern=req.query.pattern.replace(/[^A-Za-z0-9]/g, '')
    // Create AND filter
    const elements=pattern.split(' ')
    const andPattern=new RegExp(elements.map(e => `(?=.*${e})`).join(''), 'i')
    andFilter=p => `${p.reference} ${p.description} ${p.description_2}`.match(andPattern)

    // Create NOSPACE filter
    const query=new RegExp(pattern.replace(/\s/g, ''), 'i')
    noSpaceFilter=p => `${p.reference}${p.description}${p.description_2}`.replace(/\s/g, '').match(query)
  }

  Product.find({})
    .sort('reference')
    .then(products => {
      const andEdProducts=products.filter(andFilter)
      const noSpaceProducts=products.filter(noSpaceFilter)
      const filteredProducts= andEdProducts.length>noSpaceProducts.length ?andEdProducts : noSpaceProducts
      // For customer, only allow products having net price
      if (req.user.company) {
        return PriceList.find({name: {$in: [req.user.company.catalog_prices, req.user.company.net_prices]}})
          .then(prices => {
            const pricedReferences=prices.map(p => p.reference)
            return filteredProducts.filter(p => pricedReferences.includes(p.reference))
          })
      }
      return filteredProducts
    })
    .then(products => {
      return res.json(products)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route POST /myAlfred/api/products
// Create a product
// @Access private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const {errors, isValid}=validateProduct(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  Product.create(req.body, {runValidators: true})
    .then(product => {
      return res.json(product)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route PUT /myAlfred/api/products
// Update a product
// @Access private
router.put('/:product_id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Product.findByIdAndUpdate(req.params.product_id, req.body, {runValidators: true, new: true})
    .then(product => {
      if (!product) {
        return res.status(404).json()
      }
      return res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route DELETE /myAlfred/api/products
// Deletes a product
// @Access private
router.delete('/:product_id', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, DELETE)) {
    return res.sendStatus(301)
  }

  Product.findByIdAndDelete(req.params.product_id, {runValidators: true, new: true})
    .then(product => {
      if (!product) {
        return res.status(404).json()
      }
      return res.json()
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})

// @Route POST /myAlfred/api/products/import
// Imports products from csv
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

    productsImport(req.file.buffer, options)
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        console.error(err)
        return res.status(500).json(err)
      })
  })
})

// @Route POST /myAlfred/api/products/import-stock
// Imports stock from csv
router.post('/import-stock', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (!isActionAllowed(req.user.roles, DATA_TYPE, CREATE)) {
    return res.status(401).json()
  }

  uploadProducts.single('buffer')(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(404).json({errors: err.message})
    }

    const options=JSON.parse(req.body.options)
    stockImport(req.file.buffer, options)
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.error(err)
        return res.status(500).json(err)
      })
  })
})

// Check new stock file
new CronJob('0 0 */12 * * *', () => {
  const store=storage.namespace('exchange')
  const folder=getExchangeDirectory()
  const latest_date=new Date(JSON.parse(store.get('latest-products-import')))
  console.log(`Checking for new stock file in ${folder} newer than ${latest_date}(${typeof latest_date})`)
  try {
    const files=fs.readdirSync(folder)
    const latestFile=lodash(files)
      .map(f => path.join(folder, f))
      .filter(f => /\.json$/i.test(f) && fs.statSync(f).mtime > latest_date)
      .maxBy(f => fs.statSync(f).mtime)
    console.log(`Got latest file:${latestFile}`)
    if (latestFile) {
      const logFile=`${latestFile}_import.log`
      store.set('latest-products-import', JSON.stringify(fs.statSync(latestFile).mtime))
      const contents=fs.readFileSync(latestFile)
      stockImport(contents, {format: JSON_TYPE})
        .then(res => {
          console.log(`Import result:${JSON.stringify(res)}`)
          fs.writeFileSync(logFile, `${new Date()}\nImport result:${JSON.stringify(res)}\n`)
        })
        .catch(err => {
          console.error(err)
          fs.writeFileSync(logFile, `${new Date()}\nImport error:${JSON.stringify(res)}\n`)
        })
        .finally(() => {
          console.log(`Deleting import file ${latestFile}`)
          fs.unlinkSync(latestFile)
        })
    }
  }
  catch(err) {
    console.error(err)
  }
}, null, true, 'Europe/Paris')

module.exports = router
