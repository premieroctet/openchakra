const {
  COMPANY_ACTIVITY,
  COMPANY_ACTIVITY_BANQUE
} = require('../../../server/plugins/smartdiet/consts')

module.exports={
  COMPANY_NO_INSURANCE_DATA:{
    name: 'S', size: 10, activity: COMPANY_ACTIVITY_BANQUE,
  },
  USER_DATA:{firstname: 'S', lastname: 'S', dataTreatmentAccepted: true,
    cguAccepted: true, pseudo: 'S', phone: '0675774324',
  },
  COACHING_DATA: {},
  APPOINTMENT_DATA: {
    start_date: new Date(),
  },
  OFFER_DATA:{
    groups_credit: 0,
    coaching_credit: 0,
    video_credit:0,
    podcasts_credit:0,
    articles_credit:0,
    infographies_credit:0,
    webinars_credit:0,
    price: 0,
    name: 'Offre test',
    duration: 365,
    nutrition_credit: 5,
  },
  KEY_DATA: {
    name: 'Clé',
    trophy_on_picture: 'off',
    trophy_off_picture: 'off',
    picture:'picture',
    spoons_count_for_trophy:0,
  },
  GROUP_DATA: {
    description: 'description',
    picture: 'picture',
    name: 'Groupe test',
  },
  COLLECTIVE_CHALLENGE_DATA: {
    name: 'Challenge collectif',
    description: 'Challenge collectif',
    spoons: 12,
  },
  COACHING_DATA: {

  },
  APPOINTMENT_DATA: {

  },
}
