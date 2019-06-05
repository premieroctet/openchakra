const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    note: {
        quality_price:{
            type: Number,
            max: 5,
            min: 0
        },
        punctuality: {
            type: Number,
            max: 5,
            min: 0
        },
        prestation: {
            type: Number,
            max: 5,
            min: 0
        },
        global: {
          type: Number,
          max: 5,
          min: 0
        }
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'booking'
    },
    alfred: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }


});

module.exports = Reviews = mongoose.model('reviews',ReviewsSchema);
