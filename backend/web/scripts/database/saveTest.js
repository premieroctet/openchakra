const { getDataModel, getDatabaseUri } = require('../../config/config')
const fs=require('fs')
const path=require('path')
const lodash=require('lodash')
const { MONGOOSE_OPTIONS, getModels } = require('../../server/utils/database')
const mongoose = require('mongoose')
require(`../../server/plugins/${getDataModel()}/functions`)

const checkConsistency = () => {
  const modelsFolder=path.join(__dirname, '../../server/models')
  const files=fs.readdirSync(modelsFolder)
  console.log(`Opening ${getDatabaseUri()}`)
  return Promise.all(files.map(f => require(path.join(modelsFolder, f))))
    .then(() => mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS))
    .then(() => {
      const models=mongoose.modelNames()
      console.log(models)
      return Promise.all(models.map(m => {
        return mongoose.models[m].find()
          .then(res => {console.log(`${m}:${res.length}`);return Promise.all(res.map(r => r.save().catch(err => console.error(`${m}.${r._id}:${err}`))))})
      }))
    })
}

checkConsistency()
  .then(() => process.exit(0))
  .catch(err => console.error(err) || process.exit(1))

module.exports={
  checkConsistency
}
