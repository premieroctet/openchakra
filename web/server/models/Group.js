const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text');
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
    enum : Object.keys(BUDGET_PERIOD),
  }
});

const Group = mongoose.model('group', GroupSchema);

module.exports = Group;
