const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    label: {
        type: String,
        required: true
    },
    picture: {
        type: String
    },
    description: {
        type: String
    },
    tags: [{
    type: Schema.Types.ObjectId,
    ref: 'tag'
    }]
});

CategorySchema.index({label:'text'});

module.exports = Category = mongoose.model('category',CategorySchema);
