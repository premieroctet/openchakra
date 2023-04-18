const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let AlbumSchema=null

try {
  AlbumSchema=require(`../plugins/${getDataModel()}/schemas/AlbumSchema`)
  AlbumSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = AlbumSchema ? mongoose.model('album', AlbumSchema) : null
