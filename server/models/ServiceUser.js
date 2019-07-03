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
        prestation:{type: Schema.Types.ObjectId,
            ref: 'prestation'}


        ,
        price: Number
    }],
    equipments: [{

            type: Schema.Types.ObjectId,
            ref: 'equipment'

    }],
    city: {
        type: String,
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
        type: String
    },
    is_certified: {
        type: Boolean,
        default: false
    },
    certification: {
        type: String
    },
    majoration: {
        active: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number
        }
    }
});

module.exports = ServiceUser = mongoose.model('serviceUser',ServiceUserSchema);
