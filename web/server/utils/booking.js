const moment = require('moment')

moment.locale('fr')

const getNextNumber = value => {
  if (value == undefined || null) {
    return value = 1
  }
  return value += 1

}

const getKeyDate = () => {
  return moment().format('YMM')
}

module.exports = {
  getNextNumber, getKeyDate,
}
