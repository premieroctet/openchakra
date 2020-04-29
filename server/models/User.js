const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const year = new Date().getFullYear()-16;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String
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
    sms_code: {
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
            default: true
      },
      sms: {
          type: Boolean,
          default: true
      }
    },
    notifications_rappel: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        sms: {
            type: Boolean,
            default: true
        }
    },
    notifications_promotions: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        phone: {
          type: Boolean,
          default: true
        },
        sms: {
            type: Boolean,
            default: true
        }
    },
    notifications_community: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        sms: {
            type: Boolean,
            default: true
        }
    },
    notifications_assistance: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        sms: {
            type: Boolean,
            default: true
        }
    },
    score: {
        type: Number,
        default: 0
    },
    score_client: {
        type: Number,
        default: 0
    },
    number_of_reviews: {
        type: Number,
        default: 0
    },
    number_of_reviews_client: {
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
    last_login: [{
        type: Date
    }],
    is_alfred: {
        type: Boolean,
        default: false
    },
    index_google: {
      type: Boolean,
      default: true
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
    },
    chatRooms: {
        type: Schema.Types.ObjectId,
        ref: 'chatRooms'
    },
    id_mangopay: {
        type: String
    },
    avatar_letters: {
      type: String,
      default: function() {
        return (this.firstname.charAt(0)+this.name.charAt(0)).toUpperCase();
      }
    },
    kyc_errors: {
      type: [String],
      default: function() {
        return ['Pas de pièce d\'identité', 'Pas d\'adresse', 'Pas de SIRET'];
      }
    }
});

module.exports = User = mongoose.model('users',UserSchema);
