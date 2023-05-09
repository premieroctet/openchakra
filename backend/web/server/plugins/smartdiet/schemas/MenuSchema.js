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
  start_date: {
    type: Date,
    required: [true, 'La date de début est obligatoire']
  },
  end_date: {
    type: Date,
    required: [true, 'La date de fin est obligatoire']
  },
  lunch_recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'recipe',
  }],
  dinner_recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'recipe',
  }],
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

MenuSchema.virtual('type').get(function() {
  return EVENT_MENU
})

module.exports = MenuSchema
