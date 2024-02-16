/**
API DOC : https://www.smartagenda.fr/pro/smartdiet/api/help
*/

/**
INFOS:
- diets can be found in the pdo_agenda's only, no references elsewhere (i.e. no account)
- pdo_events.apilnk_client_id : pdo_client/client id
- pdo_events.apilnk_equipe_id: 'pdo_agenda/diet_id'
- appointments start & end dates must be rounded at 1/4h
*/
const config = require('../../../config/config')
const cron = require('../../utils/cron')
const {
  AVAILABILITIES_RANGE_DAYS,
  ROLE_EXTERNAL_DIET
} = require('../smartdiet/consts')
const Range = require('../../models/Range')
const User = require('../../models/User')
const AppointmentType = require('../../models/AppointmentType')
const axios = require('axios')
const crypto=require('crypto')
const lodash=require('lodash')
require('lodash.product')
const moment=require('moment')
require('moment-round')
const {runPromisesWithDelay}=require('../../utils/concurrency')

const CONFIG={
  ...config.getSmartAgendaConfig(),
  SMARTAGENDA_SHA1_PASSWORD: crypto.createHash('sha1')
    .update(config.getSmartAgendaConfig().SMARTAGENDA_PASSWORD).digest('hex'),
}

const MAX_RESULTS=1000

const ALL_DATA=
`pdo_type_indispo,pdo_client,pdo_agenda,pdo_groupe,pdo_type_rdv,pdo_events,pdo_events_ouverture,
pdo_events_supprime,pdo_type_indispo,pdo_agenda_type_rdv,pdo_ressource,pdo_form,
pdo_form_champ,pdo_form_type_rdv,pdo_surveillance,pdo_envoi,pdo_journal,pdo_groupement`.replace(/\n/g, '').split(',')

const TOKEN_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api/token`
const BASE_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api`
const ACCOUNT_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api/pdo_client`
const AGENDAS_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api/pdo_agenda`
const EVENTS_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api/pdo_events`
const APPOINTMENT_TYPE_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api/pdo_type_rdv`
const AVAILABILITIES_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api/service/getAvailabilities`
const VISIO_LINK_URL=`https://www.smartagenda.fr/pro/${CONFIG.SMARTAGENDA_URL_PART}/api/service/getVisioLink`

const SMARTDIET_DATE_FORMAT='YYYY-MM-DD HH:mm:00'
// moment => 2000-01-01 12:00:00
const momentToSmartDate = m => {
  if (!m) { return m}
  const res=moment(m).format('YYYY-MM-DD HH:mm:00')
  return res
}

// moment => 2000-01-01 12:00:00
const smartDietToMoment = sm => {
  if (!sm) { return sm}
  if (!/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(sm)) {
    throw new Error(`Incorrect format:${sm}`)
  }
  const res=moment(sm, SMARTDIET_DATE_FORMAT)
  if (!res.isValid()) {
    throw new Error(`Incorrect moment:${sm},moment.invalidatAt:${res.invalidAt()}`)
  }
  return res
}

let storedToken=null
let tokenLimit=null

const getToken = () => {
  if (storedToken && moment().isBefore(tokenLimit)) {
    return Promise.resolve(storedToken)
  }

  const params={
    login: CONFIG.SMARTAGENDA_LOGIN,
    pwd: CONFIG.SMARTAGENDA_SHA1_PASSWORD,
    api_id: CONFIG.SMARTAGENDA_API_ID,
    api_key: CONFIG.SMARTAGENDA_API_KEY,
  }
  return axios.get(TOKEN_URL, {params:params})
    .then(({data}) => {
      tokenLimit=moment().add(90, 'minutes')
      storedToken=data.token
      console.log(`Creating new token ${storedToken}, validity is ${tokenLimit}`)
      return storedToken
    })
}

// Account: customer
const getAccount = ({email}) => {
  if (!email) {
    throw new Error(`Mail is required`)
  }
  let filters= {
    'filter[0][field]': 'mail',
    'filter[0][comp]': 'LIKE',
    'filter[0][value]': `%${email}%`,
  }
  return getToken()
    .then(token => axios.get(ACCOUNT_URL, {params:{token, nbresults: MAX_RESULTS, ...filters}}))
    .then(({data}) => data[0]?.id || null)
}

// Accounts: customers
const getAccounts = () => {
  return getToken()
    .then(token => axios.get(ACCOUNT_URL, {params:{token, nbresults: MAX_RESULTS}}))
    .then(res => res.data)
}

// Agenda: diet
const getAgenda = ({email}) => {
  if (!email) {
    throw new Error(`Mail is required`)
  }
  let filters= {
    'filter[0][field]': 'mail',
    'filter[0][comp]': 'LIKE',
    'filter[0][value]': `%${email}%`,
  }
  return getToken()
    .then(token => axios.get(AGENDAS_URL, {params:{token, nbresults: MAX_RESULTS, ...filters}}))
    .then(({data}) => data[0]?.id || null)
}

