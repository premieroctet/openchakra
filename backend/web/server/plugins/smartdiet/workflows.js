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
const { isDevelopment, isProduction } = require('../../../config/config')
require('../../models/Group')

const isLeadOnly = (lead, user) => {
  return !!lead && !user
}

const isRegistered = (lead, user) => {
  return !!user
}

const isESANI = account => {
  return account.company?.offers?.[0].coaching_credit>0
}

const isINEA = account => {
  return !isESANI(account)
}

const hasGroups = account => {
  return !!account.company?.offers?.[0].groups_unlimited ||
    account.company?.offers?.[0].groups_credit>0
}

const isInsurance = account => {
  return account?.company?.activity===COMPANY_ACTIVITY_ASSURANCE
}

const mailOpened = account => {
  return !!account.mail_opened
}

const coachingStarted = user => {
  return !!user?.latest_coachings[0]?.appointments?.find(a => moment(a.end_date).isBefore(moment()))
}

const _mapContactToMailJet = contact => ({
  Email: contact.email, Properties: {
    codeentreprise: contact.company?.code,
    credit_consult: contact.company?.offers?.[0].coaching_credit,
    client: contact.company?.name,
    logo: contact.company?.picture,
    Name: contact.fullname, Firstname: contact.firstname, 
  }
})

const mapContactToMailJet = contact => {
  const res=_mapContactToMailJet(contact)
  return res
}

const WORKFLOWS={
  CL_ADH_LEAD_NOCOA_NOGROUP_NOT_OPENED: {
    id: '2415607',
    name: 'ADH NON INSC INEA SS GRP MAIL NON OUVERT',
    filter: (lead, user) => {
      return isInsurance(lead)
        && isLeadOnly(lead, user)
        && isINEA(lead)
        && !hasGroups(lead)
        && !mailOpened(lead)
        && lead
    },
  },
  CL_ADH_LEAD_COA_NOGROUP_NOT_OPENED: {
    id: '2414836',
    name: 'ADH NON INSC ESANI SS GRP MAIL NON OUVERT',
    filter: (lead, user) => {
      return isInsurance(lead)
        && isLeadOnly(lead, user)
        && isESANI(lead)
        && !hasGroups(lead)
        && !mailOpened(lead)
        && lead
    },
  },
  CL_SALAR_LEAD_NOCOA_NOGROUP: {
    id: '2414827',
    name: 'SAL NON INSC INEA SS GRP',
    filter: (lead, user) => {
      return !isInsurance(lead)
        && isLeadOnly(lead, user)
        && isINEA(lead)
        && !hasGroups(lead)
        && lead
    },
  },
  CL_SALAR_LEAD_COA_NOGROUP: {
    id: '2414829',
    name: 'SAL NON INSC ESANI SS GRP',
    filter: (lead, user) => {
      return !isInsurance(lead)
        && isLeadOnly(lead, user)
        && isESANI(lead)
        && !hasGroups(lead)
        && lead
    }
  },
  CL_ADH_LEAD_NOCOA_NOGROUP_MAIL_OPENED: {
    id: '2416408',
    name: 'ADH NON INSC INEA SS GRP MAIL OUVERT',
    filter: (lead, user) => {
      return isInsurance(lead)
        && isLeadOnly(lead, user)
        && isINEA(lead)
        && !hasGroups(lead)
        && mailOpened(lead)
        && lead
    },
  },
  CL_ADH_LEAD_COA_NOGROUP_MAIL_OPENED: {
    id: '2416407',
    name: 'SAL NON INSC ESANI sans groupe mail ouvert',
    filter: (lead, user) => {
      return isInsurance(lead)
        && isLeadOnly(lead, user)
        && isESANI(lead)
        && !hasGroups(lead)
        && mailOpened(lead)
        && lead
    },
  },
  // Registered INEA
  CL_REGISTERED_INEA_NOSTARTEDCOA: {
    id: '2415688',
    name: 'SAL/ADH INSC INEA NO COA DEM',
    filter: (lead, user) => {
      return isRegistered(lead, user)
        && isINEA(lead)
        && !coachingStarted(user)
        && user
    }
  },
  // Registered ESANI
  CL_REGISTERED_ESANI_NOSTARTEDCOA: {
    id: '2414831',
    name: 'SAL/ADH INSC INEA NO CAO DEM',
    filter: (lead, user) => {
      return isRegistered(lead, user)
        && isESANI(lead)
        && !coachingStarted(user)
        && user
    }
  },
  // After 1 week
  CL_SALAR_REGISTERED_FIRST_COA_APPT: {
    id: '2414832',
    name: 'SAL/ADH INSC CAO DEM',
    filter: (lead, user) => {
      return isRegistered(lead, user)
      && coachingStarted(user)
      && user
    }
  },
  // 1 month before coll chall
  CL_REGISTERED_COLL_CHALL: {
    id: '2414833',
    name: 'TEIRA challenge co',
    filter: (lead, user) => {
      return isRegistered(lead, user)
        && user?.company?.collective_challenges?.some(c => moment(c.start_date).diff(moment(), 'days')<30)
        && user
    }
  },
  CL_SALAR_NONINSC_INEA_GROUP_NON_MAIL: {
    id: '2414828',
    name: 'INEA avec groupe',
    filter: (lead, user) => {
      return !isInsurance(lead)
      && !mailOpened(lead)
      && isLeadOnly(lead, user)
      && isINEA(lead)
      && hasGroups(lead)
      && lead
    }
  },
  CL_SALAR_NONINSC_ESANI_GROUP_NON_MAIL: {
    id: '2414830',
    name: 'ESANI avec groupe',
    filter: (lead, user) => {
      return !isInsurance(lead)
      && !mailOpened(lead)
      && isLeadOnly(lead, user)
      && isESANI(lead)
      && hasGroups(lead)
      && lead
    }
  },
  CL_SAL_NONINSC_INEA_GRP_MAIL_OUVERT: {
    id: '2416441',
    name: 'SAL INEA GRP MAIL OUVERT',
    filter: (lead, user) => {
      return !isInsurance(lead)
      && isLeadOnly(lead, user)
      && isINEA(lead)
      && hasGroups(lead)
      && mailOpened(lead)
      && lead
    }
  },
  CL_SAL_NONINSC_ESANI_GRP_MAIL_OUVERT: {
    id: '2416442',
    name: 'SAL ESANI GRP MAIL OUVERT',
    filter: (lead, user) => {
      return !isInsurance(lead)
      && isLeadOnly(lead, user)
      && isESANI(lead)
      && hasGroups(lead)
      && mailOpened(lead)
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
      console.log(`Lists`, Object.entries(lists).map(([key, entry])=> ([key, entry.id, entry.add.length])))
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

