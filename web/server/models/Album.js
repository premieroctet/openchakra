const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AlbumSchema=null

try {
  AlbumSchema=require(`./${getDataModel()}/AlbumSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
  AlbumSchema=require(`./others/AlbumSchema`)
}

AlbumSchema?.plugin(mongooseLeanVirtuals)
module.exports = AlbumSchema ? mongoose.model('album', AlbumSchema) : null
