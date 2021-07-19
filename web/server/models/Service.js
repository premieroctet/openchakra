const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  equipments: [{
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
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
    sparse: true,
  },
  // Particulars can book
  particular_access: {
    type: Boolean,
    required: true,
    sparse: true,
  },
  // Professionals can book
  professional_access: {
    type: Boolean,
    required: true,
    sparse: true,
  },
}, {
  toJSON: {virtuals: true, getters: true},
  toObject: {virtuals: true, getters: true},
})

ServiceSchema.virtual('prestations', {
  ref: 'Prestation', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'service', // is equal to foreignField
})

ServiceSchema.index({label: 'text'})

module.exports = ServiceSchema
