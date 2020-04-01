const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    equipments: [{
            type: Schema.Types.ObjectId,
            ref: 'equipment'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    picture: {
        type: String
    },
    description: {
        type: String
    },
    majoration: {
        type: String
    },
    travel_expense: {
        type: String
    },
    picking_expense: {
        type: String
    },
    location: {
      // Adresse du client
      client   : Boolean,
      // Adresse de l'Alfred
      alfred : Boolean,
      // Visioconférence
      visio  : Boolean
    },
    // Frais livraison
    pick_tax: {
      type: Boolean
    },
    // Frais déplacement
    travel_tax: {
      type: Boolean
    }
});

ServiceSchema.index({label:'text'});

module.exports = Service = mongoose.model('service',ServiceSchema);
