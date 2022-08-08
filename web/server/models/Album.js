const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongooseLeanVirtuals = require('mongoose-lean-virtuals')

const AlbumSchema = new Schema({
  /*
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
  */
  creation_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  pictures: {
    type: [String],
  },
})

AlbumSchema.plugin(mongooseLeanVirtuals)
module.exports = mongoose.model('album', AlbumSchema)
