const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ThemeSchema=null

try {
  ThemeSchema=require(`../plugins/${getDataModel()}/schemas/ThemeSchema`)
  ThemeSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = ThemeSchema ? mongoose.model('theme', ThemeSchema) : null
