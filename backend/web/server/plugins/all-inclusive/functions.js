const { BadRequestError } = require('../../utils/errors')
const {
  AVAILABILITY,
  COACHING,
  COMPANY_ACTIVITY,
  COMPANY_SIZE,
  COMPANY_STATUS,
  CONTACT_STATUS,
  CONTRACT_TYPE,
  EXPERIENCE,
  MISSION_FREQUENCY,
  QUOTATION_STATUS,
  ROLES,
  ROLE_COMPANY_ADMIN,
  ROLE_COMPANY_BUYER,
  ROLE_TI,
  UNACTIVE_REASON,
} = require('./consts')
const moment = require('moment')
const Mission = require('../../models/Mission')
const {
  declareEnumField,
  declareVirtualField,
  idEqual,
  setFilterDataUser,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const User = require('../../models/User')
const { CREATED_AT_ATTRIBUTE } = require('../../../utils/consts')
const lodash=require('lodash')
const Message = require('../../models/Message')
const JobUser = require('../../models/JobUser')
const NATIONALITIES = require('./nationalities.json')

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
  console.log(`preCreate ${model} with ${JSON.stringify(params)}`)
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
  declareVirtualField({model: m, field: 'finished_missions_count', instance: 'Number', requires: 'missions'})
  declareVirtualField({model: m, field: '_missions', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'mission'}}
  })
  declareVirtualField({model: m, field: 'missions', instance: 'Array', multiple: true,
    requires: '_missions,_missions.user,_missions.job,_missions.job.user',
    caster: {
      instance: 'ObjectID',
      options: {ref: 'mission'}}
  })
  declareVirtualField({model: m, field: 'recommandations_count', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'recommandations_note', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'comments_count', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'comments_note', instance: 'Number', requires: 'jobs'})
  declareVirtualField({model: m, field: 'revenue', instance: 'Number', requires: 'missions.quotations'})
  declareVirtualField({model: m, field: 'revenue_to_come', instance: 'Number', requires: 'missions.quotations'})
  declareVirtualField({model: m, field: 'accepted_quotations_count', instance: 'Number', requires: 'missions.quotations'})
  declareVirtualField({model: m, field: 'profile_shares_count', instance: 'Number', requires: ''})
  declareEnumField({model: m, field: 'unactive_reason', enumValues: UNACTIVE_REASON})
  declareVirtualField({model: m, field: 'missing_attributes', instance: 'String', requires: 'firstname,lastname,email,phone,birthday,nationality,picture,identity_proof_1,iban,company_name,company_status,siret,status_report,insurance_type,insurance_report,company_picture'})
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


declareEnumField({model: 'experience', field: 'contract_type', enumValues: CONTRACT_TYPE})

declareVirtualField({model: 'mission', field: 'status', instance: 'String', enumValues: QUOTATION_STATUS,
    requires: 'customer_accept_bill_date,customer_refuse_bill_date,bill_sent_date,ti_finished_date,customer_refuse_quotation_date,customer_accept_quotation_date,ti_refuse_date,quotation_sent_date,job,customer_refuse_bill_date,customer_refuse_quotation_date,customer_cancel_date'})
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

const filterDataUser = ({model, data, user}) => {
  if (model == 'jobUser') {
    // Hide jobUser.user.hidden
    return Promise.all(data.map(job => JobUser.findById(job._id).populate('user')
        .then(dbJob => {
          if (dbJob.user.hidden==false || idEqual(user?._id, dbJob.user._id)) {
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
