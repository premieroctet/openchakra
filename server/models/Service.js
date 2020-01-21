const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    equipments: [{
            type: Schema.Types.ObjectId,
            ref: 'equipment'
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],
    picture: {
        type: String
    },
    description: {
        type: String
    },
    majoration: {
        type: String
    },
    location: {
      home   : Boolean,
      alfred : Boolean,
      visio  : Boolean
    }
});

module.exports = Service = mongoose.model('service',ServiceSchema);
