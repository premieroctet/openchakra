const { schemaOptions } = require('../../utils/schemas');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventLogSchema = new Schema({
  // Event date
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // Super account (i.e logged as)
  super_account: {
    type: {
      // Keep track if not deleted
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false,
      },
      full_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    required: false,
  },
  // Logged account
  account: {
    type: {
      // Keep track if not deleted
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false,
      },
      full_name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    // Events can be logged even if no user connected
    required: false,
  },
  // Category
  category: {
    type: String,
    required: true,
  },
  // Title
  title: {
    type: String,
    default: Date.now,
    required: true,
  },
  // Description
  description: {
    type: String,
    default: Date.now,
  },
  // Custom data if required
  data: {
    type: Schema.Types.Mixed,
    required: false,
  },
}, schemaOptions)

module.exports = EventLogSchema
