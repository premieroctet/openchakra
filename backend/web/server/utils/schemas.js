const {
  CREATED_AT_ATTRIBUTE,
  UPDATED_AT_ATTRIBUTE
} = require('../../utils/consts')

const schemaOptions={
  toJSON: {virtuals: true, getters: true},
  toObject: {virtuals: true, getters: true},
  timestamps: {createdAt: CREATED_AT_ATTRIBUTE, updatedAt: UPDATED_AT_ATTRIBUTE},
}

module.exports={schemaOptions}
