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
const Range = require('../../models/Range')
const User = require('../../models/User')
const { ROLE_EXTERNAL_DIET } = require('../smartdiet/consts')
const AppointmentType = require('../../models/AppointmentType')
const axios = require('axios')
const config = require('../../../config/config')
const crypto=require('crypto')
const lodash=require('lodash')
require('lodash.product')
const moment=require('moment')
require('moment-round')
const cron=require('node-cron')

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

let APPOINTMENT_TYPES=null

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

const getToken = () => {
  const params={
    login: CONFIG.SMARTAGENDA_LOGIN,
    pwd: CONFIG.SMARTAGENDA_SHA1_PASSWORD,
    api_id: CONFIG.SMARTAGENDA_API_ID,
    api_key: CONFIG.SMARTAGENDA_API_KEY,
  }
  return axios.get(TOKEN_URL, {params:params})
    .then(res => res.data.token)
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


const getDietUnavailabilities = diet_id => {
  const filter={
    'filter[0][field]':'equipe_id',
    'filter[0][comp]': '=',
    'filter[0][value]': diet_id,
  }
  return getToken()
    .then(token => axios.get(EVENTS_URL+'?sortdesc', {params:{token, nbresults: MAX_RESULTS, ...filter, sortby: 'start_date'}}))
    .then(res => res.data)
}

const getDietAvailabilities = diet_id => {
  const filter={
    'filter[0][field]':'equipe_id',
    'filter[0][comp]': '=',
    'filter[0][value]': diet_id,
  }
  return getToken()
    .then(token => axios.get(EVENTS_OUVERTURE_URL+'?sortdesc', {params:{token, nbresults: MAX_RESULTS, ...filter, sortby: 'start_date'}}))
    .then(res => res.data)
}

const getCustomerAppointments = customer_id => {
  const filter={
    'filter[0][field]':'client_id',
    'filter[0][comp]': '=',
    'filter[0][value]': customer_id,
  }
  return getToken()
    .then(token => axios.get(EVENTS_URL+'?sortdesc', {params:{token, nbresults: MAX_RESULTS, ...filter, sortby: 'start_date'}}))
    .then(res => res.data)
}

const createAppointment = (diet_id, client_id, start_date, end_date) => {
  const data={
    equipe_id: diet_id,
    client_id: client_id,
    presta_id: '0',
    text: 'Un rendez-vous',
    internet: 'App Smartdiet',
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

// c$Types rendez-vousAgendas: diets
const getAppointmentTypes = () => {
  if (APPOINTMENT_TYPES) {
    return APPOINTMENT_TYPES
  }
  return getToken()
    .then(token => axios.get(APPOINTMENT_TYPE_URL, {params:{token, nbresults: MAX_RESULTS}}))
    .then(res => {
      APPOINTMENT_TYPES=res.data
      return APPOINTMENT_TYPES
    })
}

const getAvailabilities = ({diet_id, from, to, appointment_type}) => {
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
}

// Synchronize appointment types every minute
cron.schedule('0 * * * * *', () => {
  console.log('Syncing appointment types from smartagenda')
  return Promise.all([getAppointmentTypes(), AppointmentType.find()])
    .then(([smartagenda_types, local_types]) => {
      smartagenda_types=smartagenda_types.filter(s => s.id>0)
      const missing=lodash.differenceWith(smartagenda_types, local_types, (sm, loc) => sm.id==loc.smartagenda_id)
      console.log(`Syncing ${missing.length} smartagenda appointment types`)
      const promises=missing.slice(0,5).map(sm => AppointmentType.create({title:sm.nom, duration: sm.duree, smartagenda_id: sm.id}))
      return Promise.allSettled(promises)
    })
    .then(res => res.length && console.log(res))
})

// Synchronize availabilities every minute
cron.schedule('0 * * * * *', () => {
  console.log('Syncing availabilities from smartagenda')
  const start=moment().add(-7, 'days')
  const end=moment().add(7, 'days')
  return Promise.all([User.find({role: ROLE_EXTERNAL_DIET, smartagenda_id: {$ne: null}}), AppointmentType.find()])
    .then(([diets, app_types]) => {
      const combinations=lodash.product(diets, app_types)
      return Promise.allSettled(combinations.map(([diet, app_type]) => {
        return getAvailabilities({diet_id: diet.smartagenda_id, from: start, to: end, appointment_type: app_type.smartagenda_id})
          .then(avails => {
            return Promise.all(avails.map(avail => {
              const params={ user: diet._id, appointment_type: app_type._id, start_date: avail.start_date }
              return Range.findOneAndUpdate(params,params, {upsert: true})
            }))
          })
          .catch(err => console.error(err.data.message))
      }))
    })
    .then(() => Range.countDocuments())
    .then(res => console.log(`Created ${res} availability ranges`))
    .catch(console.error)
})


module.exports={
  getToken,
  getAccount,
  getAccounts,
  getAgenda,
  getAgendas,
  getEvents,
  getAllData,
  createAppointment,
  getCustomerAppointments,
  deleteAppointment,
  getDietUnavailabilities,
  getDietAvailabilities,
  smartDietToMoment,
  upsertAccount,
  getAvailabilities,
  getAppointmentTypes,
}
