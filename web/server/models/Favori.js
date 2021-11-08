const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FavorisSchema = new Schema({
  alfred: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = FavorisSchema
