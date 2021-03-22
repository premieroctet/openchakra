const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text');

const ServiceSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  equipments: [{
    type: Schema.Types.ObjectId,
    ref: 'equipment',
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag',
  }],
  picture: {
    type: String,
  },
  description: {
    type: String,
  },
  majoration: {
    type: String,
  },
  travel_expense: {
    type: String,
  },
  picking_expense: {
    type: String,
  },
  location: {
    // Adresse du client
    client: Boolean,
    // Adresse de l'Alfred
    alfred: Boolean,
    // Visioconférence
    visio: Boolean,
  },
  // Frais livraison
  pick_tax: {
    type: Boolean,
  },
  // Frais déplacement
  travel_tax: {
    type: Boolean,
  },
  s_label: {
    type: String,
    required: true,
  },
  // Particulars can book
  particular_access: {
    type: Boolean,
    required: true,
  },
  // Professionals can book
  professional_access: {
    type: Boolean,
    required: true,
  }
}, {
  toJSON: {virtuals: true, getters: true},
  toObject: { virtuals: true, getters: true }
});

ServiceSchema.virtual('prestations', {
   ref: 'prestation', //The Model to use
   localField: '_id', //Find in Model, where localField
   foreignField: 'service', // is equal to foreignField
});

ServiceSchema.index({label: 'text'});

const Service = mongoose.model('service', ServiceSchema);

module.exports = Service;
