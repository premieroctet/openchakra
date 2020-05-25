const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {normalize} = require('../../utils/text')

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
  }],
  s_label: {
    type: String,
    default: function() {
      return normalize(this.label)
    }
  },
});

CategorySchema.index({label:'text'});

const Category = mongoose.model('category',CategorySchema);

// To update s_label
Category.find({})
  .then (categories => {
    categories.forEach( c => c.save());
  }
)

module.exports = Category;
