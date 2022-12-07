const {getDataModel}=require('../config/config')

const I18N_common=require('../static/locales/fr/common')
const I18N_customer=require(`../static/locales/fr/${getDataModel()}`)
const I18N_custom=require(`../static/locales/fr/${getDataModel()}_custom`)

const customerI18N={...I18N_common, ...I18N_customer}

Object.entries(I18N_custom).forEach(([key, customValue]) => {
  const customerValue=customerI18N[key]
  if (!customerValue) {
    // console.log(`In custom only:${key}`)
  }
  else if (customValue!=customerValue) {
    // console.log(`Overriden: ${key} (${customerValue}, ${customValue})`)
  }
  else {
    console.log(`Same value: ${key} (${customerValue}, ${customValue})`)
  }
})
