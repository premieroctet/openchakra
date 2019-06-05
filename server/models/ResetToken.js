const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetTokenSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        expires: 3600
    },
    token: String
});

module.exports = ResetToken = mongoose.model('resetToken',ResetTokenSchema);
