const {COMPANY_ACTIVITY} = require('../../../server/plugins/smartdiet/consts')

module.exports={
  COMPANY_DATA:{
    name: 'S', size: 10, activity: Object.keys(COMPANY_ACTIVITY)[0],
  },
  USER_DATA:{firstname: 'S', lastname: 'S', dataTreatmentAccepted: true,
    cguAccepted: true, pseudo: 'S', phone: '0', email: 's',
  },
  COACHING_DATA: {},
}
