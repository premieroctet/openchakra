const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const year = new Date().getFullYear() - 16;
const {getMangopayMessage} = require('../../utils/i18n');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    max: `${year}-01-01`,
    required: true,
  },
  phone: {
    type: String,
  },
  sms_code: {
    type: String,
  },
  billing_address: {
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
  service_address: [{
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zip_code: {
      type: String,
    },
    lat: {
      type: Number,

    },
    lng: {
      type: Number,
    },
    label: {
      type: String,
    },
    floor: {
      type: String,
    },
    note: {
      type: String,
    },
    phone_address: {
      type: String,
    },
  }],
  picture: {
    type: String,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  job: {
    type: String,
  },
  diplomes: {
    type: String,
  },
  school: {
    type: String,
  },
  languages: [{
    type: String,
  }],
  emergency_phone: {
    type: String,
  },
  description: {
    type: String,
  },
  id_card: {
    recto: {
      type: String,
    },
    verso: {
      type: String,
    },
  },
  registration_proof: {
    type: String,
  },
  account: {
    bank: {
      type: String,
    },
    name: {
      type: String,
    },
    iban: {
      type: String,
    },
    bic: {
      type: String,
    },
  },
  notifications_message: {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: true,
    },
  },
  notifications_rappel: {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: true,
    },
  },
  notifications_promotions: {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: true,
    },
  },
  notifications_community: {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: true,
    },
  },
  notifications_assistance: {
    email: {
      type: Boolean,
      default: true,
    },
    push: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: true,
    },
  },
  score: {
    type: Number,
    default: 0,
  },
  score_client: {
    type: Number,
    default: 0,
  },
  number_of_reviews: {
    type: Number,
    default: 0,
  },
  number_of_reviews_client: {
    type: Number,
    default: 0,
  },
  number_of_views: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
  is_confirmed: {
    type: Boolean,
    default: false,
  },
  id_confirmed: {
    type: Boolean,
    default: false,
  },
  phone_confirmed: {
    type: Boolean,
    default: false,
  },
  last_login: [{
    type: Date,
  }],
  is_alfred: {
    type: Boolean,
    default: false,
  },
  index_google: {
    type: Boolean,
    default: true,
  },
  super_alfred: {
    type: Boolean,
    default: false,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: Schema.Types.ObjectId,
    ref: 'resetToken',
  },
  chatRooms: {
    type: Schema.Types.ObjectId,
    ref: 'chatRooms',
  },
  // Mangopay as client
  id_mangopay: {
    type: String,
    default: null,
  },
  // Mangopay as provider
  mangopay_provider_id: {
    type: String,
    default: null,
  },
  // Provider status : NATURAL or LEGAL
  mangopay_provider_status: {
    type: String,
  },
  identity_proof_id: {
    type: String,
  },
  registration_proof_id: {
    type: String,
  },
  id_card_status: {
    type: String,
  },
  id_card_error: {
    type: String,
  },
  registration_proof_status: {
    type: String,
  },
  registration_proof_error: {
    type: String,
  },
}, {toJSON: {virtuals: true, getters: true}});

UserSchema.virtual('id_card_error_text').get(function () {
  return getMangopayMessage(this.id_card_error);
});

UserSchema.virtual('id_card_status_text').get(function () {
  return getMangopayMessage(this.id_card_status);
});

UserSchema.virtual('avatar_letters').get(function () {
  const first_letter = this.firstname ? this.firstname.charAt(0) : '';
  const second_letter = this.name ? this.name.charAt(0) : '';
  return (first_letter + second_letter).toUpperCase();
});

module.exports = User = mongoose.model('users', UserSchema);
