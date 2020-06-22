const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CESU}=require('../../utils/consts')

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
    // particulier CESU : oblige, accepte, refuse
    cesu : {
        type: String,
        enum: CESU,
        default: 'Disabled',
    },
    // Eligible au crédit impôt service
    cis : {
      type: Boolean,
      default: false,
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    // Mangopay as seller
    id_mangopay: {
        type: String
    },
    // SS number
    social_security: {
      type: String,
    }
});

module.exports = Shop = mongoose.model('shop',ShopSchema);
