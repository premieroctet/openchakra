const mongoose = require('mongoose')
const {hideIllegal} = require('../../../utils/text')

const Schema = mongoose.Schema

const ServiceUserSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'service',
    required: true,
  },
  prestations: [{
    prestation: {
      type: Schema.Types.ObjectId,
      ref: 'prestation',
    },
    billing: {
      type: Schema.Types.ObjectId,
      ref: 'billing',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  equipments: [{
    type: Schema.Types.ObjectId,
    ref: 'equipment',
  }],
  service_address: {
    type: {
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
    },
    required: true,
  },
  perimeter: {
    type: Number,
  },
  minimum_basket: {
    type: Number,
  },
  deadline_before_booking: {
    type: String,
  },
  diploma: {
    type: {
      name: {
        type: String,
        required: true,
      },
      year: {
        type: String,
      },
      file: {
        type: String,
      },
      skills: [{
        type: String,
      }],
      required: false,
    },
  },
  certification: {
    type: {
      name: {
        type: String,
        required: true,
      },
      year: {
        type: String,
      },
      file: {
        type: String,
      },
      skills: [{
        type: String,
      }],
      required: false,
    },
  },
  option: {
    label: {
      type: String,
    },
    unity: {
      type: String,
    },
    price: {
      type: Number,
    },
    option_extra: {
      type: String,
    },
  },
  description: {
    type: String,
    set: text => hideIllegal(text),
  },
  level: {
    type: Number,
  },
  experience_title: {
    type: String,
  },
  experience_description: {
    type: String,
  },
  experience_skills: [{
    type: String,
  }],
  number_of_views: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Pro', 'Particulier'],
  },
  location: {
    client: Boolean,
    alfred: Boolean,
    visio: Boolean,
    elearning: Boolean,
  },
  // Frais livraison
  pick_tax: {
    type: Number,
    default: 0,
    required: true,
  },
  // Frais déplacement
  travel_tax: {
    type: {
      // Prix au kilometre (euros)
      rate: {
        type: Number,
        default: 0,
        required: true,
      },
      // Kilomètres facturés à partir de 'from'
      from: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    required: false,
  },
  // Particulars can book
  particular_access: {
    type: Boolean,
    required: true,
    sparse: true,
  },
  // Professionals can book
  professional_access: {
    type: Boolean,
    required: true,
    sparse: true,
  },
}, {toJSON: {virtuals: true, getters: true}})

ServiceUserSchema.virtual('is_graduated').get(function() {
  return Boolean(this.diploma && this.diploma.name!='null')
})

ServiceUserSchema.virtual('is_certified').get(function() {
  return Boolean(this.certification && this.certification.name != 'null')
})

ServiceUserSchema.virtual('grade_text').get(function() {
  let grades=[this.diploma, this.certification].filter(x => Boolean(x) && x.name!='null')
  let result=grades.map(grade => {
    let str=grade.name
    if (grade.year) {
      str=`${str}(${grade.year})`
    }
    return str
  }).join(', ')
  return result
})

module.exports=ServiceUserSchema
