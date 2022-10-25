const mongoose = require('mongoose')
const Schema = mongoose.Schema
const lodash=require('lodash')
const ThemeSchema = require('./ThemeSchema')


const TraineeThemeSchema = new Schema({
  ...ThemeSchema.obj,
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'traineeResource',
    required: false,
  }],
}, {toJSON: {virtuals: true, getters: true}})

TraineeThemeSchema.virtual('spent_time').get(function() {
  return lodash.sum(this.resources.map(r => r.spent_time))
})

module.exports = TraineeThemeSchema
