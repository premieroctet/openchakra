const Contact = require('../../models/Contact')
const axios = require('axios')

const {
  sendAccountCreatedToAdmin,
  sendAccountCreatedToCustomer,
  sendAccountCreatedToTIPI,
  sendAccountDeactivated,
  sendAskContact,
  sendAskRecomandation,
  sendForgotPassword,
  sendQuotationSentToCustomer
} = require('./mailing')
const {
  getHostUrl,
  getProductionUrl,
  paymentPlugin
} = require('../../../config/config')

const { isEmailOk } = require('../../../utils/sms')
const { getModel, loadFromDb } = require('../../utils/database')
const {
  CONTACT_STATUS,
  ROLE_ALLE_ADMIN,
  ROLE_COMPANY_BUYER,
  ROLE_TI
} = require('./consts')
const {
  generatePassword,
  validatePassword
} = require('../../../utils/passwords')
const { BadRequestError } = require('../../utils/errors')
const Quotation = require('../../models/Quotation')
const moment = require('moment')
const Mission = require('../../models/Mission')
const User = require('../../models/User')
const { addAction, setAllowActionFn } = require('../../utils/studio/actions')

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
            }
          )
        })
    })
}
addAction('alle_send_quotation', alle_send_quotation)

const alle_accept_quotation = ({value, paymentSuccess, paymentFailure}, user) => {
  return isActionAllowed({action:'alle_accept_quotation', dataId:value, user})
    .then(ok => {
      if (!ok) {return false}
      return loadFromDb({model: 'mission', id:value, fields:['job.user','quotations.total']})
    })
    .then(([mission]) => {
      console.log(JSON.stringify(mission.quotations, null, 2))
      const [success_url, failure_url]=[paymentSuccess, paymentFailure].map(p => `${getHostUrl()}${p}`)
      return paymentPlugin.createPayment({source_user: user, amount:mission.quotations[0].total, fee:0,
        destination_user: mission.job.user, description: 'Un test',
        success_url, failure_url,
    })
    .then(payment => {
      console.log(JSON.stringify(payment, null, 2))
      return Mission.findByIdAndUpdate(value, {payin_id:payment.id, payin_achieved:null})
        .then(() =>payment.url)
    })
    .then(url => ({redirect: url}))
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
        customer_accept_bill_date: null,
        customer_refuse_bill_date: null,
      }
    )
  })
}
addAction('alle_store_bill', alle_store_bill)


const alle_send_bill = ({value}, user) => {
  return isActionAllowed({action:'alle_send_bill', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      return Mission.findByIdAndUpdate(
        value._id,
        {bill_sent_date: moment(),
         customer_refuse_bill_date: null,
         customer_accept_bill_date: null
        })
    })
}
addAction('alle_send_bill', alle_send_bill)

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
        {customer_accept_bill_date: moment()}
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
        {customer_refuse_bill_date: moment()}
      )
    })
}
addAction('alle_refuse_bill', alle_refuse_bill)

const alle_leave_comment = ({value}, user) => {
  return isActionAllowed({action:'alle_leave_comment', dataId:value?._id, user})
}
addAction('alle_leave_comment', alle_leave_comment)

const deactivateAccount = ({value, reason}, user) => {
  return isActionAllowed({action:'deactivateAccount', dataId:value?._id, user})
    .then(ok => {
      if (!ok) {return false}
      if (!reason?.trim()) {
        throw new BadRequestError('La raison de désactivation est obligatoire')
      }
      return User.findByIdAndUpdate(
        value._id,
        {active: false, unactive_reason: reason}
      )
      .then(user => {
        sendAccountDeactivated({user})
        return user
      })
    })
}
addAction('deactivateAccount', deactivateAccount)

