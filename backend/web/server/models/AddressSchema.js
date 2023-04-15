const {Schema}=require('mongoose')
const lodash=require('lodash')

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
  phone: {
    type: String,
  },
  gps: {
    lat: Number,
    lng: Number,
  },
})

AddressSchema.methods.match = function(rhs) {

  const normalizeText= txt => {
    return txt && txt.replace(/\s/g, '') || txt
  }

  const labelRE=new RegExp(`^${normalizeText(this.label)}$`, 'i')
  const normalizeAddress = obj => {
    const FIELDS=['address', 'city', 'zip_code', 'country']
    return FIELDS.map(f => lodash.get(obj, f)).map(normalizeText).join(';')
  }

  const thisFieldsRE=new RegExp(`^${normalizeAddress(this)}$`, 'i')
  const rhsFields=normalizeAddress(rhs)

  const match=labelRE.test(normalizeText(rhs.label)) || thisFieldsRE.test(rhsFields)
  return match
}

AddressSchema.plugin(require('mongoose-lean-virtuals'))

module.exports=AddressSchema
