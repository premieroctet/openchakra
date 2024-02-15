const {
  EVENT_DISCRIMINATOR,
  EVENT_MENU,
  EVENT_TYPE,
  HARDNESS,
  MENU_PEOPLE_COUNT
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')
const { DUMMY_REF } = require('../../../utils/database')

const Schema = mongoose.Schema

const MenuSchema = new Schema({
  // Targets: specificity/objectives
  targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
  start_date: {
    type: Date,
    default: new Date(),
    required: [true, 'La date de début est obligatoire']
  },
  end_date: {
    type: Date,
    default: new Date(),
    required: [true, 'La date de fin est obligatoire']
  },
  document: {
    type: String,
    required: false,
  },
  shopping_list: [{
    type: Schema.Types.ObjectId,
    ref: 'recipeIngredient',
  }],
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

MenuSchema.virtual('type').get(function() {
  return EVENT_MENU
})

MenuSchema.virtual('people_count', DUMMY_REF).get(function() {
  return MENU_PEOPLE_COUNT
})

MenuSchema.virtual("recipes", {
  ref: "menuRecipe", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "menu" // is equal to foreignField
});

module.exports = MenuSchema
