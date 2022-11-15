const mongooseLeanVirtuals=require('mongoose-lean-virtuals')
const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let CommissionSchema=null

try {
  CommissionSchema=require(`./${getDataModel()}/CommissionSchema`)
}
catch(err) {
  CommissionSchema=null
}

CommissionSchema?.plugin(mongooseLeanVirtuals)
module.exports = CommissionSchema ? mongoose.model('commission', CommissionSchema) : null
