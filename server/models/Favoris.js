const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavorisSchema = new Schema({
  alfred: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },


});

module.exports = Favoris = mongoose.model('favoris', FavorisSchema);
