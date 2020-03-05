const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = Tag = mongoose.model('tag',TagSchema);