const registerAction = props => {
  console.log(`ALLE Register with ${JSON.stringify(props)}`)
  return User.exists({email: props.email})
    .then(exists => {
      if (exists) {
        return Promise.reject(`Un compte avec le mail ${props.email} existe déjà`)
      }
      if (!props.password) {
        props.password=generatePassword()
        props.password2=props.password
        return Promise.resolve()
      }
      return validatePassword({...props})
    })
    .then(() => User.create({...props, role: props.role || ROLE_TI}))
    .then(user => {
      const sendWelcome=
        user.role==ROLE_TI ? sendAccountCreatedToTIPI
        : user.role==ROLE_COMPANY_BUYER ? sendAccountCreatedToCustomer
        : user.role==ROLE_ALLE_ADMIN ? sendAccountCreatedToAdmin
        : null
      if (!sendWelcome) {
        throw new BadRequestError(`Pas de mail de création de compte défini pour le role ${props.role}`)
      }
      sendWelcome({user, password: props.password})
      if (user.role==ROLE_TI) {
        return paymentPlugin.upsertProvider(user)
      }
      if (user.role==ROLE_COMPANY_BUYER) {
        return paymentPlugin.upsertCustomer(user)
      }
      return user
    })
}
addAction('register', registerAction)

const forgotPasswordAction=({context, parent, email}) => {
  return User.findOne({email})
   .then(user => {
     if (!user) {
       throw new BadRequestError(`Aucun compte n'est associé à cet email`)
     }
     const password=generatePassword()
     user.password=password
     return user.save()
       .then(user => sendForgotPassword({user, password}))
       .then(user => `Un email a été envoyé à l'adresse ${email}`)
   })
}
addAction('forgotPassword', forgotPasswordAction)

const askContactAction=(props) => {
  return new Contact(props).validate()
    .then(() => props.document ? axios.get(props.document) : Promise.resolve({data:null}))
    .then(({data}) => {
      const att=data ? {url: props.document} : null
      return User.find({role: ROLE_ALLE_ADMIN})
        .then(users => Promise.allSettled(users.map(u => sendAskContact({
          user:u,
          fields:{...props, urgent: props.urgent ? 'Oui':'Non', status: CONTACT_STATUS[props.status]},
          attachment: att,
        }))))
    })
}

addAction('alle_ask_contact', askContactAction)

// TODO: send rest to isActionAllowed
const hasChildrenAction = ({value, reason}, user) => {
  return Promise.resolve(true)
}

addAction('hasChildren', hasChildrenAction)

const askRecommandationAction = ({value, email, message, page}, user) => {
  if (!value) {throw new BadRequestError('Le job est obligatoire')}
  if (!(email && isEmailOk(email))) {throw new BadRequestError("L'email est invalide")}
  if (!message?.trim()) {throw new BadRequestError('Le message est obligatoire')}
  if (!page) {throw new BadRequestError('La page de recommandation est obligatoire')}
  return loadFromDb({model: 'jobUser', id: value, fields:['user.full_name']})
    .then(([job]) => {
      sendAskRecomandation({user, destinee_email:email, message,url: getProductionUrl(`${page}?id=${value}`)})
      return true
    })
}

addAction('askRecommandation', askRecommandationAction)

const isActionAllowed = ({action, dataId, user, ...rest}) => {
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
  if (action=='alle_send_bill') {
    return Mission.findById(dataId)
      .populate('quotations')
      .then(mission => mission?.canSendBill(user))
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

  if (action=='create') {
    const actionProps=rest.actionProps
    if (actionProps?.model=='quotation') {
      return Mission.findById(dataId)
        .populate('quotations')
        .then(mission => {
          if (mission?.quotations?.length>0) {
            return false
          }
          return true
        })
    }
  }

  if (action=='hasChildren') {
    const childrenAttribute=rest?.actionProps.children
    if (childrenAttribute) {
      return getModel(dataId)
        .then(model => loadFromDb({model, fields:[childrenAttribute], id: dataId, user}))
        .then(data => data?.[0][childrenAttribute]?.length>0)
    }
  }

  return Promise.resolve(true)
}

setAllowActionFn(isActionAllowed)
