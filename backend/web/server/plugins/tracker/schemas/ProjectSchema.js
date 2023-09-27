const siret = require('siret')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const lodash=require('lodash')

const Schema = mongoose.Schema

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, `Le nom du projet est requis`],
    },
  },
  schemaOptions,
)

module.exports = ProjectSchema
