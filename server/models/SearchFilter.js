const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchFilterSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
});

module.exports = SearchFilter = mongoose.model('searchFilter', SearchFilterSchema);
