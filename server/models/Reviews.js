const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    content: {
        type: String,
    },
    note_alfred: {
        prestation_quality:{
            type: Number,
            max: 5,
            min: 0,
            default:0,
        },
        quality_price: {
            type: Number,
            max: 5,
            min: 0,
            default:0,
        },
        relational: {
            type: Number,
            max: 5,
            min: 0,
            default:0,
        },
        global: {
	    type: Number,
	    max: 5,
            min: 0,
            default:0,
        },
        careful: { // Travail soigné
          type: Boolean,
          default: false
        },
        punctual: { // Ponctuel
          type: Boolean,
          default: false
        },
        flexible: { 
          type: Boolean,
          default: false
        },
        reactive: { // Réactif
          type: Boolean,
          default: false
        }
    },
    note_client: {
        reception:{
            type: Number,
            max: 5,
            min: 0,
            default:0,
        },
        accuracy: {
            type: Number,
            max: 5,
            min: 0,
            default:0,
        },
        relational: {
            type: Number,
            max: 5,
            min: 0,
            default:0,
        },
        global: {
            type: Number,
            max: 5,
            min: 0,
            default:0,
        },
        careful: { // Travail soigné
          type: Boolean,
          default: false
        },
        punctual: { // Ponctuel
          type: Boolean,
          default: false
        },
        flexible: { 
          type: Boolean,
          default: false
        },
        reactive: { // Réactif
          type: Boolean,
          default: false
        }
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    serviceUser: {
        type: Schema.Types.ObjectId,
        ref: 'serviceUser'
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
