const moment = require('moment')
const cron = require('node-cron')
const {getAccessToken, getFreshAccessToken} = require('../../utils/withings')
const User = require('../../models/User')
const {
  declareEnumField,
  declareVirtualField,
  setPreCreateData,
  setPreprocessGet,
} = require('../../utils/database')
const {
  APPOINTMENT_TYPE,
  REMINDER_TYPE,
  GENDER,
  MEASURE_TYPE,
  SMOKER_TYPE,
} = require('./consts')


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
})

declareEnumField({model: 'measure', field: 'type', enumValues: MEASURE_TYPE})
declareVirtualField({model: 'measure', field: 'recommandation', instance: 'String', requires: 'sys,dia'})

declareEnumField({model: 'appointment', field: 'type', instance: 'String', enumValues: APPOINTMENT_TYPE})
declareVirtualField({model: 'appointment', field: 'type_str', instance: 'String', requires: 'type,otherTitle'})

declareEnumField({model: 'reminder', field: 'type', instance: 'String', enumValues: REMINDER_TYPE})
declareVirtualField({model: 'reminder', field: 'type_str', instance: 'String', requires: 'type,otherTitle'})
declareVirtualField({model: 'reminder', field: 'reccurency_str', instance: 'String', requires: 'monday,tuesday,wednesday,thursday,friday,saturday,sunday'})


// Ensure Users tokens are up to date every hour
cron.schedule('0 */30 * * * *', () => {
  const expirationMoment=moment().add(1, 'hour')
  User.find({$or: [{access_token: null}, {expires_at: {$lte: expirationMoment}}]})
    .then(users => {
      console.log(`Found ${users.length} users without tokens or nearly expiring tokens`)
      if (users.length==0) {
        return null
      }
      return Promise.allSettled(users.map(u => {
        const fn=!u.access_token ? getAccessToken(u.withings_usercode) : getFreshAccessToken(u.refresh_token)
        return fn
          .then(tokens => {
            u.access_token=tokens.access_token
            u.refresh_token=tokens.refresh_token
            u.csrf_token=tokens.csrf_token
            u.expires_at=moment().add(tokens.expires_in, 'seconds')
            u.withings_usercode=null
            return u.save()
          })
      }))
    })
    .then(res => {
      if (!res) { return }
      const ok=res.filter(r => r.status=='fulfilled').map(r => r.value.email)
      const nok=res.filter(r => r.status=='rejected').map(r => r.reason)
      console.log(`Users token updated:${JSON.stringify(ok)}`)
      console.error(`Errors:${JSON.stringify(nok)}`)
    })
})
