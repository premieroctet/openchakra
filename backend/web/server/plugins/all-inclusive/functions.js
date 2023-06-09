const {
  AVAILABILITY,
  COACHING,
  COACH_ALLE,
  COMPANY_ACTIVITY,
  COMPANY_SIZE,
  COMPANY_STATUS,
  CONTACT_STATUS,
  CONTRACT_TYPE,
  DEPARTEMENTS,
  EXPERIENCE,
  MISSION_FREQUENCY,
  MISSION_STATUS_ASKING,
  MISSION_STATUS_FINISHED,
  MISSION_STATUS_QUOT_SENT,
  MISSION_STATUS_TI_REFUSED,
  PAYMENT_STATUS,
  QUOTATION_STATUS,
  ROLES,
  ROLE_ALLE_ADMIN,
  ROLE_COMPANY_ADMIN,
  ROLE_COMPANY_BUYER,
  ROLE_TI,
  UNACTIVE_REASON,
} = require('./consts')
const {
  declareComputedField,
  declareEnumField,
  declareVirtualField,
  getModel,
  idEqual,
  loadFromDb,
  setFilterDataUser,
  setPostCreateData,
  setPostPutData,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const Contact = require('../../models/Contact')

const { sendAskContact, sendTipiSearch } = require('./mailing')
const AdminDashboard = require('../../models/AdminDashboard')
const mongoose = require('mongoose')
const cron=require('node-cron')
const { paymentPlugin } = require('../../../config/config')
const { BadRequestError } = require('../../utils/errors')
const moment = require('moment')
const Mission = require('../../models/Mission')
const User = require('../../models/User')
const { CREATED_AT_ATTRIBUTE } = require('../../../utils/consts')
const lodash=require('lodash')
const Message = require('../../models/Message')
const JobUser = require('../../models/JobUser')
const NATIONALITIES = require('./nationalities.json')

const postCreate = ({model, params, data}) => {
  // Create company => duplicate offer
  if (model=='mission') {
    return Promise.all([Mission.findById(data.id).populate('user'), User.find({role: ROLE_ALLE_ADMIN})])
      .then(([mission, admins]) => {
        return Promise.allSettled(admins.map(admin => sendTipiSearch({admin, mission:mission.toObject()})))
    })
  }
  if (model=='contact') {
    const contact=data
    const attachment=contact.document ? {url: contact.document} : null
    // TODO check sendMail return
    User.find({role: ROLE_ALLE_ADMIN})
      .then(users => Promise.allSettled(users.map(u => sendAskContact({
        user:{email: u.email},
        fields:{...contact.toObject({virtuals: true}), urgent: contact.urgent ? 'Oui':'Non', status: CONTACT_STATUS[contact.status]},
        attachment,
      }))))
  }

  return Promise.resolve(data)
}

setPostCreateData(postCreate)

const preprocessGet = ({model, fields, id, user}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }

  if (model == 'jobUser') {
    fields = lodash([...fields, 'user.hidden', 'user']).uniq().value()
  }

  if (model=='conversation') {
    const getPartner= (m, user) => {
      return idEqual(m.sender._id, user._id) ? m.receiver : m.sender
    }

    return Message.find({$or: [{sender: user._id}, {receiver: user._id}]})
      .populate({path: 'sender', populate: {path: 'company'}})
      .populate({path: 'receiver', populate: {path: 'company'}})
      .sort({CREATED_AT_ATTRIBUTE: 1})
      .then(messages => {
        if (id) {
          messages=messages.filter(m => idEqual(getPartner(m, user)._id, id))
          // If no messages for one parner, forge it
          if (lodash.isEmpty(messages)) {
            return User.findById(id).populate('company')
              .then(partner => {
                const data=[{_id: partner._id, partner, messages: []}]
                return {model, fields, id, data}
              })
          }
        }
        const partnerMessages=lodash.groupBy(messages, m => getPartner(m, user)._id)
        const convs=lodash(partnerMessages)
          .values()
          .map(msgs => { const partner=getPartner(msgs[0], user); return ({_id: partner._id, partner, messages: msgs}) })
          .sortBy(CREATED_AT_ATTRIBUTE, 'asc')
        return {model, fields, id, data: convs}
      })
  }

  return Promise.resolve({model, fields, id})

}

setPreprocessGet(preprocessGet)

