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

const RecipeSchema = new Schema({
  name:{type:String, required: true},
  duearion: {type:Number, required: false},
  description: {type:String, required: false},
  source: {type:String, required: false},
  colling_duration: {type:Number, required: false},
  freezing_duration: {type:Number, required: false},
  making_duration: {type:Number, required: false},
  marinade_duration: {type:Number, required: false},
  cooking_duration: {type:Number, required: false},
  steps: {type:String, required: false},
  instruments: [{
    type: Schema.Types.ObjectId,
    ref: 'instrument',
  }],
  ingredients: {
    type: Schema.Types.ObjectId,
    ref: 'recipeIngredient',
  },
  nutriscore: {
    type:String,
    enum: Object.keys(NUTRISCORE),
    required: false,
  },
  ecoscore: {
    type:String,
    enum: Object.keys(ECOSCORE),
    required: false,
  },
  targets: {
    type: Schema.Types.ObjectId,
    ref: 'target',
  },
  calories: {
    type: String,
    required: false
  },
  proteins: {
    type:String,
    required: false
  },
  lipids: {
    type:String,
    required: false
  },
  glucids: {
    type:String,
    required: false
  },
  fibers: {
    type:String,
    required: false
  },
  vitamin_A: {
    type:String,
    required: false
  },
  vitamin_C: {
    type:String,
    required: false
  },
  vitamin_D: {
    type:String,
    required: false
  },
  vitamin_E: {
    type:String,
    required: false
  },
  vitamin_K: {
    type:String,
    required: false
  },
  alt: {
    type:String,
    required: false
  },
  calcium: {
    type:String,
    required: false
  },
  magnésium: {
    type:String,
    required: false
  },
  iron: {
    type:String,
    required: false
  },
  phosphore: {
    type:String,
    required: false
  },
  zinc: {
    type:String,
    required: false
  },
  sélénium: {
    type:String,
    required: false
  },
  copper: {
    type:String,
    required: false
  },
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

module.exports = RecipeSchema
