const mongoose = require('mongoose')
const moment=require('moment')
const {schemaOptions} = require('../../utils/schemas')
const Schema = mongoose.Schema


const UserSessionDataSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  guests: [{
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event',
      required: true,
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: 'guest',
      required: true,
    },
  }],
  guests_count: [{
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event',
      required: true,
    },
    count: {
      type: Number
    },
  }],
  payments: [{
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event',
      required: false,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'order',
      required: false,
    },
    amount: {
      type: Number,
      min: 0,
      required: true,
    },

    date: {
      type: Date,
      default: () => moment(),
      required: true,
    }
  }],
}, schemaOptions)

module.exports = UserSessionDataSchema
