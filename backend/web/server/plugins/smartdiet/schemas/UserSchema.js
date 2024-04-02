const {
  ACTIVITY,
  DIET_ACTIVITIES,
  DIET_EXT_HOUR_RANGE,
  DIET_EXT_OFFDAYS,
  DIET_REGISTRATION_STATUS,
  DIET_REGISTRATION_STATUS_TO_QUALIFY,
  EVENT_IND_CHALLENGE,
  GENDER,
  MAX_HEIGHT,
  MIN_HEIGHT,
  NO_CREDIT_AVAILABLE,
  REGISTRATION_WARNING,
  ROLES,
  ROLE_CUSTOMER,
  ROLE_EXTERNAL_DIET,
  ROLE_RH,
  STATUS_FAMILY,
} = require('../consts')
const { isEmailOk, isPhoneOk } = require('../../../../utils/sms')
const { CREATED_AT_ATTRIBUTE } = require('../../../../utils/consts')

const siret = require('siret')
const luhn = require('luhn')
const {
  idEqual,
  setIntersects,
  shareTargets,
  DUMMY_REF
} = require('../../../utils/database')
const mongoose = require('mongoose')
const moment=require('moment')
const { ForbiddenError } = require('../../../utils/errors')
const {schemaOptions} = require('../../../utils/schemas')
const lodash=require('lodash')
const bcrypt = require('bcryptjs')
const IBANValidator = require('iban-validator-js')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  firstname: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'Le prénom est obligatoire'],
  },
  lastname: {
    type: String,
    set: v => v?.trim(),
    required: [true, 'Le nom de famille est obligatoire'],
  },
  email: {
    type: String,
    required: [true, `L'email est obligatoire`],
    set: v => v ? v.toLowerCase().trim() : v,
    index: true,
    validate: [isEmailOk, v => `L'email '${v.value}' est invalide`],
  },
  phone: {
    type: String,
    validate: [value => !value || isPhoneOk(value), 'Le numéro de téléphone doit commencer par 0 ou +33'],
    set: v => v?.replace(/^0/, '+33'),
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    required: false,
  },
  // Height in centimeters
  height: {
    type: Number,
    validate: {
      validator: function(value) {
        // Check if the value is provided before applying the minimum check
        return lodash.isEmpty(value) || lodash.inRange(value, MIN_HEIGHT, MAX_HEIGHT+1)
      },
      message: `Taille attendue entre ${MIN_HEIGHT} et ${MAX_HEIGHT} cm`,
    },
    required: false,
  },
  pseudo: {
    type: String,
    set: v => v?.trim(),
    required: [function() { return this?.role==ROLE_CUSTOMER }, 'Le pseudo est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: [function() { return this?.role==ROLE_CUSTOMER }, 'La compagnie est obligatoire'],
  },
  company_code: {
    type: String,
    set: v => v ? v.replace(/ /g,'') : v,
    required: false,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    set: pass => pass ? bcrypt.hashSync(pass, 10) : null,
  },
  role: {
    type: String,
    enum: Object.keys(ROLES),
    default: ROLE_CUSTOMER,
    required: [true, 'Le rôle est obligatoire'],
    index: true,
  },
  cguAccepted: {
    type: Boolean,
    required: [function() { return this?.role==ROLE_CUSTOMER }, 'Vous devez accepter les CGU'],
  },
  dataTreatmentAccepted: {
    type: Boolean,
    required: [function() { return this?.role==ROLE_CUSTOMER }, 'Vous devez accepter le traitement des données'],
  },
  child_count: {
    type: Number,
    default: 0,
    required: false,
  },
  gender: {
    type: String,
    enum: Object.keys(GENDER),
    required: false,
  },
  objective_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: true,
  }],
  health_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: true,
  }],
  activity_target: {
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: false,
  },
  specificity_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: true,
  }],
  home_target: {
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: false,
  },
  skipped_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  }],
  passed_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  }],
  registered_events: [{
    event: {
      type: Schema.Types.ObjectId,
      ref: 'event',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    }
  }],
  failed_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  }],
  routine_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  }],
  replayed_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
  }],
  networks: [{
    type: Schema.Types.ObjectId,
    ref: 'network',
    required: true,
  }],
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
  // ROLE_EXTERNAL_DIET
  job: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zip_code: {
    type: String,
    validate: [v => lodash.isEmpty(v) || /^\d{5}$/.test(v), v => `Le code postal '${v.value}' est invalide`],
    required: false,
  },
  siret: {
    type: String,
    set: v => v ? v.replace(/ /g, '') : v,
    validate: [v => !v || (siret.isSIRET(v)||siret.isSIREN(v)) , v => `Le siret/siren '${v.value}' est invalide`],
    required: false,
  },
  adeli: {
    type: String,
    set: v => v ? v.replace(/ /g, '') : v,
    required: false,
  },
  customer_companies: [{
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: true,
  }],
  website: {
    type: String,
    required: false,
  },
  // Raison sociale pour les diets
  company_name: {
    type: String,
    required: false,
  },
  // IBAN pour les diets
  iban: {
    type: String,
    validate: [v => !v || IBANValidator.isValid(v), v => `L'IBAN '${v.value}' est invalide`],
    required: false,
  },
  // RIB pour les diets
  rib: {
    type: String,
    required: false,
  },
  // TODO: handle multiple enum declaration
  /**
  activities: [{
    type: String,
    enum: Object.keys(DIET_ACTIVITIES),
    required: false,
  }],
  */
  diet_coaching_enabled: {
    type: Boolean,
    required: false,
  },
  diet_visio_enabled: {
    type: Boolean,
    required: false,
  },
  diet_site_enabled: {
    type: Boolean,
    required: false,
  },
  // END TODO: handle multiple enum declaration
  // TODO :set to ACTIVE when profile is 100%
  registration_status: {
    type: String,
    enum: Object.keys(DIET_REGISTRATION_STATUS),
    default: function() {return this?.role==ROLE_EXTERNAL_DIET ? DIET_REGISTRATION_STATUS_TO_QUALIFY : undefined},
    required: [function() {return this?.role==ROLE_EXTERNAL_DIET}, 'Le statut de diet externe est obligatoire'],
  },
  signed_charter: {
    type: String,
    required: false,
  },
  // Reasons offered by diet
  reasons: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: true,
  }],
  // In case of integrity check company, warning
  registration_warning: {
    type: String,
    enum: Object.keys(REGISTRATION_WARNING),
    required: false,
  },
  smartagenda_id: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
  last_activity: {
    type: Date,
    required: false,
  },
  diet_patients_count: {
    type: Number,
  },
  diet_appointments_count: {
    type: Number,
  },
  spoons_count: {
    type: Number,
  },
  spoons_count: {
    type: Number,
  },
  diet_admin_comment: {
    type: String,
    required: false,
  },
  // Created from...
  source: {
    type: String,
    required: false,
  },
  // comment on user from diet
  diet_comment: {
    type: String,
  },
}, {...schemaOptions})

