const { schemaOptions } = require('../../utils/schemas');
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


const UserSessionDataSchema = new Schema({
  session: {
    type: Schema.Types.ObjectId,
    ref: 'session',
    required: true,
  },
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
    }
  }],
  finished: [{
    type: Schema.Types.ObjectId,
    ref: 'resource',
    required: true,
  }],
}, schemaOptions)

module.exports = UserSessionDataSchema
