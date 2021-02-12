const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO : supprimer ce modèle
const AccountSchema = new Schema(
  {
  },
  {
      discriminatorKey: 'accountType',
  }
);

const Account = mongoose.model('account', AccountSchema);
module.exports = Account
