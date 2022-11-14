const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContactSchema = new Schema({
}, {toJSON: {virtuals: true, getters: true}})


ContactSchema.virtual('name').get(() => {
  return null
})

module.exports = ContactSchema