const preCreate = ({model, params, user}) => {
  if (['jobUser', 'request', 'mission', 'comment'].includes(model)) {
    params.user=user
  }
  if (model=='quotation' && 'mission' in params) {
    return Mission.findById(params.mission)
      .populate('user')
      .populate('quotations')
      .then(mission => {
        if (mission.quotations.length>0) {
          throw new BadRequestError(`Un devis est déjà attaché à cette mission`)
        }
        params.name=`Devis du ${moment().format('L')}`
        params.firstname=mission.user.firstname
        params.lastname=mission.user.lastname
        params.email=mission.user.email
        params.company_name=mission.user.company_name
        params.mission=mission._id
        return ({model, params})
      })
  }
  if (model=='quotationDetail' && 'quotation' in params) {
    params.quotation=params.quotation
  }

  if (model=='user' && !params.role) {
    params.role=ROLE_TI
  }

  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)

const postPut = ({model, params, data, user}) => {
  console.log(`postPut ${model} with ${JSON.stringify(data)}`)
  if (model=='user' && user?.role==ROLE_TI) {
    return paymentPlugin.upsertProvider(data)
  }
  if (model=='user' && user?.role==ROLE_COMPANY_BUYER) {
    return paymentPlugin.upsertCustomer(data)
  }
  return Promise.resolve(data)
}

setPostPutData(postPut)


const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareVirtualField({model: m, field: 'full_name', instance: 'String', requires: 'firstname,lastname'})
  declareEnumField({model: m, field: 'role', enumValues: ROLES})
  declareVirtualField({model: m, field: 'profile_progress', instance: 'Number', requires: 'firstname,lastname,email,phone,birthday,nationality,picture,identity_proof_1,iban,company_name,company_status,siret,status_report,insurance_type,insurance_report,company_picture'})
  declareEnumField({model: m, field: 'coaching', enumValues: COACHING})
  declareVirtualField({model: m, field: 'password2', instance: 'String'})
  declareEnumField({model: m, field: 'availability', enumValues: AVAILABILITY})
  declareVirtualField({model: m, field: 'quotations', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'quotation'}}
  })
  declareVirtualField({model: m, field: 'jobs', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'jobUser'}}
  })
  declareEnumField({model: m, field: 'nationality', enumValues: NATIONALITIES})
  declareEnumField({model: m, field: 'company_status', enumValues: COMPANY_STATUS})
  declareEnumField({model: m, field: 'company_activity', enumValues: COMPANY_ACTIVITY})
  declareEnumField({model: m, field: 'company_size', enumValues: COMPANY_SIZE})
  declareVirtualField({model: m, field: 'requests', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'request'}}
  })
  declareVirtualField({model: m, field: 'qualified_str', instance: 'String'})
  declareVirtualField({model: m, field: 'visible_str', instance: 'String'})
  declareVirtualField({model: m, field: 'finished_missions_count', instance: 'Number', requires: '_missions'})
  declareVirtualField({model: m, field: '_missions', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'mission'}}
  })
  declareVirtualField({model: m, field: 'missions', instance: 'Array', multiple: true,
    requires: '_missions,_missions.user,_missions.job,_missions.job.user,_missions.quotations,_missions.comments',
    caster: {
      instance: 'ObjectID',
      options: {ref: 'mission'}}
  })
  declareVirtualField({model: m, field: 'missions_with_bill', instance: 'Array', multiple: true,
    requires: '_missions,_missions.user,_missions.job,_missions.job.user,_missions.quotations',
    caster: {
      instance: 'ObjectID',
      options: {ref: 'mission'}}
  })
  declareVirtualField({model: m, field: 'recommandations', instance: 'Array', multiple: true,
    requires: '_all_recommandations.job',
    caster: {
      instance: 'ObjectID',
      options: {ref: 'recommandation'}}
  })
  declareVirtualField({model: m, field: 'recommandations_count', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'recommandations_note', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'comments_count', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'comments_note', instance: 'Number', requires: 'jobs'})

  declareVirtualField({model: m, field: 'revenue', instance: 'Number',
    requires: 'role,_missions.quotations.total,_missions.status,missions.quotations.total,missions.status'})
  declareVirtualField({model: m, field: 'revenue_to_come', instance: 'Number',
    requires: 'role,_missions.quotations.total,_missions.status,missions.quotations.total,missions.status'})
  declareVirtualField({model: m, field: 'accepted_quotations_count', instance: 'Number', requires: 'role,_missions.status,missions.status'})

  declareVirtualField({model: m, field: 'spent', instance: 'Number',
    requires: 'role,_missions.quotations.total,_missions.status,missions.quotations.total,missions.status'})
  declareVirtualField({model: m, field: 'spent_to_come', instance: 'Number',
    requires: 'role,_missions.quotations.total,_missions.status,missions.quotations.total,missions.status'})
  declareVirtualField({model: m, field: 'pending_bills', instance: 'Number', requires: 'role,_missions.status,missions.status'})

  declareVirtualField({model: m, field: 'profile_shares_count', instance: 'Number', requires: ''})
  declareEnumField({model: m, field: 'unactive_reason', enumValues: UNACTIVE_REASON})
  declareVirtualField({model: m, field: 'missing_attributes', instance: 'String', requires: 'firstname,lastname,email,phone,birthday,nationality,picture,identity_proof_1,iban,company_name,company_status,siret,status_report,insurance_type,insurance_report,company_picture'})
  declareEnumField({model: m, field: 'zip_code', enumValues: DEPARTEMENTS})
  declareVirtualField({model: m, field: '_all_jobs', instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'jobUser'}}
  })
  declareVirtualField({model: m, field: 'pinned_jobs', instance: 'Array', multiple: true,
    // TODO: _all_jobs_pins should be enough to display jibusers if required
    requires:'_all_jobs.user',
    caster: {
      instance: 'ObjectID',
      options: {ref: 'jobUser'}}
  })
  declareVirtualField({model: m, field: '_all_recommandations', instance: 'Array', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'recommandation'}}
  })
  declareVirtualField({model: m, field: 'search_text', type: 'String',
    requires:'firstname,lastname,qualified_str,visible_str,company_name,coaching,zip_code,admin_validated'})
})