/* eslint-disable prefer-arrow-callback */

// Mail unicity
UserSchema.index(
  { email: 1},
  { unique: true, message: 'Un compte avec ce mail existe déjà' });

// Required for register validation only
UserSchema.virtual('password2', DUMMY_REF).get(function() {
})

UserSchema.virtual('fullname', DUMMY_REF).get(function() {
  return `${this.firstname || ''} ${this.lastname || ''}`
})

/** Logbooks
 * */
UserSchema.virtual('all_logbooks', {
  ref: 'coachingLogbook',
  localField: '_id',
  foreignField: 'user',
})

// Returns the LogbookDay compléting if required
UserSchema.virtual('logbooks', DUMMY_REF).get(function() {
  const grouped=lodash(this.all_logbooks).sortBy(l => l.day).groupBy(l => l.day)
  const lbd=grouped.entries().map(([day, logbooks]) => mongoose.models.logbookDay({day, logbooks:logbooks?.map(fl => fl.logbook)}))
  return lbd.value()
})



UserSchema.virtual("surveys", {
  ref: "userSurvey", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

const computeTargets = user => {
  const res=lodash([user.objective_targets,user.health_targets,user.activity_target,user.specificity_targets,user.home_target])
    .flatten()
    .filter(v => !!v)
    .value()
  return res

}
// Computed virtual
UserSchema.virtual('contents', {
  ref: "content", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match : u => {
      return {targets: {$in: computeTargets((u))}}
    }
  }
})

UserSchema.virtual("available_groups", DUMMY_REF).get(function () {
  return lodash(this.company?.groups)
    .filter(g => shareTargets(this, g))
    .differenceBy(this.registered_groups, g => g._id.toString())
    .value()
})

UserSchema.virtual("registered_groups", {
  ref: "group", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "users" // is equal to foreignField
});

// TODO get rid of this
// User's webinars are the company's ones
UserSchema.virtual('_all_webinars', DUMMY_REF).get(function() {
  return this.company?.webinars||[]
})

// User's webinars are the company's ones
UserSchema.virtual('webinars', DUMMY_REF).get(function() {
  const exclude=[
    ...(this.skipped_events?.map(s => s._id)||[]),
  ]
  const res=lodash(this.company?.webinars || [])
    .filter(w => !exclude.some(excl => idEqual(excl._id, w._id)))
    .orderBy(['start_date', 'asc'])
    .value()
  return res
})

// Webinars to come (i.e future, not skipped, not passed)
UserSchema.virtual('available_webinars', DUMMY_REF).get(function() {
  const now=moment()
  const webinars=lodash(this.webinars)
    .filter(w => moment(w.end_date).isAfter(now))
    .first()
  return webinars ? [webinars] : []
})

// Any past company webinar
UserSchema.virtual("past_webinars", {
  ref: "webinar", // The Model to use
  localField: "company", // Find in Model, where localField
  foreignField: "companies", // is equal to foreignField
  options: {
    match: () => {
      return {end_date: {$lt: Date.now()}}
    }
  },
});

UserSchema.virtual("_all_individual_challenges", {
  ref: "individualChallenge", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

// Ind. challenge registered still not failed or passed
UserSchema.virtual('current_individual_challenge', DUMMY_REF).get(function() {
  if (!this._all_individual_challenges?.length) {
    return null
  }
  const exclude=[
    ...(this.passed_events?.map(s => s._id)||[]),
    ...(this.routine_events?.map(s => s._id)||[]),
    ...(this.failed_events?.map(s => s._id)||[]),
  ]
  return (this._all_individual_challenges||[])
    .filter(i => this.registered_events.some(r => idEqual(r.event?._id, i._id)))
    .find(i => !exclude.some(e => idEqual(e._id, i._id)))
})

// User's ind. challenges are all expect the skipped ones and the passed ones
UserSchema.virtual('individual_challenges', DUMMY_REF).get(function() {
  const exclude=[
    ...(this.skipped_events?.map(s => s._id)||[]),
    ...(this.passed_events?.map(s => s._id)||[]),
    ...(this.failed_events?.map(s => s._id)||[]),
    ...(this.routine_events?.map(s => s._id)||[]),
  ]
  // Search for a current challenge : registered and not excluded
  const currentChallenge=this.current_individual_challenge
  return lodash(this._all_individual_challenges||[])
    .filter(c => !exclude.some(excl => idEqual(excl._id, c._id)))
    .filter(c => !currentChallenge || idEqual(currentChallenge._id, c._id))
    .orderBy(['update_date'], ['asc'])
    .value()
})

// User's ind. challenges are all expect the skipped ones and the passed ones
UserSchema.virtual('passed_individual_challenges', DUMMY_REF).get(function() {
  const passed=this.passed_events?.map(s => s._id)||[]
  return this._all_individual_challenges?.filter(c => passed.find(p => idEqual(p._id, c._id)))||[]
})

UserSchema.virtual("_all_menus", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

// Available menus for this week
UserSchema.virtual("available_menus", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match: () => {
      return {start_date: {$lt: Date.now()}, end_date:{$gt: Date.now()}}
    }
  },
});

// Past menus
UserSchema.virtual("past_menus", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match: () => {
      return {end_date:{$lt: Date.now()}}
    },
    sort: { creation_date: -1 }
  },
});

