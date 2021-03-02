const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text');

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
});

const Group = mongoose.model('group', GroupSchema);

module.exports = Group;
