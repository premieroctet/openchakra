const { ROLE_COMPANY_BUYER } = require('./consts')
const Quotation = require('../../models/Quotation')
const moment = require('moment')
const Mission = require('../../models/Mission')
const { addAction, setAllowActionFn } = require('../../utils/studio/actions')
const {sendQuotationSentToCustomer} = require('./mailing')

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

const alle_send_quotation = ({value, user}) => {
  return isActionAllowed({action:'alle_send_quotation', dataId:value?._id})
    .then(ok => {
      if (!ok) {return false}
      return Quotation.findById(value._id)
        .populate({path: 'mission', populate: {path: 'job', populate : {path: 'user'}}})
        .then(quotation=> {
          sendQuotationSentToCustomer({quotation})
          return Mission.findByIdAndUpdate(
            quotation.mission._id,
            {quotation_sent_date: moment()}
          )
        })
    })
}

addAction('alle_send_quotation', alle_send_quotation)

const alle_accept_quotation = ({value, user}) => {
  return isActionAllowed({action:'alle_accept_quotation', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Quotation.findById(value._id)
        .then(quotation=> {
          return Mission.findByIdAndUpdate(
            quotation.mission._id,
            {customer_accept_quotation_date: moment()}
          )
        })
    })
}
addAction('alle_accept_quotation', alle_accept_quotation)

const alle_refuse_quotation = ({value, user}) => {
  return isActionAllowed({action:'alle_refuse_quotation', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Quotation.findById(value._id)
        .then(quotation=> {
          return Mission.findByIdAndUpdate(
            quotation.mission._id,
            {customer_refuse_quotation_date: moment()}
          )
        })
    })
}
addAction('alle_refuse_quotation', alle_refuse_quotation)

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
  if (action=='alle_send_quotation') {
    return Quotation.findById(dataId)
      .populate('details')
      .then(quotation => {
        return !!quotation?.canSend(user)
      })
  }
  if (action=='alle_accept_quotation') {
    return Quotation.findById(dataId)
      .populate('details')
      .then(quotation => {
        return /**user.role==ROLE_COMPANY_BUYER && */ !!quotation?.canAccept(user)
      })
  }
  if (action=='alle_refuse_quotation') {
    return Quotation.findById(dataId)
      .populate('details')
      .then(quotation => {
        return /**user.role==ROLE_COMPANY_BUYER && */ !!quotation?.canRefuse(user)
      })
  }
  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
