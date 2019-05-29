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
    prestation: {
        type: Schema.Types.ObjectId,
        ref: 'prestation'
    }


});

module.exports = Booking = mongoose.model('booking',BookingSchema);
