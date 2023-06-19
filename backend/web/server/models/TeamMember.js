const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let TeamMemberSchema=null

try {
  TeamMemberSchema=require(`../plugins/${getDataModel()}/schemas/TeamMemberSchema`)
  TeamMemberSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = TeamMemberSchema ? mongoose.model('teamMember', TeamMemberSchema) : null
