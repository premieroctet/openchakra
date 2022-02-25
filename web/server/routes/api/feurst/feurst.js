const FeurstProspect = require('../../../models/FeurstProspect')
const generatePdf = require('../../../utils/generatePdf')
const {sendQuotation} = require('../../../utils/mailing')
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
      const grounds=lodash.uniq(Object.keys(db.grounds).map(k => {
        const elemGrounds = k.split(',')
        return {
          groundType: elemGrounds[2],
          groundHardness: elemGrounds[3],
        }
      })).filter((value, index, self) =>
        index === self.findIndex(t => (
          t.groundType === value.groundType && t.groundHardness === value.groundHardness
        )),
      ).sort()
      res.json({...db, grounds: grounds})
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
      sendQuotation(
        prospect.email,
        prospect.name,
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
