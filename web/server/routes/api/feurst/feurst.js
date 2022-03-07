const { is_development } = require('../../../../config/config');
const {
  computeDescription,
  computePrecos,
} = require('../../../utils/feurst/xl_db')
const FeurstProspect = require('../../../models/FeurstProspect')
const generatePdf = require('../../../utils/generatePdf')
const {sendAutoQuotation, sendCustomQuotation} = require('../../../utils/mailing')

const router = require('express').Router()
const {getDatabase}=require('../../../utils/feurst/xl_db')
const lodash=require('lodash')
const validateFeurstProspect=require('../../../validation/feurstProspect')

// @Route GET /feurst/api/database
// Google callback
router.get('/database', (req, res) => {
  getDatabase()
    .then(db => {
      db.grounds=lodash(Object.keys(db.grounds))
        .groupBy(c => c.split(',')[3])
        .map((value, key) => [key, lodash.uniq(value.map(v => v.split(',')[2])).sort()])
        .fromPairs()
        .value()
      res.json(lodash.omit(db, 'accessories'))
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.get('/auto_quotation_available', (req, res) => {
  computePrecos(req.query)
    .then(precos => {
      res.json(!!precos.accessories)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.post('/auto_quotation', (req, res) => {

  const {errors, isValid}=validateFeurstProspect(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  let prospect=null
  let precos=null

  computePrecos(req.body)
    .then(result => {
      precos=result
      return FeurstProspect.findOneAndUpdate({email: req.body.email}, req.body, {upsert: true, new: true})
    })
    .then(result => {
      prospect=result
      return generatePdf({...req.body, ...precos})
    })
    .then(buffer => {
      sendAutoQuotation(
        // TODO Stocker le mail de Feurst
        'sebastien.auvray@my-alfred.io',
        prospect.email,
        prospect.name,
        prospect.company,
        req.body.quotation_id,
        // TODO Composer la description de la machine
        computeDescription({...req.body, ...precos}),
        buffer,
      )
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.post('/custom_quotation', (req, res) => {

  const {errors, isValid}=validateFeurstProspect(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  sendCustomQuotation(
    // TODO Stocker le mail de Feurst
    'sebastien.auvray@my-alfred.io',
    req.body.email,
    req.body.name,
    req.body.company,
    req.body.quotation_id,
    // TODO Composer la description de la machine
    computeDescription(req.body, true),
  )
  return res.json()
})

is_development() &&
router.post('/quotation', (req, res) => {

  computePrecos(req.body)
    .then(precos => {
      res.json(precos)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })

})
module.exports = router
