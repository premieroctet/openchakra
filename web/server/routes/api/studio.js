const mongoose=require('mongoose')
const express = require('express')
const lodash=require('lodash')

const router = express.Router()

router.get('/models', (req, res) => {
  const modelNames=lodash.sortBy(mongoose.modelNames())
  const result=[]
  modelNames.forEach(name => {
    result.push({
      name: name,
      attributes: Object.keys(mongoose.model(name).schema.paths)
        .filter(attName => !attName.startsWith('_')),
    })
  })
  // console.log(modelNames.map(m => mongoose.model(m).schema.paths))
  return res.json(result)
})

module.exports=router
