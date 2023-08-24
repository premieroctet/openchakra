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
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

MenuSchema.virtual('type').get(function() {
  return EVENT_MENU
})

MenuSchema.virtual('people_count').get(function() {
  return MENU_PEOPLE_COUNT
})

MenuSchema.virtual("_recipes", {
  ref: "menuRecipe", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "menu" // is equal to foreignField
});

MenuSchema.virtual("shopping_list", {localField: 'tagada', foreignField: 'tagada'}).get(function() {
  return null
})

MenuSchema.virtual("recipes", {localField: 'tagada', foreignField: 'tagada'}).get(function() {
  const POSITION_ORDER={
    MEAL_POSITION_STARTER:0,
    MEAL_POSITION_DISH:1,
    MEAL_POSITION_DESSERT:2,
  }
  return lodash.sortBy(this._recipes, menuRecipe => parseInt(menuRecipe.day)*10+POSITION_ORDER[menuRecipe.position])
})

module.exports = MenuSchema
