const siret = require('siret')
const lodash=require('lodash')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const {ISSUE_STATUS, ISSUE_STATUS_NEW}=require('../consts')

const Schema = mongoose.Schema

const IssueSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, `Le titre est requis`],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: [true, `Le projet est obligatoire`],
    },
    status: {
      type: String,
      enum: Object.keys(ISSUE_STATUS),
      default: ISSUE_STATUS_NEW,
      required: [true, `Le statut est obligatoire`],
    }
  },
  schemaOptions,
)

module.exports = IssueSchema
