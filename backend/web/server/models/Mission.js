const mongoose = require('mongoose')
const {getDataModel} = require('../../config/config')

let MissionSchema=null

try {
  MissionSchema=require(`../plugins/${getDataModel()}/schemas/MissionSchema`)
  MissionSchema.plugin(require('mongoose-lean-virtuals'))
}
catch(err) {
  if (err.code !== 'MODULE_NOT_FOUND') {
    throw err
  }
}

module.exports = MissionSchema ? mongoose.model('mission', MissionSchema) : null
