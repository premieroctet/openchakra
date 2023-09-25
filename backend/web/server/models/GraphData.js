const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let GraphDataSchema=null

try {
  GraphDataSchema=require(`../plugins/${getDataModel()}/schemas/GraphDataSchema`)
  GraphDataSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = GraphDataSchema ? mongoose.model('graphData', GraphDataSchema) : null
