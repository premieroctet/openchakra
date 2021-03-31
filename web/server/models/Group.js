const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {BUDGET_PERIOD}=require('../../utils/consts');


const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company : {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  },
  members : [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  allowed_services: [{
    type: Schema.Types.ObjectId,
    ref: 'service',
  }],
  budget : {
    type : Number,
  },
  budget_period:{
    type : String,
    enum : [null, ...Object.keys(BUDGET_PERIOD)],
  },
  // Allower Mangopay card ids
  cards: [{
    type: String,
  }]
});

const Group = mongoose.model('group', GroupSchema);

module.exports = Group;