declareEnumField({model: 'company', field: 'status', enumValues: COMPANY_STATUS})
declareEnumField({model: 'jobUser', field: 'experience', enumValues: EXPERIENCE})
declareVirtualField({model: 'jobUser', field: 'activities', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'activity'}}
})
declareVirtualField({model: 'jobUser', field: 'skills', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'skill'}}
})
declareVirtualField({model: 'jobUser', field: 'location_str', instance: 'String', requires: 'customer_location,foreign_location'})
declareVirtualField({model: 'jobUser', field: 'search_field', instance: 'String', requires: 'name,skills.name,activities.name'})
declareVirtualField({model: 'jobUser', field: 'experiences', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'experience'}}
})
declareVirtualField({model: 'jobUser', field: 'diploma', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'diploma'}}
})
declareVirtualField({model: 'jobUser', field: 'photos', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'photo'}}
})
declareVirtualField({model: 'jobUser', field: 'recommandations', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'recommandation'}}
})
declareVirtualField({model: 'jobUser', field: 'missions', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'mission'}}
})
declareVirtualField({model: 'jobUser', field: 'comments', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'comment'}}
})
declareVirtualField({model: 'jobUser', field: 'pinned', instance: 'Boolean', requires:'pins'})


declareEnumField({model: 'experience', field: 'contract_type', enumValues: CONTRACT_TYPE})

declareVirtualField({model: 'mission', field: 'status', instance: 'String', enumValues: QUOTATION_STATUS,
    requires: 'job,customer_accept_bill_date,customer_refuse_bill_date,bill_sent_date,ti_finished_date,customer_refuse_quotation_date,customer_accept_quotation_date,ti_refuse_date,quotation_sent_date,job,customer_refuse_bill_date,customer_refuse_quotation_date,customer_cancel_date'})
declareVirtualField({model: 'mission', field: 'quotations', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'quotation'}}
})
declareEnumField({model: 'mission', field: 'frequency', enumValues: MISSION_FREQUENCY})
declareVirtualField({model: 'mission', field: 'location_str', instance: 'String', requires: 'customer_location,foreign_location'})
declareVirtualField({model: 'mission', field: 'ti_tip', instance: 'String', requires: ''})
declareVirtualField({model: 'mission', field: 'customer_tip', instance: 'String', requires: ''})
declareVirtualField({model: 'mission', field: 'comments', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'comment'}}
})
declareEnumField({model: 'mission', field: 'payin_status', enumValues: PAYMENT_STATUS})