// Past menus
UserSchema.virtual("future_menus", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match: () => {
      return {start_date:{$gt: Date.now()}}
    },
    sort: { start_date: 1 }
  },
});

// User's collective challenges are the company's ones
UserSchema.virtual('collective_challenges', DUMMY_REF).get(function() {
  return this.company?.collective_challenges || []
})

// User's events (even skipped or registered and so on)
UserSchema.virtual('_all_events', DUMMY_REF).get(function() {
  return [
    ...(this._all_menus||[]), ...(this._all_individual_challenges||[]),
    ...(this.collective_challenges||[]), ...(this._all_webinars||[])]
    .filter(v=>!!v)
})

UserSchema.virtual("measures", {
  ref: "measure", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("last_measures", DUMMY_REF).get(function() {
  if (lodash.isEmpty(this.measures)) {
    return null
  }
  let measures=this.measures//.map(m => m.toObject())
  measures=measures.map(m => lodash.omit(m, '_id,creation_date,update_date,__v,id,user'.split(',')))
  measures=lodash.orderBy(measures, 'date')
  const res=Object.fromEntries(Object.keys(measures[0]).map(att => {
    const last_value=lodash.map(measures, att).filter(v => !!v).pop() || null
    return [att, last_value]
  }))
  return [res]
})

UserSchema.virtual("pinned_contents", {
  ref: "content", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "pins" // is equal to foreignField
});

UserSchema.virtual("targets", DUMMY_REF).get(function() {
  return computeTargets(this)
})

UserSchema.virtual('offer', DUMMY_REF).get(function() {
  return this.company?.offers?.[0] || null
})

UserSchema.methods.canView = function(content_id) {
  return mongoose.models.content.findById(content_id)
    .then(content => Promise.all([
        mongoose.models.company.findById(this.company).populate('offers'),
        mongoose.models.content.find({viewed_by:this._id, type: content.type})
      ])
      .then(([{offers}, contents]) => {
        // If no in viewed contents, check credit
        if (!contents.some(c => idEqual(c._id, content_id))
          && !(offers?.[0]?.getContentLimit(content.type)>contents.length)) {
            throw new ForbiddenError(NO_CREDIT_AVAILABLE)
          }
        return true
      }))
}

UserSchema.methods.canJoinEvent = function(event_id) {
  if (this.registered_events.some(e => idEqual(e.event._id, event_id))) {
    return Promise.resolve(true)
  }
  return Promise.all([
    mongoose.models.company.findById(this.company).populate('offers'),
    mongoose.models.event.findById(event_id),
    mongoose.models.event.find({"_id": {$in: this.registered_events}}),
  ])
    .then(([{offers}, event, registered_events]) => {
      const sameTypeEventsCount=registered_events.filter(e => e.event.type==event.type).length
      const limit=offers[0]?.getEventLimit(event.type)
      if (sameTypeEventsCount>=limit) {
        throw new ForbiddenError(NO_CREDIT_AVAILABLE)
      }
      return true
    })
}

// External Diet
UserSchema.virtual("diploma", {
  ref: "diploma", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

// Comments for diet
UserSchema.virtual("diet_comments", {
  ref: "dietComment", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "diet" // is equal to foreignField
});

// Diet : average_note
UserSchema.virtual('diet_average_note', DUMMY_REF).get(function() {
  return lodash(this.diet_comments)
    .map(c => c._defined_notes)
    .flatten()
    .mean()
})

UserSchema.virtual('profile_progress', DUMMY_REF).get(function() {
  let filled=[this.diploma?.length>0, !!this.adeli, !!this.siret, !!this.signed_charter]
  return (filled.filter(v => !!v).length*1.0/filled.length)*100
});

// Comments for diet
UserSchema.virtual("diet_objectives", {
  ref: "quizzQuestion", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "diet_private" // is equal to foreignField
});

UserSchema.virtual("coachings", {
  ref: "coaching", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
})

UserSchema.virtual("latest_coachings", {
  ref: "coaching", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user", // is equal to foreignField
  options: { sort: { creation_date: -1 }, limit:1 },
  array: true,
})

UserSchema.virtual("diet_coachings", {
  ref: "coaching", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "diet", // is equal to foreignField
})

UserSchema.virtual("diet_questions", {
  ref: "quizzQuestion", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "diet_private", // is equal to foreignField
})

UserSchema.virtual("availability_ranges", {
  ref: "range", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user", // is equal to foreignField
})

UserSchema.virtual("keys", {
  ref: "key", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
})

// UserSchema.virtual("diet_appointments", {
//   ref: "appointment", // The Model to use
//   localField: "_id", // Find in Model, where localField
//   foreignField: "diet", // is equal to foreignField
// })

// TODO this should work !!!
// UserSchema.virtual("diet_appointments_count", {
//   ref: "appointment", // The Model to use
//   localField: "_id", // Find in Model, where localField
//   foreignField: "diet", // is equal to foreignField
//   count: true,
// })

// Returned availabilities/ranges are not store in database
UserSchema.virtual('imc', {localField:'tagada', foreignField:'tagada'}).get(function() {
  if (this.role==ROLE_CUSTOMER) {
    const latestWeight=lodash(this.measures).filter(m => !!m.weight).sortBy('date').last()
    const imc=latestWeight?.weight/Math.pow(this.height/100.0, 2) || undefined
    return imc
  }
})

// Days to the lastest activity
UserSchema.virtual('days_inactivity', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return moment().diff(moment(this.last_activity), 'days')
})

UserSchema.virtual("nutrition_advices", {
  ref: "nutritionAdvice", // The Model to use
  localField: function() {return this.role==ROLE_EXTERNAL_DIET ?  "_id" : "email"}, // Find in Model, where localField
  foreignField: function() {return this.role==ROLE_EXTERNAL_DIET ?  "diet" : "patient_email"}, // is equal to foreignField
})

/* eslint-enable prefer-arrow-callback */

module.exports = UserSchema
