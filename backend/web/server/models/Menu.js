const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')
const Event = require(`./Event`)

let Menu = null
try {
  if (Event) {
    const MenuSchema = require(`../plugins/${getDataModel()}/schemas/MenuSchema`)
    MenuSchema.plugin(mongooseLeanVirtuals)
    Menu = Event.discriminator('menu', MenuSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = Menu
