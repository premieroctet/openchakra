const {
  DAYS,
  EVENT_DISCRIMINATOR,
  EVENT_MENU,
  EVENT_TYPE,
  HARDNESS,
  PERIOD
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const MenuRecipeSchema = new Schema({
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'menu',
    required: [true, 'Le menu est obligatoire'],
  },
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'recipe',
    required: [true, 'La recette est obligatoire'],
  },
  day: {
    type: String,
    enum: Object.keys(DAYS),
    required: [true, 'Le jour est obligatoire']
  },
  period: {
    type: String,
    enum: Object.keys(PERIOD),
    required: [true, 'Le moment (déjeuner/dîner) est obligatoire']
  }
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

MenuRecipeSchema.index(
  { menu: 1, day: 1, period:1  },
  { unique: true, message: 'Un menu existe déjà pour ce repas' });

module.exports = MenuRecipeSchema
