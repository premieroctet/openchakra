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

const InstrumentSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  picture: {
    type: String,
    required: [true, "L'illustration est obligatoire"]
  },
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

module.exports = InstrumentSchema
