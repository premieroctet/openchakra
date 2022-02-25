const FeurstProspect = require('../../../models/FeurstProspect')
const generatePdf = require('../../../utils/generatePdf')
const {sendAutoQuotation2Client, sendAutoQuotation2Feurst,
  sendCustomQuotation2Client, sendCustomQuotation2Feurst} = require('../../../utils/mailing')
const {computePrecos} = require('../../../utils/feurst/xl_db')

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

router.post('/preconisations', (req, res) => {
  computePrecos(req.body)
    .then(precos => {
      res.json(precos)
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

router.post('/quotation', (req, res) => {

  const {errors, isValid}=validateFeurstProspect(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  let prospect=null
  FeurstProspect.findOneAndUpdate({email: req.body.email}, req.body, {upsert: true, new: true})
    .then(result => {
      prospect=result
      return generatePdf({
        name: prospect.name,
        company: prospect.company,
        email: prospect.email},
      req.body.precos)
    })
    .then(buffer => {
      sendAutoQuotation2Client(
        prospect.email,
        prospect.name,
        req.body.quotation_id,
        req.body.machine,
        buffer,
      )
      sendAutoQuotation2Feurst(
        'sebastien.auvray@my-alfred.io',
        prospect.name,
        prospect.email,
        prospect.company,
        req.body.quotation_id,
        req.body.machine,
        buffer,
      )
      return res.json()
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })
})

module.exports = router