declareVirtualField({model: 'quotation', field: 'details', instance: 'Array', requires: '', multiple: true,
  caster: {
    instance: 'ObjectID',
    options: {ref: 'quotationDetail'}}
})
declareVirtualField({model: 'quotation', field: 'total', instance: 'Number', requires: 'details'})
declareVirtualField({model: 'quotation', field: 'vat_total', instance: 'Number', requires: 'details'})

declareVirtualField({model: 'quotationDetail', field: 'total', instance: 'Number', requires: 'quantity,ht_price,vat'})
declareVirtualField({model: 'quotationDetail', field: 'vat_total', instance: 'Number', requires: 'quantity,ht_price,vat'})

declareEnumField({model: 'contact', field: 'status', enumValues: CONTACT_STATUS})
declareEnumField({model: 'contact', field: 'region', enumValues: DEPARTEMENTS})

declareVirtualField({model: 'adminDashboard', field: 'contact_sent', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'refused_bills', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'accepted_bills', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'visible_ti', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'hidden_ti', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'qualified_ti', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'visible_tipi', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'hidden_tipi', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'qualified_tipi', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'missions_requests', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'refused_missions', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'sent_quotations', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'quotation_ca_total', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'commission_ca_total', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'tipi_commission_ca_total', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'tini_commission_ca_total', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'customer_commission_ca_total', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'ti_registered_today', instance: 'Number'})
declareVirtualField({model: 'adminDashboard', field: 'customers_registered_today', instance: 'Number'})


const filterDataUser = ({model, data, user}) => {
  // ALL-E admins have whole visibility
  if (user?.role==ROLE_ALLE_ADMIN) {
    return Promise.resolve(data)
  }
  if (model == 'jobUser') {
    // Hide jobUser.user.hidden
    return Promise.all(data.map(job => JobUser.findById(job._id).populate('user')
        .then(dbJob => {
          if (dbJob?.user?.hidden==false || idEqual(user?._id, dbJob?.user?._id)) {
            return job
          }
          return null
        })
      ))
      .then(jobs => jobs.filter(v => !!v))
  }
  return data
}

setFilterDataUser(filterDataUser)


const getDataPinned = (user, params, data) => {
  const pinned=data?.pins?.some(l => idEqual(l._id, user?._id))
  return Promise.resolve(pinned)
}

const setDataPinned = ({id, attribute, value, user}) => {
  console.log(`Pinnning:${value}`)
  return getModel(id, ['jobUser'])
    .then(model => {
      if (value) {
        // Set liked
        return mongoose.models[model].findByIdAndUpdate(id, {$addToSet: {pins: user._id}})
      }
      else {
        // Remove liked
        return mongoose.models[model].findByIdAndUpdate(id, {$pullAll: {pins: [user._id]}})
      }
    })
}

declareComputedField('jobUser', 'pinned', getDataPinned, setDataPinned)


declareComputedField('adminDashboard', 'contact_sent', () => Contact.countDocuments())
declareComputedField('adminDashboard', 'refused_bills', () =>
  Mission.countDocuments({customer_refuse_bill_date: {$ne: null}})
)
declareComputedField('adminDashboard', 'accepted_bills', () =>
  Mission.countDocuments({customer_accept_bill_date: {$ne: null}})
)
declareComputedField('adminDashboard', 'visible_ti',
  () => User.countDocuments({role: ROLE_TI, hidden:false})
)
declareComputedField('adminDashboard', 'hidden_ti',
  () => User.countDocuments({role: ROLE_TI, hidden:true})
)
declareComputedField('adminDashboard', 'qualified_ti',
  () => User.countDocuments({role: ROLE_TI, qualified:true})
)
declareComputedField('adminDashboard', 'visible_tipi',
  () => User.countDocuments({role: ROLE_TI, coaching: COACH_ALLE, hidden:false})
)
declareComputedField('adminDashboard', 'hidden_tipi',
  () => User.countDocuments({role: ROLE_TI, coaching: COACH_ALLE, hidden:true})
)
declareComputedField('adminDashboard', 'qualified_tipi',
  () => User.countDocuments({role: ROLE_TI, coaching: COACH_ALLE, qualified:true})
)
declareComputedField('adminDashboard', 'missions_requests', () =>
  loadFromDb({model: 'mission', fields:['status']})
    .then(missions => missions.filter(m => m.status==MISSION_STATUS_ASKING).length)
)
declareComputedField('adminDashboard', 'refused_missions', () =>
loadFromDb({model: 'mission', fields:['status']})
  .then(missions => missions.filter(m => m.status==MISSION_STATUS_TI_REFUSED).length)
)
declareComputedField('adminDashboard', 'sent_quotations', () =>
  Mission.countDocuments({quotation_sent_date: {$ne: null}})
)

