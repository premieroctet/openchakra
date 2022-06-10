const mongooseLeanVirtuals = require('mongoose-lean-virtuals')
const {Schema}=require('mongoose')

const AddressSchema=new Schema({
  label: {
    type: String,
    required: false,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  country: {
    type: String,
  },
  gps: {
    lat: Number,
    lng: Number,
  },
})

AddressSchema.plugin(mongooseLeanVirtuals)

module.exports=AddressSchema
