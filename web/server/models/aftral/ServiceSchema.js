const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const BaseSchema = require('../others/ServiceSchema')

const ServiceSchema = BaseSchema.clone()

ServiceSchema.add({
  // Reference
  reference: String,
  // Training duration in hours
  duration_hours: {
    type: Number,
    required: true,
  },
  // Training duration in hours
  duration_days: {
    type: Number,
    required: true,
  },
  documents: [String],
  level: String,
  cpf: Boolean,
})

ServiceSchema.plugin(mongooseLeanVirtuals)

module.exports=ServiceSchema
