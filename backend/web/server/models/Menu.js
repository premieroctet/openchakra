const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')
const Event = require(`./Event`)

let Menu = null
try {
  if (Event) {
    const MenuSchema = require(`../plugins/${getDataModel()}/schemas/MenuSchema`)
    MenuSchema.plugin(require('mongoose-lean-virtuals'))
    Menu = Event.discriminator('menu', MenuSchema)
  }
}
catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = Menu
