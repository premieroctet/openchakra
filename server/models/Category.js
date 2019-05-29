const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    label: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
});

module.exports = Category = mongoose.model('category',CategorySchema);
