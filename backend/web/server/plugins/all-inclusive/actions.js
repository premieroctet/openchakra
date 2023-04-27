const { ROLE_COMPANY_BUYER } = require('./consts')
const Quotation = require('../../models/Quotation')
const moment = require('moment')
const Mission = require('../../models/Mission')
const { addAction, setAllowActionFn } = require('../../utils/studio/actions')
const {sendQuotationSentToCustomer} = require('./mailing')

const alle_create_quotation = ({value}) => {
  return isActionAllowed({action:'alle_create_quotation', dataId:value?._id, user})
}

addAction('alle_create_quotation', alle_create_quotation)

const alle_refuse_mission = ({value}, user) => {
  return isActionAllowed({action:'all_refuse_mission', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(value._id, {ti_refuse_date: moment()})
    })
}

addAction('alle_refuse_mission', alle_refuse_mission)

const alle_cancel_mission = ({value}, user) => {
  return isActionAllowed({action:'alle_cancel_mission', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(value._id, {customer_cancel_date: moment()})
    })
}

addAction('alle_cancel_mission', alle_cancel_mission)

const alle_send_quotation = ({value}, user) => {
  return isActionAllowed({action:'alle_send_quotation', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Quotation.findById(value._id)
        .populate({path: 'mission', populate: {path: 'job', populate : {path: 'user'}}})
        .then(quotation=> {
          sendQuotationSentToCustomer({quotation})
          return Mission.findByIdAndUpdate(
            quotation.mission._id,
            {quotation_sent_date: moment(),
              customer_refuse_quotation_date: null,
              customer_accept_quotation_date: null
            }
          )
        })
    })
}

addAction('alle_send_quotation', alle_send_quotation)

const alle_accept_quotation = ({value}, user) => {
  return isActionAllowed({action:'alle_refuse_quotation', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(
        value?._id,
        {customer_accept_quotation_date: moment(),
          customer_refuse_quotation_date: null,
        }
      )
    })
}
addAction('alle_accept_quotation', alle_accept_quotation)

const alle_refuse_quotation = ({value}, user) => {
  return isActionAllowed({action:'alle_refuse_quotation', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(
        value?._id,
        {customer_refuse_quotation_date: moment(),
          customer_accept_quotation_date: null,
        }
      )
    })
}
addAction('alle_refuse_quotation', alle_refuse_quotation)

const alle_show_quotation = ({value}, user) => {
  return isActionAllowed({action:'alle_show_quotation', dataId:value?._id, user})
}
addAction('alle_show_quotation', alle_show_quotation)

const alle_edit_quotation = ({value}, user) => {
  return isActionAllowed({action:'alle_edit_quotation', dataId:value?._id, user})
}
addAction('alle_edit_quotation', alle_edit_quotation)

const alle_finish_mission = ({value}, user) => {
  return isActionAllowed({action:'alle_finish_mission', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(
        value._id,
        {ti_finished_date: moment()}
      )
    })
}
addAction('alle_finish_mission', alle_finish_mission)

const alle_store_bill = ({value}, user) => {
  return isActionAllowed({action:'alle_store_bill', dataId:value?._id, user})
  .then(ok => {
    if (!ok) {return false}
    return Mission.findByIdAndUpdate(
      value._id,{
        customer_accept_billing_date: null,
        customer_refuse_billing_date: null,
      }
    )
  })
}
addAction('alle_store_bill', alle_store_bill)

const alle_show_bill = ({value}, user) => {
  return isActionAllowed({action:'alle_show_bill', dataId:value?._id, user})
}
addAction('alle_show_bill', alle_show_bill)

const alle_accept_bill = ({value}, user) => {
  return isActionAllowed({action:'alle_accept_bill', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(
        value._id,
        {customer_accept_billing_date: moment()}
      )
    })
}
addAction('alle_accept_bill', alle_accept_bill)

const alle_refuse_bill = ({value}, user) => {
  return isActionAllowed({action:'alle_refuse_bill', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(
        value._id,
        {customer_refuse_billing_date: moment()}
      )
    })
}
addAction('alle_refuse_bill', alle_refuse_bill)

const alle_leave_comment = ({value}, user) => {
  return isActionAllowed({action:'alle_leave_comment', dataId:value?._id, user})
}
addAction('alle_leave_comment', alle_leave_comment)

const isActionAllowed = ({action, dataId, user}) => {
  if (action=='alle_create_quotation') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canCreateQuotation())
  }
  if (action=='alle_refuse_mission') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canRefuseMission(user))
  }
  if (action=='alle_cancel_mission') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canCancelMission(user))
  }
  if (action=='alle_send_quotation') {
    return Quotation.findById(dataId)
      .populate('details')
      .then(quotation => quotation?.canSend(user))
  }
  if (action=='alle_accept_quotation') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canAcceptQuotation(user))
  }
  if (action=='alle_refuse_quotation') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canRefuseQuotation(user))
  }
  if (action=='alle_show_quotation') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canShowQuotation(user))
  }
  if (action=='alle_edit_quotation') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canEditQuotation(user))
  }
  if (action=='alle_finish_mission') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canFinishMission(user))
  }
  if (action=='alle_store_bill') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canStoreBill(user))
  }
  if (action=='alle_show_bill') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canShowBill(user))
  }
  if (action=='alle_accept_bill') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canAcceptBill(user))
  }
  if (action=='alle_refuse_bill') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canRefuseBill(user))
  }
  if (action=='alle_leave_comment') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canLeaveComment(user))
  }

  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
