const moment = require("moment")

moment.locale('fr');

const getNextNumber = (value) => {
  if (value == undefined || null) {
    return value = 1;
  } else {
    return value += 1;
  }
}

const getKeyDate = () => {
  return moment(date).format("YMM")
}

const getField = (t) => {
  return t + '_number'
}
module.exports = {
  getNextNumber, getKeyDate, getField
}
