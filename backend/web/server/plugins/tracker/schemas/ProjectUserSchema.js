const siret = require('siret')
const lodash=require('lodash')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const {ROLES}=require('../consts')

const Schema = mongoose.Schema

const ProjectUserSchema = new Schema(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: [true, `Le projet est obligatoire`],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, `Le compte est obligatoire`],
    },
    roles: [{
      type: String,
      enum: Object.keys(ROLES),
      required: [true, `Le role sur le projet est obligatoire`],
    }
  },
  schemaOptions,
)

module.exports = ProjectUserSchema
