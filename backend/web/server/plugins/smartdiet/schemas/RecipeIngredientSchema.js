const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')
const {
  ECOSCORE,
  EVENT_DISCRIMINATOR,
  EVENT_MENU,
  EVENT_TYPE,
  HARDNESS,
  NUTRISCORE
} = require('../consts')

const Schema = mongoose.Schema

const RecipeIngredientSchema = new Schema({
  ingredient: {
    type: Schema.Types.ObjectId,
    ref: 'ingredient',
    required: [true, "L'ingrédient est obligatoire"],
  },
  quantity: {
    type: Number,
    min: 0,
    required: [true, 'La quantité est obligatoire'],
  },
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

module.exports = RecipeIngredientSchema
