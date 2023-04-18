const {
  EVENT_DISCRIMINATOR,
  EVENT_MENU,
  EVENT_TYPE,
  HARDNESS
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const MenuSchema = new Schema({
  // Targets: specificity/objectives
  targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

MenuSchema.virtual('type').get(function() {
  return EVENT_MENU
})

module.exports = MenuSchema
