const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    label: {
        type: String,
        required: true
    }
});

module.exports = Job = mongoose.model('job',JobSchema);
