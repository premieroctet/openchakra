const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
    booking_request: {
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
    id_recto: {
        type: String
    },
    id_verso: {
        type: String
    },
    verified_phone: {
        type: Boolean,
        default: false
    },
    is_particular: {
        type: Boolean,

    },
    is_professional: {
        type: Boolean,

    },
    self_employed: {
        type: Boolean,

    },
    individual_company: {
        type: Boolean,

    },
    company: {
        name: {
            type: String
        },
        creation_date: {
            type: Date
        },
        siret: {
            type: String
        },
        naf_ape: {
            type: String
        },
        vat_number: {
            type: String
        }
    },
    services: [{
        label :{
            type: Schema.Types.ObjectId,
            ref: 'serviceUser'
        },
        description: {
            type: String
        }
    }],
    alfred: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    picture: String


});

module.exports = Shop = mongoose.model('shop',ShopSchema);
