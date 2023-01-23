const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AlbumSchema=null

try {
  AlbumSchema=require(`../plugins/${getDataModel()}/schemas/AlbumSchema`)
  AlbumSchema.plugin(mongooseLeanVirtuals)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AlbumSchema ? mongoose.model('album', AlbumSchema) : null
