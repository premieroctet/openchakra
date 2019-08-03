const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const year = new Date().getFullYear()-16;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,

    },
    firstname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        max: `${year}-01-01`,
        required: true
    },
    phone: {
        type: String
    },
    billing_address: {
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
    service_address: [{
        address: {
            type: String
        },
        city: {
            type: String
        },
        zip_code: {
            type: String
        },
        lat: {
            type: Number

        },
        lng: {
            type: Number
        },
        label: {
            type: String
        },
        floor: {
            type: String
        },
        note: {
            type: String
        },
        phone_address: {
            type: String
        }
    }],
    picture: {
        type: String
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    job: {
        type: String
    },
    diplomes: {
      type: String
    },
    school: {
      type: String
    },
    languages: [{
        type: String
    }],
    emergency_phone: {
      type: String
    },
    description: {
      type: String
    },
    id_card: {
      recto: {
          type: String
      },
      verso: {
          type: String
      }
    },
    account: {
        bank: {
            type: String
        },
        name: {
            type: String
        },
        iban: {
            type: String
        },
        bic: {
            type: String
        }
    },
    notifications_message: {
      email: {
          type: Boolean,
          default: true
      },
      push: {
            type: Boolean,
            default: false
      },
      sms: {
          type: Boolean,
          default: false
      },
    },
    notifications_rappel: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: false
        },
        sms: {
            type: Boolean,
            default: false
        },
    },
    notifications_promotions: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: false
        },
        phone: {
          type: Boolean,
          default: false
        },
        sms: {
            type: Boolean,
            default: false
        },
    },
    notifications_community: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: false
        },
        sms: {
            type: Boolean,
            default: false
        },
    },
    notifications_assistance: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: false
        },
        sms: {
            type: Boolean,
            default: false
        },
    },
    score: {
        type: Number,
        default: 0
    },
    number_of_reviews: {
        type: Number,
        default: 0
    },
    number_of_views: {
        type: Number,
        default : 0
    },
    active: {
        type: Boolean,
        default: true
    },
    is_confirmed: {
      type: Boolean,
      default: false
    },
    id_confirmed: {
      type: Boolean,
      default: false
    },
    phone_confirmed: {
      type: Boolean,
      default: false
    },
    is_alfred: {
        type: Boolean,
        default: false
    },
    super_alfred: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: Schema.Types.ObjectId,
        ref: 'resetToken'
    }



});

module.exports = User = mongoose.model('users',UserSchema);
