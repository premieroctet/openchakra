const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let CommissionSchema=null

try {
  CommissionSchema=require(`../plugins/${getDataModel()}/schemas/CommissionSchema`)
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

CommissionSchema?.plugin(mongooseLeanVirtuals)
module.exports = CommissionSchema ? mongoose.model('commission', CommissionSchema) : null
