const {
  ECOSCORE,
  EVENT_DISCRIMINATOR,
  EVENT_MENU,
  EVENT_TYPE,
  HARDNESS,
  NUTRISCORE,
  UNIT
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  picture: {
    type: String,
    required: [true, "L'illustration' est obligatoire"]
  },
  unit: {
    type: String,
    enum: Object.keys(UNIT),
    required: [true, "L'unité est obligatoire"]
  },
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

module.exports = IngredientSchema
