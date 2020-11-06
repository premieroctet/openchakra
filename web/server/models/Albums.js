const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  // Album name
  label: {
    type: String,
    required: true,
  },
  // Album main picture
  picture: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required : true
  },
  pictures: [{
    path: String,
  }],
});

module.exports = Album = mongoose.model('albums', AlbumSchema);
