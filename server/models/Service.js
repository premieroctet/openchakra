const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text')

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
    },
    s_label: {
      type: String,
      default: function() {
        console.log("Computing")
        return normalize(this.label)
      }
    },
});

ServiceSchema.index({label:'text'});

const Service = mongoose.model('service',ServiceSchema);

// To update s_label
Service.find({})
  .then (services => {
    services.forEach( s => s.save());
  }
)

module.exports = Service;
