const moment=require("moment")

moment.locale('fr');

const getNextNumber = (value) => {
  // count
  // type billing
  // key 4 chiffre année et mois
  // 1,2,.4
  return value += 1;
}

const getKeyDate = () => {
  return moment(date).format("YMM")
}

module.exports = {
  getNextNumber, getKeyDate
}
