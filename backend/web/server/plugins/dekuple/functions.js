const Measure = require('../../models/Measure')
const {
  getAccessToken,
  getFreshAccessToken,
  getMeasures
} = require('../../utils/withings')
const lodash=require('lodash')
const {
  APPOINTMENT_TYPE,
  GENDER,
  MEASURE_AUTO,
  MEASURE_MANUAL,
  MEASURE_SOURCE,
  REMINDER_TYPE,
  SMOKER_TYPE,
} = require('./consts')
const moment = require('moment')
const cron = require('node-cron')
const User = require('../../models/User')
const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
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
cron.schedule('0 */10 * * * *', async () => {
  const users=await User.find({}, {access_token:1, email:1})
      .populate({path:'measures', select:'source date'})
      .lean()
  for (const user of users) {
    const latestMeasure=lodash(user.measures)
      .filter(m => m.source==MEASURE_AUTO)
      .maxBy(m => m.date)
    const since=latestMeasure?.date.add(1, 'second') || moment().add(-2, 'days')
    if (user.access_token) {
      const newMeasures=await getMeasures(user.access_token, since)
      for (const grp of newMeasures.measuregrps) {
        const dekMeasure={
          user: user._id, date: grp.date, withings_group: grp.grpid,
          sys: grp.measures.find(m => m.type==WITHINGS_MEASURE_SYS)?.value,
          dia: grp.measures.find(m => m.type==WITHINGS_MEASURE_SYS)?.value,
          heartbeat: grp.measures.find(m => m.type==WITHINGS_MEASURE_BPM)?.value,
        }
        console.log(`Creating ${JSON.Stringify(dekMeasure)}`)
        await Measure.create(dekMeasure)
          .catch(err => console.error(err))
      }
    }
  }
})

module.exports={
  updateTokens,
}