// Account: customer
const upsertAccount = ({id, email, firstname, lastname}) => {
  if (!(email && firstname && lastname)) {
    throw new Error(`mail/firstname/lastname are required`)
  }
  const params={mail: email, prenom: firstname, nom: lastname}
  return getToken()
    .then(token =>
      id ? axios.put(ACCOUNT_URL, params, {params:{id, token, nbresults: MAX_RESULTS}})
      : axios.post(ACCOUNT_URL, params, {params:{token, nbresults: MAX_RESULTS}})
    )
    .then(({data}) => {
      return data?.id || null
    })
}

// Agendas: diets
const getAgendas = email => {
  return getToken()
    .then(token => axios.get(AGENDAS_URL, {params:{token, nbresults: MAX_RESULTS}}))
    .then(res => res.data)
}

const getEvents = () => {
  return getToken()
    .then(token => axios.get(EVENTS_URL, {params:{token}}))
    .then(res => res.data)
}

const getAllData = () => {
  return getToken()
    .then(token => Promise.allSettled(ALL_DATA.map(data =>
      axios.get(`${BASE_URL}/${data}`,  {params:{nbresults: MAX_RESULTS*100, token}}).then(r => r.data))))
    //.then(res => Object.entries(res.map((r, idx) => [ALL_DATA[idx], r.value])))
    .then(res => Object.fromEntries(res.map((r, idx) => [ALL_DATA[idx], r.value])))
}

const createAppointment = (diet_id, client_id, presta_id, start_date, end_date) => {
  if (!(diet_id || client_id || presta_id || start_date || end_date)) {
    throw new Error(`diet_id, client_id, presta_id, start_date, end_date are required`)
  }

  const data={
    equipe_id: diet_id,
    client_id: client_id,
    presta_id: presta_id,
    text: 'Un rendez-vous',
    internet: 'O',
    start_date: momentToSmartDate(start_date),
    end_date: momentToSmartDate(end_date),}

  return getToken()
    .then(token => axios.post(`${EVENTS_URL}?token=${token}`, data))
    .then(res => res.data)
}

const deleteAppointment = app_id => {
  return getToken()
    .then(token => axios.delete(`${EVENTS_URL}?token=${token}&id=${app_id}`))
    .then(res => res.data)
}

const getAppointmentVisioLink = app_id => {
  const params={pdo_events_id: app_id }

  return getToken()
    .then(token => axios.post(VISIO_LINK_URL, params, {params:{token, pdo_events_id: app_id, nbresults: MAX_RESULTS}}))
    .then(({data}) => data.data.link)
}

// c$Types rendez-vousAgendas: diets
const getAppointmentTypes = () => {
  return getToken()
    .then(token => axios.get(APPOINTMENT_TYPE_URL, {params:{token, nbresults: MAX_RESULTS}}))
    .then(({data}) => {
      if (!data.filter) {
        console.warn(`getAppointmentTypes returned ${JSON.stringify(data)}:returning []`)
        return []
      }
       return data.filter(d => d.id>0)
    })
}

/**
Get availabilities for a diet and appontment type (i.e. prestation)
As smartagenda only returns about one week of availabilities, call twice
remaining_calls tells the number of recursive calls
*/
const getAvailabilities = ({diet_id, from, to, appointment_type, remaining_calls=3}) => {
  if (!(diet_id && from && to && appointment_type)) {
    throw new Error(`diet_id/from/to/appointment_type are required`)
  }

  const params={pdo_agenda_id: diet_id, pdo_type_rdv_id: appointment_type, date_a_partir_de: from.format('YYYY-MM-DD') }

  return getToken()
    .then(token =>
      Promise.all([
		    axios.post(AVAILABILITIES_URL, params, {params:{token, nbresults: MAX_RESULTS}}),
		    getAppointmentTypes(),
      ])
    )
    .then(([{data}, app_types]) => {
      // TODO Sometimes returned data is "". WTF ???
      if (!data.filter) {
        console.warn(`getAvailabilities diet ${diet_id},app type ${appointment_type} returned ${JSON.stringify(data)}:returning []`)
        return []
      }
      // TODO No appointment types
      if (app_types.length==0) {
        console.warn(`getAvailabilities diet ${diet_id},app type ${appointment_type}: no appointment type:returning []`)
        return []
      }
      data=data.filter(d => {
        const dt=moment(d.dj)
        return from.isBefore(dt) && to.isAfter(dt)
      })
      return lodash.flatten(data.map(d => d.det.map(detail => ({date: d.dj, duration: app_types.find(at => at.id==detail.idpr).duree, ...detail}))))
    })
    .then(data => data.map(d => lodash.pick(d, ['date', 'duration', 'idp', 'idpr'])))
    .then(data => data.map(d => {
      const start_date=moment(`${d.date}T${d.idp}`)
      const end_date=moment(start_date).add(d.duration, 'minutes')
      return ({start_date, end_date, idpr: d.idpr})
    }))
    .then(dispos => {
      const last_date=lodash.max(dispos.map(d => d.start_date))
      if (!last_date || remaining_calls==0) {
        return dispos
      }
      return getAvailabilities({diet_id, from:last_date, to, appointment_type,
        remaining_calls:remaining_calls-1})
        .then(dispos2 => [...dispos, ...dispos2])
    })
    .catch(err => {
      if (err?.response?.status==404) {
        console.error(`No availabilities for ${diet_id}`)
        return []
      }
      throw err
    })
}

