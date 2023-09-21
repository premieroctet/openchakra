const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ItemSchema=null

try {
  ItemSchema=require(`../plugins/${getDataModel()}/schemas/ItemSchema`)
  ItemSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ItemSchema ? mongoose.model('item', ItemSchema) : null
