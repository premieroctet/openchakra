const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO To complete
const QuotationSchema = new Schema({
}, {toJSON: {virtuals: true, getters: true}})

module.exports = QuotationSchema
