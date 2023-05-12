const {
  EVENT_DISCRIMINATOR,
  EVENT_TYPE,
  EVENT_WEBINAR,
  HARDNESS
} = require('../consts')
const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const WebinarSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: [true, 'La compagnie est obligatoire'],
  },
  url: {
    type: String,
    required: [true, "L'URL est obligatoire"],
  },
  animator:{
    type: String,
    required: false,
  },
},
{...schemaOptions, ...EVENT_DISCRIMINATOR}
)

WebinarSchema.virtual('type').get(function() {
  return EVENT_WEBINAR
})

module.exports = WebinarSchema
