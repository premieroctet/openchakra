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

/**
Returns this address's department (i.e. 76400 => 76, 01300 || 1300 => 1, null||''||undefined => null
*/
AddressSchema.virtual('department').get(function() {
  if (!this.zipCode) {
    return null
  }
  return parseInt(String(this.zipCode).slice(0, -3))
})


module.exports=AddressSchema
