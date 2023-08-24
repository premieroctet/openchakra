const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let LogbookDaySchema=null

try {
  LogbookDaySchema=require(`../plugins/${getDataModel()}/schemas/LogbookDaySchema`)
  LogbookDaySchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = LogbookDaySchema ? mongoose.model('logbookDay', LogbookDaySchema) : null