declareComputedField('adminDashboard', 'quotation_ca_total',
  () => {
    return loadFromDb({model: 'mission', fields:['status','quotations.total']})
      .then(missions => {
        return lodash(missions)
          .filter(m => m.status==MISSION_STATUS_QUOT_SENT)
          .sumBy(m => m.quotations[0].total)
      })
  }
)

declareComputedField('adminDashboard', 'commission_ca_total',
() => {
  return loadFromDb({model: 'mission', fields:['status','quotations.total']})
    .then(missions => {
      return lodash(missions)
        .filter(m => m.status==MISSION_STATUS_FINISHED)
        .sumBy(m => m.quotations[0].total)*0.15
    })
}
)

//*****************************************************************
// TODO: Compute actual AA & MER commissions
//*****************************************************************
declareComputedField('adminDashboard', 'tipi_commission_ca_total',
() => {
  return loadFromDb({model: 'mission', fields:['name','status','quotations.total','job.user.coaching','job.user.coaching']})
    .then(missions => {
      return lodash(missions)
        .filter(m => m.status==MISSION_STATUS_FINISHED)
        .filter(m => m.job?.user?.coaching==COACH_ALLE)
        .sumBy(m => m.quotations[0].total)*0.15
    })
}
)

declareComputedField('adminDashboard', 'tini_commission_ca_total',
() => {
  return loadFromDb({model: 'mission', fields:['status','quotations.total','job.user.coaching']})
    .then(missions => {
      return lodash(missions)
        .filter(m => m.status==MISSION_STATUS_FINISHED)
        .filter(m => m.job?.user?.coaching!=COACH_ALLE)
        .sumBy(m => m.quotations[0].total)*0.15
    })
}
)

declareComputedField('adminDashboard', 'customer_commission_ca_total',
() => {
  return loadFromDb({model: 'mission', fields:['status','quotations.total']})
    .then(missions => {
      return lodash(missions)
        .filter(m => m.status==MISSION_STATUS_FINISHED)
        .sumBy(m => m.quotations[0].total)*0.15
    })
}
)

declareComputedField('adminDashboard', 'ti_registered_today', () =>
  User.find({role:ROLE_TI}, {[CREATED_AT_ATTRIBUTE]:1})
    .then(users => users.filter(u => moment(u[CREATED_AT_ATTRIBUTE]).isSame(moment(), 'day')).length))
declareComputedField('adminDashboard', 'customers_registered_today', () =>
  User.find({role:ROLE_COMPANY_BUYER}, {[CREATED_AT_ATTRIBUTE]:1})
  .then(users => users.filter(u => moment(u[CREATED_AT_ATTRIBUTE]).isSame(moment(), 'day')).length))


/** Upsert ONLY adminDashboard */
AdminDashboard.exists({})
  .then(exists => !exists && AdminDashboard.create({}))
  .then(()=> console.log(`Only adminDashboard`))
  .catch(err=> console.err(`Only adminDashboard:${err}`))

// Send notifications for reminders & apppointments
// Poll every minute
cron.schedule('*/5 * * * * *', async() => {
  return Mission.findOne({payin_id: {$ne:null}, payin_achieved: null})
    .then(mission => paymentPlugin.getCheckout(mission.payin_id))
    .then(payment => {
      if (payment.status=='expired'  || (payment.status=='complete' && payment.payment_status=='unpaid')) {
        console.log(`Payment ${payment.id} failed`)
        return Mission.findOneAndUpdate({payin_id: payment.id}, {$unset: {payin_id:true, payin_achieved:true}})
      }
      if (payment.status=='complete'  && (payment.payment_status=='paid' || payment.payment_status=='no_payment_required')) {
        console.log(`Payment ${payment.id} succeded`)
        return Mission.findOneAndUpdate({payin_id: payment.id}, {payin_achieved:true})
      }
    })
})
