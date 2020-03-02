const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    booking_request: {
        type: Boolean,
        default: false
    },
    no_booking_request: {
      type: Boolean,
      default: false
    },
    my_alfred_conditions: {
        type: Boolean,
        default: false
    },
    profile_picture: {
        type: Boolean,
        default: false
    },
    identity_card: {
        type: Boolean,
        default: false
    },
    recommandations: {
        type: Boolean,
        default: false
    },
    welcome_message: {
        type: String
    },
    flexible_cancel: {
        type: Boolean,
        default: false
    },
    moderate_cancel: {
        type: Boolean,
        default: false
    },
    strict_cancel: {
        type: Boolean,
        default: false
    },
    verified_phone: {
        type: Boolean,
        default: false
    },
    is_particular: {
        type: Boolean
    },
    is_professional: {
        type: Boolean
    },
    company: {
        name: {
            type: String
        },
        creation_date: {
            type: String
        },
        siret: {
            type: String
        },
        naf_ape: {
            type: String
        },
        status: {
            type: String
        }
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'serviceUser'

    }],
    alfred: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    picture: String,
    creation_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Shop = mongoose.model('shop',ShopSchema);
