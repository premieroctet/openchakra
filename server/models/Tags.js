const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    label: {
        type: String,
        required: true
    }
});

module.exports = Tag = mongoose.model('tag',TagSchema);
