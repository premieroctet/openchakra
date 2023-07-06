const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')

const Schema = mongoose.Schema

const GroupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
  },
  picture: {
    type: String,
    required: [true, 'L\'illustration est obligatoire'],
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
  },
  moderator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Le modérateur est obligatoire'],
  },
  // Targets: specificity/objectives
  targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
  companies: [{
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: false,
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false,
  }],
  key: {
    type: Schema.Types.ObjectId,
    ref: 'key',
    required: [true, 'La clé est obligatoire'],
  },
}, schemaOptions)

GroupSchema.virtual('messages', {
  ref: "message", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "group" // is equal to foreignField
});

GroupSchema.virtual('pinned_messages', {localField: 'dummy', foreignField: 'dummy'}).get(function () {
  return []
})

GroupSchema.virtual('users_count', {localField: 'dummy', foreignField: 'dummy'}).get(function () {
  return this.users?.length||0
})

GroupSchema.virtual('messages_count', {localField: 'dummy', foreignField: 'dummy'}).get(function () {
  return this.messages?.length||0
})

module.exports = GroupSchema
