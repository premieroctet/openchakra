const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsletterSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

module.exports = Newsletter = mongoose.model('newsletter', NewsletterSchema);
