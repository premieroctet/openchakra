const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    reference: {
        type: String,
        required: true
    },
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
        beginning: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    alfred: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    prestation: [{
        type: Schema.Types.ObjectId,
        ref: 'prestation'
    }],
    chatroom: {
        type: Schema.Types.ObjectId,
        ref: 'chatroom'
    },
    photoVideo: [{}],
    status: {
        type: String,
        enum: ['Confirmée','Refusée', 'Annulée', 'Terminée', 'Expirée','En attente de confirmation', 'Demande d\'infos', ]
    }


});

module.exports = Booking = mongoose.model('booking',BookingSchema);
