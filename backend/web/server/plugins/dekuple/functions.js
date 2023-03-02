const Reminder = require('../../models/Reminder')
const Appointment = require('../../models/Appointment')
const {
  getAccessToken,
  getDevices,
  getFreshAccessToken,
  getMeasures
} = require('../../utils/withings')
const {
  APPOINTMENT_TYPE,
  GENDER,
  MEASURE_AUTO,
  MEASURE_SOURCE,
  REMINDER_TYPE,
  SMOKER_TYPE,
  WITHINGS_MEASURE_BPM,
  WITHINGS_MEASURE_DIA,
  WITHINGS_MEASURE_SYS,
} = require('./consts')
const Measure = require('../../models/Measure')
const lodash=require('lodash')
const moment = require('moment')
const cron = require('node-cron')
const User = require('../../models/User')
const Device = require('../../models/Device')
const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
  setFilterDataUser,
} = require('../../utils/database')

const preCreate = ({model, params, user}) => {
  if (['measure', 'appointment', 'reminder'].includes(model)) {
    params.user=user
  }
  return Promise.resolve({model, params})
}

setPreCreateData(preCreate)


const preprocessGet = ({model, fields, id, user}) => {
  if (model=='loggedUser') {
    model='user'
    id = user?._id || 'INVALIDID'
  }

  return Promise.resolve({model, fields, id})

}

setPreprocessGet(preprocessGet)

const filterDataUser = ({model, data, id, user}) => {

  // List mode
  if (['user', 'loggedUser'].includes(model)) {
    console.log(`Calling filter with ${JSON.stringify(data)}`)
    return data.map(d => ({
      ...d,
      measures: d.measures && lodash.orderBy(d.measures, ['date'], ['desc'])
    }))
  }

  return data
}

setFilterDataUser(filterDataUser)

const USER_MODELS=['user', 'loggedUser']
USER_MODELS.forEach(m => {
  declareEnumField({model: m, field: 'gender', enumValues: GENDER})
  declareEnumField({model: m, field: 'smoker', enumValues: SMOKER_TYPE})
  declareVirtualField({model: m, field: 'fullname', instance: 'String', requires: 'firstname,lastname'})
  declareVirtualField({model: m, field: 'measures', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'measure'}}})
  declareVirtualField({model: m, field: 'appointments', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'appointment'}}})
  declareVirtualField({model: m, field: 'reminders', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'reminder'}}})
  declareVirtualField({model: m, field: 'password2', instance: 'String'})
  declareVirtualField({model: m, field: 'devices', instance: 'Array', requires: '', multiple: true,
    caster: {
      instance: 'ObjectID',
      options: {ref: 'device'}}})
})

declareVirtualField({model: 'measure', field: 'recommandation', instance: 'String', requires: 'sys,dia'})
declareVirtualField({model: 'measure', field: 'source', instance: 'String', requires: 'withings_group', enumValues: MEASURE_SOURCE})

declareEnumField({model: 'appointment', field: 'type', instance: 'String', enumValues: APPOINTMENT_TYPE})
declareVirtualField({model: 'appointment', field: 'type_str', instance: 'String', requires: 'type,otherTitle'})

declareEnumField({model: 'reminder', field: 'type', instance: 'String', enumValues: REMINDER_TYPE})
declareVirtualField({model: 'reminder', field: 'type_str', instance: 'String', requires: 'type,otherTitle'})
declareVirtualField({model: 'reminder', field: 'reccurency_str', instance: 'String', requires: 'monday,tuesday,wednesday,thursday,friday,saturday,sunday'})

const updateTokens = user => {
  const fn=!user.access_token ? getAccessToken(user.withings_usercode) : getFreshAccessToken(user.refresh_token)
  return fn
    .then(tokens => {
      user.withings_id=tokens.userid
      user.access_token=tokens.access_token
      user.refresh_token=tokens.refresh_token
      user.csrf_token=tokens.csrf_token
      user.expires_at=moment().add(tokens.expires_in, 'seconds')
      user.withings_usercode=null
      return user.save()
    })

}

