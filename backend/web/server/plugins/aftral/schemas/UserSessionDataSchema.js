const {schemaOptions} = require('../../../utils/schemas')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


const UserSessionDataSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  spent_times: [{
    resource: {
      type: Schema.Types.ObjectId,
      ref: 'resource',
      required: true,
    },
    spent_time: {
      type: Number,
      required: true,
    },
  }],
  modules_progress: [{
    resource: {
      type: Schema.Types.ObjectId,
      ref: 'resource',
      required: true,
    },
    module_progress: {
      type: String,
      required: true,
    },
  }],
  annotations: [{
    resource: {
      type: Schema.Types.ObjectId,
      ref: 'resource',
      required: true,
    },
    annotation: {
      type: String,
      required: false,
    },
  }],
  finished: [{
    type: Schema.Types.ObjectId,
    ref: 'resource',
    required: true,
  }],
}, schemaOptions)

module.exports = UserSessionDataSchema
