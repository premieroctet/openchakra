const { getDataModel, getDatabaseUri } = require('../../config/config')
const fs=require('fs')
const path=require('path')
const lodash=require('lodash')
const { MONGOOSE_OPTIONS, getModels } = require('../../server/utils/database')
const mongoose = require('mongoose')
require(`../../server/plugins/${getDataModel()}/functions`)

const checkAttribute = (modelName, record, [attName, attParams]) => {
  const ids=(attParams.multiple ? record[attName]: [record[attName]])?.filter(id => !!id)
  if (lodash.isNil(ids) || lodash.isEmpty(ids)) {
    return null
  }
  return Promise.all(ids.map(id => mongoose.models[attParams.type].exists({_id: id})))
    .then(res => {
      return res.forEach((exists, idx) => {if (!exists) {
        console.error(`${modelName} #${record._id} ${attName}: ${attParams.type} #${ids[idx]} not found`)
        return null
      }})
    })
}

const checkModel = model => {
  return mongoose.models[model.name].find()
    .then(records => {
      return Promise.all(records.map(record => {
        return Promise.all(Object.entries(model.attributes).map(attribute => checkAttribute(model.name, record, attribute)))
      }))
    })
}

const loadSaveModel = model => {
  return mongoose.models[model.name].find()
    .then(records => Promise.all(records.map(record => record.save().catch(err => {console.log(record, err.message); throw err}))))
}

const checkConsistency = () => {
  const modelsFolder=path.join(__dirname, '../../server/models')
  const files=fs.readdirSync(modelsFolder)
  console.log(`Opening ${getDatabaseUri()}`)
  return Promise.all(files.map(f => require(path.join(modelsFolder, f))))
    .then(() => mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS))
    .then(() => getModels())
    // .then(models => {
    //   // Grab references attributes
    //   return lodash(models)
    //     .values()
    //     .map(model => ({...model, attributes: lodash(model.attributes).pickBy((params, att) => !att.includes('.') && params.ref).value()}))
    //     .filter(model => !lodash.isEmpty(model.attributes))
    //     .value()
    // })
    // .then(models => Promise.all(models.map(model => checkModel(model))))
    .then(models => Promise.all(Object.values(models).map(model => loadSaveModel(model))))

}

checkConsistency()

module.exports={
  checkConsistency
}
