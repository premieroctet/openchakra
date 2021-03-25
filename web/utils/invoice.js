const moment = require("moment");

moment.locale('fr');

const invoiceFormat = (num, places) => {
  return String(num).padStart(places, '0')
}

// const resetInvoiceNum = (date) => {
//
// }
module.exports = {invoiceFormat}