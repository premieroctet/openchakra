const {
  BLADE_SHAPES,
  FIX_TYPES,
} = require('../../../../utils/feurst_consts')
const {is_development} = require('../../../../config/config')
const {
  computeDescription,
  computePrecos,
  getHardness,
  getFamily,
} = require('../../../utils/feurst/xl_db')
const FeurstProspect = require('../../../models/FeurstProspect')
const generatePdf = require('../../../utils/generatePdf')
const {sendAutoQuotation, sendCustomQuotation} = require('../../../utils/mailing')

const router = require('express').Router()
const {getDatabase}=require('../../../utils/feurst/xl_db')
const lodash=require('lodash')
const validateFeurstProspect=require('../../../validation/feurstProspect')
const i18n=require('../../../utils/i18n_init')

// @Route GET /feurst/api/database
// Google callback
router.get('/database', (req, res) => {
  getDatabase()
    .then(db => {
      const grounds=lodash(Object.keys(db.grounds))
        .groupBy(c => c.split(',')[3])
        .map((value, key) => [key, lodash.uniq(value.map(v => v.split(',')[2])).sort()])
        .fromPairs()
        .value()
      const result={
        machines: db.machines,
        thicknesses: db.thicknesses,
        grounds: grounds,
      }
      res.json(result)
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
  const t=i18n.default.getFixedT(null, 'feurst')
  const data={...req.body,
    bladeShape: t(BLADE_SHAPES[req.body.bladeShape]),
    teethShieldFixType: t(FIX_TYPES[req.body.teethShieldFixType]),
    borderShieldFixType: t(FIX_TYPES[req.body.borderShieldFixType]),
  }

  computePrecos(req.body)
    .then(result => {
      precos=result
      return FeurstProspect.findOneAndUpdate({email: req.body.email}, req.body, {upsert: true, new: true})
    })
    .then(result => {
      prospect=result
      return generatePdf({...data, ...precos})
    })
    .then(buffer => {
      sendAutoQuotation(
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
    req.body.email,
    req.body.name,
    req.body.company,
    req.body.quotation_id,
    // TODO Composer la description de la machine
    computeDescription(req.body, true),
  )
  return res.json()
})

router.get('/thicknesses', (req, res) => {
  getDatabase()
    .then(db => {
      const hardness=getHardness(db, req.query)
      const family=getFamily(db, {...req.query, hardness: hardness})
      const pattern=new RegExp(`${req.query.type||'.*'},${family||'.*'},.*,${req.query.bladeShape||'.*'}`)
      const keys=Object.keys(db.accessories).filter(v => pattern.test(v))
      const thicknesses=lodash.uniq(keys.map(k => k.split(',')[2])).map(v => parseInt(v)).sort()
      res.json(thicknesses)
    })
    .catch(err => {
      console.error(err)
      res.status(500).json(err)
    })
})
is_development() &&
router.post('/quotation', (req, res) => {

  computePrecos(req.body)
    .then(precos => {
      res.json({...req.body, ...precos})
    })
    .catch(err => {
      console.error(err)
      return res.status(500).json(err)
    })

})

module.exports = router
