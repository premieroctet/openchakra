const schemaOptions={
  toJSON: {virtuals: true, getters: true},
  toObject: {virtuals: true, getters: true},
  timestamps: {createdAt: 'creation_date', updatedAt: 'update_date'},
}

module.exports={schemaOptions}
