const moment = require('moment')
const Mission = require('../../models/Mission')
const { addAction, setAllowActionFn } = require('../../utils/studio/actions')

const alle_create_quotation = ({value}) => {
console.log(`value:${JSON.stringify(value)}`)
  return isActionAllowed({action:'alle_create_quotation', dataId:value?._id})
}

addAction('alle_create_quotation', alle_create_quotation)

const alle_refuse_mission = ({value, user}) => {
  return isActionAllowed({action:'all_refuse_mission', dataId:value?._id})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(value._id, {ti_refuse_date: moment()})
    })
}

addAction('alle_refuse_mission', alle_refuse_mission)

const isActionAllowed = ({action, dataId, user}) => {
  if (action=='alle_create_quotation') {
    if (dataId) {
      return Mission.findById(dataId)
        .then(mission => !!mission?.canCreateQuotation())
    }
  }
  if (action=='alle_refuse_mission') {
    return Mission.findById(dataId)
      .then(mission => {
        return !!mission?.canRefuseMission(user)
      })
  }
  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
