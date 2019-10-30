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
        type: String,
        required: true
    },
    time_prestation: {
        type: String,
        required: true
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
    chatroom: {
        type: Schema.Types.ObjectId,
        ref: 'chatroom'
    },
    fileUpload: [{
        type: Schema.Types.Mixed
    }],
    fees: {
        type: Number
    },
    status: {
        type: String,
        enum: ['Confirmée','Refusée', 'Annulée', 'Terminée', 'Expirée', 'En attente de confirmation', 'Demande d\'infos', ]
    }


});

module.exports = Booking = mongoose.model('booking',BookingSchema);
