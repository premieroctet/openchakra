const { schemaOptions } = require('../../utils/schemas');
const mongoose = require('mongoose')

const Schema = mongoose.Schema

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
  picture: {
    type: String,
  },
  description: {
    type: String,
  },
  majoration: {
    type: String,
  },
  location: {
    // Adresse du client
    client: Boolean,
    // Adresse de l'Alfred
    alfred: Boolean,
    // Visioconférence
    visio: Boolean,
    // Visioconférence
    elearning: Boolean,
  },
  // Frais livraison
  pick_tax: {
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
}, schemaOptions)

// travel_tax available for any service made at customer's place
ServiceSchema.virtual('travel_tax').get(function() {
  return this && this.location && this.location.client
})

ServiceSchema.virtual('prestations', {
  ref: 'prestation', // The Model to use
  localField: '_id', // Find in Model, where localField
  foreignField: 'service', // is equal to foreignField
})

ServiceSchema.index({label: 'text'})

module.exports=ServiceSchema
