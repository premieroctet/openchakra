const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    reference: {
        type: String,
        required: true
    },
    address: {
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
    service: {
        type: String,
        required: true
    },
    equipments: [{
        type: Schema.Types.ObjectId,
        ref: 'equipment'
    }],
    amount: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    date_prestation: {
        type: String,
        required: true
    },
    time_prestation: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    },
    end_time: {
        type: String
    },
    alfred: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    prestations: [{}],
    option: {
        label: {
            type: String
        },
        price: {
            type: Number
        }
    },
    chatroom: {
        type: Schema.Types.ObjectId,
        ref: 'chatRooms'
    },
    fileUpload: [{
        type: Schema.Types.Mixed
    }],
    fees: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Confirmée','Refusée', 'Annulée', 'Terminée', 'Expirée', 'En attente de confirmation', 'Demande d\'infos', 'Invitation à réserver', 'Pré-approuvée' ]
    },
    serviceUserId: {
        type: String
    },
    alfred_evaluated: {
      type: Boolean,
      default: false
    },
    user_evaluated: {
        type: Boolean,
        default: false
    },
    paid: {
        type: Boolean,
        default: false
    },
    date_payment: {
        type: Date
    }
});

module.exports = Booking = mongoose.model('booking',BookingSchema);
