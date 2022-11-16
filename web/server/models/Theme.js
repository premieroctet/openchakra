const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let ThemeSchema=null

try {
  ThemeSchema=require(`./${getDataModel()}/ThemeSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

ThemeSchema?.plugin(mongooseLeanVirtuals)
module.exports = ThemeSchema ? mongoose.model('theme', ThemeSchema) : null