// Synchronize appointment types every minute
//!isDevelopment() && cron.schedule('0 * * * * *', () => {
!config.isDevelopment() && cron.schedule('0 * * * * *', () => {
  console.log('Syncing appointment types from smartagenda')
  return Promise.all([getAppointmentTypes(), AppointmentType.find()])
    .then(([smartagenda_types, local_types]) => {
      smartagenda_types=smartagenda_types.filter(s => s.id>0)
      console.log(`Syncing ${smartagenda_types.length} smartagenda appointment types`)
      const promises=smartagenda_types.map(sm =>
        AppointmentType.findOneAndUpdate(
          {smartagenda_id: sm.id},
          {title:sm.nom, duration: sm.duree, smartagenda_id: sm.id},
          {upsert:true, runValidators:true}
        )
      )
      return Promise.allSettled(promises)
    })
    .then(res => res.length && console.log(`Updated/created ${res.length} appt types`))
})

// Synchronize availabilities every minute
// ENABLED UNTIL SMARTAGENDA WEBHOOK
!config.isDevelopment() && cron.schedule('0 * * * * *', () => {
  synchronizeAvailabilities()
})

// Returns an array of (diet, appointmentType) for any diet
const getDietAppointmentTypes= diet => {
  return User.findById(diet._id)
    .populate({path: 'customer_companies', populate:['assessment_appointment_type','followup_appointment_type']})
    .then(diet => {
      return lodash(diet.customer_companies)
        .map(c => [c.assessment_appointment_type, c.followup_appointment_type])
        .flatten()
        .value()
    })
}

const synchronizeAvailabilities = () => {
  console.log('Syncing availabilities from smartagenda')
  const start=moment().add(0, 'days').startOf('day')
  const end=moment().add(AVAILABILITIES_RANGE_DAYS, 'days').startOf('day')
  return User.find({role: ROLE_EXTERNAL_DIET, smartagenda_id:{$ne :null}})
    .then(diets => Promise.all(diets.map(d => getDietAppointmentTypes(d)))
      .then(all_app_types => {
        all_app_types=all_app_types.filter(v => !!v)
        // Compute all (diet, appintment type) combinations
        const combinations=[]
        diets.forEach((diet, index) => {
          all_app_types[index].forEach(app_type => {
            if (app_type) {
              combinations.push([diet, app_type])
            }
          })
        })
        // Get smartagenda availabilities for eahc diet/appointment type
        return lodash.isEmpty(combinations) ?
          Promise.resolve([])
          :
          runPromisesWithDelay(combinations.map(([diet, app_type]) => () => {
            console.log(diet.email, diet.smartagenda_id, start, end, app_type.smartagenda_id)
            return getAvailabilities({diet_id: diet.smartagenda_id, from: start, to: end, appointment_type: app_type.smartagenda_id})
            .then(avails => avails.map(avail => ({ user: diet._id, appointment_type: app_type._id, start_date: avail.start_date })))
        }), 100)
        .then(results => {
          const params=lodash(results).map(f => f.value || []).flatten().value()
          // Clear all then create new availabilities
          return Range.deleteMany()
            .then(() => Range.create(params, {runValidators: true}))
        })
        .then(() => Range.countDocuments())
        .then(res => console.log(`Created ${res} availability ranges`))
      })
    )
}


const HOOK_INSERT='insert'
const HOOK_UPDATE='update'
const HOOK_DELETE='delete'

module.exports={
  getToken,
  getAccount,
  getAccounts,
  getAgenda,
  getAgendas,
  getEvents,
  getAllData,
  createAppointment,
  deleteAppointment,
  smartDietToMoment,
  upsertAccount,
  getAvailabilities,
  getAppointmentTypes,
  HOOK_INSERT,
  HOOK_DELETE,
  HOOK_UPDATE,
  synchronizeAvailabilities,
  getAppointmentVisioLink,
}
