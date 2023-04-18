const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let CommissionSchema=null

try {
  CommissionSchema=require(`../plugins/${getDataModel()}/schemas/CommissionSchema`)
  CommissionSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = CommissionSchema ? mongoose.model('commission', CommissionSchema) : null
