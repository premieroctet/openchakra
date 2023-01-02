const mongoose = require('mongoose')
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
}, schemaOptions)

module.exports = UserSessionDataSchema
