const { schemaOptions } = require('../../utils/schemas');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContactSchema = new Schema({
}, schemaOptions)


ContactSchema.virtual('name').get(() => {
  return null
})

module.exports = ContactSchema
