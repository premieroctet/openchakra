/**
Workflows for leads/users linked to companies EXCEPT Insuance companies
ESANI coaching
INEA pas coaching
*/
// Mailjet contacts lists
// Non registered
const { delayPromise } = require('../../utils/concurrency')
const moment=require('moment')
const { COMPANY_ACTIVITY_ASSURANCE, ROLE_CUSTOMER } = require('./consts')
const lodash=require('lodash')
const MAILJET_HANDLER=require('../../utils/mailjet')
const User = require('../../models/User')
const Lead = require('../../models/Lead')
require('../../models/Group')

const isLeadOnly = (lead, user) => {
  return !!lead && !user
}

const isRegistered = (lead, user) => {
  return !!user
}

const hasCoaching = account => {
  return account.company?.offers?.[0].coaching_credit>0
}

const hasGroups = account => {
  return !!account.company?.offers?.[0].groups_unlimited ||
    account.company?.offers?.[0].groups_credit>0
}

const isInsurance = account => {
  return account?.company?.activity===COMPANY_ACTIVITY_ASSURANCE
}

const _mapContactToMailJet = contact => ({
  Email: contact.email, Name: contact.fullname, Properties: {
    codeentreprise: contact.company?.code,
    credit_consult: contact.company?.offers?.[0].coaching_credit,
    client: contact.company?.name,
    logo: contact.company?.picture,
  }
})

const mapContactToMailJet = contact => {
  const res=_mapContactToMailJet(contact)
  return res
}

const WORKFLOWS={
  CL_SALAR_LEAD_NOCOA_NOGROUP: {
    id: '2414827',
    name: 'INEA sans groupe',
    filter: (lead, user) => {
      return isLeadOnly(lead, user)
        && !hasCoaching(lead)
        && !hasGroups(lead)
        && !isInsurance(lead)
        && lead
    },
  },
  CL_SALAR_LEAD_COA_NOGROUP: {
    id: '2414829',
    name: 'ESANI sans groupe',
    filter: (lead, user) => {
      return isLeadOnly(lead, user)
      && hasCoaching(lead)
      && !hasGroups(lead)
      && !isInsurance(lead)
      && lead
    }
  },
  CL_SALAR_LEAD_NOCOA_GROUP: {
    id: '2414828',
    name: 'INEA avec groupe',
    filter: (lead, user) => {
      return isLeadOnly(lead, user)
      && !hasCoaching(lead)
      && hasGroups(lead)
      && !isInsurance(lead)
      && lead
    }
  },
  CL_SALAR_LEAD_COA_GROUP: {
    id: '2414830',
    name: 'ESANI avec groupe',
    filter: (lead, user) => {
      return isLeadOnly(lead, user)
      && hasCoaching(lead)
      && hasGroups(lead)
      && !isInsurance(lead)
      && lead
    }
  },
  // Registered
  CL_REGISTERED: {
    id: '2414831',
    name: 'inscrits motiv usage',
    filter: (lead, user) => {
      return isRegistered(lead, user)
        && !isInsurance(user)
        && user
    }
  },
  // 1 month before coll chall
  CL_SALAR_REGISTERED_COLL_CHALL: {
    id: '2414833',
    name: 'TEIRA challenge co',
    filter: (lead, user) => {
      return !!user?.company?.collective_challenges?.some(c => moment(c.start_date).diff(moment(), 'days')<30)
        && !isInsurance(user)
        && user
    }
  },
  // After 1 week
  CL_SALAR_REGISTERED_FIRST_COA_APPT: {
    id: '2414832',
    name: 'inscrits CAO démarré',
    filter: (lead, user) => {
      return !!user?.latest_coachings[0]?.appointments?.some(a => moment().isAfter(moment(a.end_date)))
      && !isInsurance(user)
      && user
    }
  },
  CL_ADHER_LEAD_COA_NOGROUP: {
    id: '2414836',
    name: 'Mutuelle ESANI sans groupe',
    filter: (lead, user) => {
      return isLeadOnly(lead, user)
      && hasCoaching(lead)
      && !hasGroups(lead)
      && isInsurance(lead)
      && lead
    }
  },
}

const computeWorkflowLists = () => {
  return Promise.all([
    Lead.find()
      .populate({path: 'company', populate: [{path: 'groups_count'}, {path: 'groups'}, {path: 'offers'}]}),
    User.find({role: ROLE_CUSTOMER})
      .populate([{path: 'coachings', populate: ['appointments']}, {path: 'latest_coachings', populate: ['appointments']}])
      .populate({path: 'company', populate: ['collective_challenges']}),
    // TODO use this version after speeding it up
    /**
    loadFromDb({model: 'lead', fields:['company.offers', 'company.groups']}),
    loadFromDb({model: 'user', fields:['latest_coachings.appointments', 'company.collective_challenges']}),
    */
  ])
  .then(([leads, users]) => {
    const allemails=lodash([...leads, ...users]).groupBy('email').mapValues(v => ([v.find(c => !c.role), v.find(c => !!c.role)]))
    // Filter for each workflow
    const entries=Object.entries(WORKFLOWS).map(([workflow_id, {id, filter}])=> {
      // Map mail to false or lead or user
      const retained=allemails.mapValues(([lead, user]) => filter(lead, user))
        // Retain only emails having truthy value
        .pickBy(v => !!v)
      const removed=allemails.keys().difference(retained.keys().value()).map(k => ({email:k}))
      return [workflow_id, {id, add: retained.values().value().map(mapContactToMailJet), remove: removed.value().map(mapContactToMailJet)}]
    })
    return Object.fromEntries(entries)
  })
}

const updateWorkflows= () => {
  return computeWorkflowLists()
    .then(lists => {
      let promises=Object.values(lists).map(({id, add, remove})=> {
        const result=[]
        if (!lodash.isEmpty(add)) {
          result.push(MAILJET_HANDLER.addContactsToList({list: id, contacts: add}))
        }
        if (!lodash.isEmpty(remove)) {
          result.push(MAILJET_HANDLER.removeContactsFromList({list: id, contacts: remove}))
        }
        return result
      })
      promises=lodash.flatten(promises).filter(v => !!v)
      return Promise.all(promises)
    })
    .then(jobs => delayPromise(4000).then(() => jobs))
    .then(jobs => Promise.all(jobs.map(job => MAILJET_HANDLER.checkContactsListsJob(job))))
}

module.exports={
  WORKFLOWS,
  updateWorkflows,
  mapContactToMailJet,
  computeWorkflowLists,
}
