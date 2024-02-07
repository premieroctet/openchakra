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
  STATUS_FAMILY
} = require('../consts')
const { isEmailOk } = require('../../../../utils/sms')
const { CREATED_AT_ATTRIBUTE } = require('../../../../utils/consts')

const siret = require('siret')
const luhn = require('luhn')
const {
  idEqual,
  setIntersects,
  shareTargets
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
    validate: [isEmailOk, v => `L'email '${v.value}' est invalide`],
  },
  phone: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  birthday: {
    type: Date,
    //required: [function() { return this.role==ROLE_CUSTOMER }, 'La date de naissance est obligatoire'],
    required: false,
  },
  // Height in centimeters
  height: {
    type: Number,
    validate: {
      validator: function(value) {
        // Check if the value is provided before applying the minimum check
        return lodash.isNil(value) || lodash.inRange(value, MIN_HEIGHT, MAX_HEIGHT+1)
      },
      message: `Taille attendue entre ${MIN_HEIGHT} et ${MAX_HEIGHT} cm`,
    },
    required: false,
  },
  pseudo: {
    type: String,
    set: v => v?.trim(),
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Le pseudo est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company',
    required: [function() { return this.role==ROLE_CUSTOMER }, 'La compagnie est obligatoire'],
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
  },
  cguAccepted: {
    type: Boolean,
    validate: {
      validator: function(v) { return this.role!=ROLE_CUSTOMER || !!v },
      message: 'Vous devez accepter les CGU',
    },
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Vous devez accepter les CGU'],
  },
  dataTreatmentAccepted: {
    type: Boolean,
    validate: {
      validator: function(v) { return this.role!=ROLE_CUSTOMER || !!v },
      message: 'Vous devez accepter le traitement des données',
    },
    required: [function() { return this.role==ROLE_CUSTOMER }, 'Vous devez accepter le traitement des données'],
  },
  child_count: {
    type: Number,
    default: 0,
    required: false,
  },
  gender: {
    type: String,
    enum: Object.keys(GENDER),
    //required: [function() { return this.role==ROLE_CUSTOMER }, 'Le genre est obligatoire'],
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
      default: moment(),
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
    validate: [v => !v || luhn.validate(v), v => `Le numéro ADELI '${v.value}' est invalide`],
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
    default: function() {return this.role==ROLE_EXTERNAL_DIET ? DIET_REGISTRATION_STATUS_TO_QUALIFY : undefined},
    required: [function() {return this.role==ROLE_EXTERNAL_DIET}, 'Le statut de diet externe est obligatoire'],
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
  migration_id: {
    type: Number,
    required: false,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */

// Mail unicity
UserSchema.index(
  { email: 1},
  { unique: true, message: 'Un compte avec ce mail existe déjà' });

// Required for register validation only
UserSchema.virtual('password2').get(function() {
})

UserSchema.virtual('fullname').get(function() {
  return `${this.firstname || ''} ${this.lastname || ''}`
})

UserSchema.virtual('spoons_count').get(function() {
  return null
})

UserSchema.virtual("surveys", {
  ref: "userSurvey", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("_all_contents", {
  ref: "content", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

// Computed virtual
UserSchema.virtual('contents', {localField: '_id', foreignField: '_id'}).get(function () {
  return null
})

UserSchema.virtual("available_groups", {localField: 'id', foreignField: 'id'}).get(function () {
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

// User's webinars are the company's ones
UserSchema.virtual('_all_webinars', {localField:'_id', foreignField: '_id'}).get(function() {
  return this.company?.webinars||[]
})

// User's webinars are the company's ones
UserSchema.virtual('webinars', {localField:'_id', foreignField: '_id'}).get(function() {
  const exclude=[
    ...(this.skipped_events?.map(s => s._id)||[]),
    ...(this.passed_events?.map(s => s._id)||[]),
  ]
  const res=lodash(this.company?.webinars || [])
    .filter(w => !exclude.some(excl => idEqual(excl._id, w._id)))
    .orderBy(['start_date', 'asc'])
    .value()
  return res
})

// Webinars to come (i.e future, not skipped, not passed)
UserSchema.virtual('available_webinars', {localField:'_id', foreignField: '_id'}).get(function() {
  const now=moment()
  const webinars=lodash(this.webinars)
    .filter(w => moment(w.end_date).isAfter(now))
    .value()
  return webinars
})

// Webinars finished
UserSchema.virtual('past_webinars', {localField:'_id', foreignField: '_id'}).get(function() {
  const now=moment()
  const webinars=lodash(this._all_webinars)
    .filter(w => moment(w.end_date).isBefore(now))
    .value()
  return webinars
})

UserSchema.virtual("_all_individual_challenges", {
  ref: "individualChallenge", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

// Ind. challenge registered still not failed or passed
UserSchema.virtual('current_individual_challenge', {localField: 'id', foreignField: 'id'}).get(function() {
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
UserSchema.virtual('individual_challenges', {localField: 'id', foreignField: 'id'}).get(function() {
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
UserSchema.virtual('passed_individual_challenges', {localField: 'id', foreignField: 'id'}).get(function() {
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
    match: {$and:[{start_date: {$lt: moment()}}, {end_date:{$gt: moment()}}]},
  },
});

// Past menus
UserSchema.virtual("past_menus", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match: {end_date:{$lt: moment()}},
    limit: 6,
    sort: { creation_date: -1 }
  },
});

// Past menus
UserSchema.virtual("future_menus", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match: {start_date:{$gt: moment()}},
    limit: 6,
    sort: { creation_date: 1 }
  },
});

// User's collective challenges are the company's ones
UserSchema.virtual('collective_challenges', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return this.company?.collective_challenges || []
})

// User's events (even skipped or registered and so on)
UserSchema.virtual('_all_events').get(function() {
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

UserSchema.virtual("last_measures", {localField: 'id', foreignField: 'id'}).get(function() {
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

UserSchema.virtual("_all_targets", {
  ref: "target", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

UserSchema.virtual("targets", {localField: 'tagada', foreignField: 'tagada'}).get(function() {
  const all_targets=[...(this.objective_targets||[]), ...(this.health_targets||[]),
    ...(this.specificity_targets||[])]
  if (this.home_target) {
    all_targets.push(this.home_target)
  }
  if (this.activity_target) {
    all_targets.push(this.activity_target)
  }
  const all_target_ids=all_targets.map(t => t._id)
  return this._all_targets?.filter(t => all_target_ids.some(i => idEqual(i, t._id))) || []
})

UserSchema.virtual('offer', {localField: 'tagada', foreignField: 'tagada'}).get(function() {
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
UserSchema.virtual('diet_average_note').get(function() {
  return lodash(this.diet_comments)
    .map(c => c._defined_notes)
    .flatten()
    .mean()
})

UserSchema.virtual('profile_progress').get(function() {
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

// Returned availabilities/ranges are not store in database
UserSchema.virtual('diet_appointments', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return lodash.flatten(this.diet_coachings?.map(c => c.appointments))
})

UserSchema.virtual('diet_appointments_count', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return this.diet_appointments?.length || 0
})

// Returned availabilities/ranges are not store in database
UserSchema.virtual('diet_patients', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return lodash.uniqBy(this.diet_coachings?.map(c => c?.user), u => u?._id).filter(v => !!v)
})

UserSchema.virtual('diet_patients_count', {localField:'tagada', foreignField:'tagada'}).get(function() {
  return this.diet_patients?.length || 0
})

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

/* eslint-enable prefer-arrow-callback */

module.exports = UserSchema
