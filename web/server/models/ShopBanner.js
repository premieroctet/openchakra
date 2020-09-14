const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShopBannerSchema = new Schema({
  label: {
    type: String,
  },
  picture: {
    type: String,
  },
});

module.exports = ShopBanner = mongoose.model('shopBanner', ShopBannerSchema);