// Ensure Users tokens are up to date every hour
cron.schedule('0 */30 * * * *', () => {
  const expirationMoment=moment().add(1, 'hour')
  User.find({$or: [{access_token: null}, {expires_at: {$lte: expirationMoment}}]})
    .then(users => {
      if (users.length==0) {
        return null
      }
      return Promise.allSettled(users.map(u => updateTokens(u)))
    })
    .then(res => {
      if (!res) { return }
      const ok=res.filter(r => r.status=='fulfilled').map(r => r.value.email)
      const nok=res.filter(r => r.status=='rejected').map(r => r.reason)
      if (ok.length>0) {
        console.log(`Updated tokens for ${ok.join(',')}`)
      }
      if (nok) {
        console.error(`Errors:${JSON.stringify(nok)}`)
      }
    })
})

// Get all measures TODO should be notified by Withings
cron.schedule('*/30 * * * * *', async () => {
  console.log(`Getting measures`)
  const users=await User.find({}, {access_token:1, email:1})
      .populate({path:'measures'})
      .lean({virtuals: true})
  return Promise.all(users.map(async user => {
    const latestMeasure=lodash(user.measures)
      .filter(m => m.source==MEASURE_AUTO)
      .maxBy(m => m.date)
    if (user.access_token) {
      const since=latestMeasure? moment(latestMeasure.date).add(5, 'seconds') : moment().add(-10, 'days')
      console.log(`User ${user.email}:request measures since ${since}`)
      const newMeasures=await getMeasures(user.access_token, since)
      console.log(`User ${user.email}:got measures ${JSON.stringify(newMeasures)}`)
      if (newMeasures.measuregrps.length>0) {
        console.log(`User ${user.email}:got ${newMeasures.measuregrps.length} new measures since ${since}`)
      }
      return Promise.all(newMeasures.measuregrps.map( grp => {
        const dekMeasure={
          user: user._id, date: moment.unix(grp.date), withings_group: grp.grpid,
          sys: grp.measures.find(m => m.type==WITHINGS_MEASURE_SYS)?.value,
          dia: grp.measures.find(m => m.type==WITHINGS_MEASURE_DIA)?.value,
          heartbeat: grp.measures.find(m => m.type==WITHINGS_MEASURE_BPM)?.value,
        }
        return Measure.findOneAndUpdate(
          {withings_group: dekMeasure.withings_group},
          {...dekMeasure},
          {upsert: true}
        )
      }))
    }
  }))
})

// Get all devices TODO should be notified by Withings
cron.schedule('24 */10 * * * *', async () => {
  console.log(`Getting devices`)
  const users=await User.find({access_token:{$ne: null}})
    .populate('devices')
    .lean({virtuals: true})
  return Promise.allSettled(users.map(async user => {
    const devices=await getDevices(user.access_token)
    if (devices.length>0) {
      console.log(`User ${user.email}: ${devices.length} devices found`)
    }
    const mappedDevices=devices.map(device => ({
      user: user._id,
      ...device,
      last_session_date: moment.unix(device.last_session_date),
    }))
    // First remove all devices
    await Device.deleteMany({user: user._id}).catch(err => {console.error(err)})
    // Then recreate devices
    await Device.create(mappedDevices).catch(err => {console.error(err)})
  }))
  .then(res => {
    const errors=lodash.zip(res, users)
      .filter(([r]) => r.status=='rejected')
      .map(([r,u]) => `User ${u.email}: ${r.reason}`)
    errors.length>0 &&console.error(errors)
  })
})

// Send notifications for reminders & apppointments
// Poll every minute
cron.schedule('15 * * * * *', async () => {
  let reminders=await Reminder.find({active: true}.populate('user')
  reminders=reminders.filter(r => r.shouldNotify())
  if (!lodash.isEmpty(reminders)) {
    console.log(`Remind ${reminders.map(r => `${r.type_str} for ${r.user.email}`)}`)
  }

  let appointments=await Appointment.find().populate('user')
  appointments=appointments.filter(a => a.shouldNotify())

  if (!lodash.isEmpty(appointments)) {
    console.log(`Appointment ${appointments.map(r => `${r.type_str} for ${r.user.email}`)}`)
  }
})

module.exports={
  updateTokens,
}
