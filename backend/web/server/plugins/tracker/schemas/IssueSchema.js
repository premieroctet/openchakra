const {
  ISSUE_CATEGORY,
  ISSUE_KIND,
  ISSUE_PRIORITY,
  ISSUE_STATUS,
  ISSUE_STATUS_NEW
} = require('../consts')
const siret = require('siret')
const lodash=require('lodash')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const IssueSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, `Le créateur est obligatoire`],
    },
    title: {
      type: String,
      required: [true, `Le titre est requis`],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: [true, `Le projet est obligatoire`],
    },
    reference: {
      type: String
    },
    kind: {
      type: String,
      enum: Object.keys(ISSUE_KIND),
      required: [true, 'Le type est obligatoire'],
    },
    category: {
      type: String,
      enum: Object.keys(ISSUE_CATEGORY),
      required: [true, 'La catégorie est obligatoire'],
    },
    page: {
      type: String,
      required: false,
    },
    account: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: [true, 'Le titre est obligatoire'],
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
    },
    priority: {
      type: String,
      enum: Object.keys(ISSUE_PRIORITY),
      required: [true, 'La priorité est obligatoire'],
    },
    observed_date: {
      type: Date,
      required: [true, `La date d'observation est obligatoire`],
    },
    status: {
      type: String,
      enum: Object.keys(ISSUE_STATUS),
      default: ISSUE_STATUS_NEW,
      required: [true, `Le statut est obligatoire`],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'issue',
      required: false,
    },
    document: {
      type: String,
      required: false,
    },
    estimated_duration: {
      type: Number,
      required: false,
    },
    git_branch: {
      type: String,
      required: false,
    },
    observed_version: {
      type: String,
      required: false,
    },
  },
  schemaOptions,
)

module.exports = IssueSchema
