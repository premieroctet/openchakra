const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceUserSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'service'
    },
    prestations:[{
        prestation:{
            type: Schema.Types.ObjectId,
            ref: 'prestation'
        },
        billing: {
            type: String
        },
        price: Number
    }],
    equipments: [{

            type: Schema.Types.ObjectId,
            ref: 'equipment'

    }],
    service_address: {
        address: {
            type: String
        },
        city: {
            type: String
        },
        zip_code: {
            type: String
        },
        country: {
            type: String
        },
        gps : {
            lat: Number,
            lng: Number
        }
    },
    perimeter: {
        type: Number
    },
    minimum_basket: {
        type: Number
    },
    deadline_before_booking: {
        type: String
    },
    graduated: {
        type: Boolean,
        default: false
    },
    diploma: {
        name: {
            type: String
        },
        year: {
            type: String
        },
        file: {
            type: String
        }
    },
    is_certified: {
        type: Boolean,
        default: false
    },
    certification: {
        name: {
            type: String
        },
        year: {
            type: String
        },
        file: {
            type: String
        }
    },
    option: {
      label: {
          type: String
      },
      unity: {
          type: String
      },
      price: {
          type: Number
      },
      option_extra: {
          type: String
      }
    },
    description: {
        type: String
    },
    level: {
        type: Number
    },
    number_of_views: {
        type: Number,
        default : 0
    },
    status: {
        type: String,
        enum: [
            'Pro',
            'Particulier',
        ]
    }
});

module.exports = ServiceUser = mongoose.model('serviceUser',ServiceUserSchema);
