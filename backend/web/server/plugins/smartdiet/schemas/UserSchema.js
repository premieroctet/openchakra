const mongoose = require('mongoose')
const moment=require('moment')
const { idEqual, shareTargets } = require('../../../utils/database')
const {schemaOptions} = require('../../../utils/schemas')
const {ACTIVITY, ROLES, ROLE_CUSTOMER, ROLE_RH, STATUS_FAMILY} = require('../consts')
const {GENDER} = require('../consts')
const lodash=require('lodash')

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
    required: [true, 'L\'email est obligatoire'],
    set: v => v.toLowerCase().trim(),
  },
  phone: {
    type: String,
    required: [function() { return this.role==ROLE_CUSTOMER}, 'Le téléphone est obligatoire'],
  },

  birthday: {
    type: Date,
    //required: [function() { return this.role==ROLE_CUSTOMER }, 'La date de naissance est obligatoire'],
    required: false,
  },
  height: {
    type: Number,
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
    required: false,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    default: 'invalid',
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
  }],
  health_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
  activity_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
  specificity_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
  }],
  home_target: {
    type: Schema.Types.ObjectId,
    ref: 'target',
  },
  skipped_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
  }],
  passed_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
  }],
  registered_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
  }],
  failed_events: [{
    type: Schema.Types.ObjectId,
    ref: 'event',
  }],
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
}, schemaOptions)

/* eslint-disable prefer-arrow-callback */
// Required for register validation only
UserSchema.virtual('password2').get(function() {
})

UserSchema.virtual('fullname').get(function() {
  return `${this.firstname || ''} ${this.lastname || ''}`
})

UserSchema.virtual('spoons_count').get(function() {
  return null
})

UserSchema.virtual("_all_contents", {
  ref: "content", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

// Computed virtual
UserSchema.virtual('contents', {localField: '_id', foreignField: '_id'}).get(function (callback) {
  return this._all_contents?.filter(c => [ROLE_CUSTOMER, ROLE_RH].includes(this.role) ? !c.hidden : true) || []
})

UserSchema.virtual("available_groups", {localField: 'id', foreignField: 'id'}).get(function () {
  return lodash(this.company?.groups)
    .filter(g => shareTargets(this, g))
    .differenceBy(this.registered_groups, g => g._id.toString())
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

UserSchema.virtual("_all_individual_challenges", {
  ref: "individualChallenge", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

// User's ind. challenges are all expect the skipped ones and the passed ones
UserSchema.virtual('individual_challenges', {localField: 'id', foreignField: 'id'}).get(function() {
  const exclude=[
    ...(this.skipped_events?.map(s => s._id)||[]),
    ...(this.passed_events?.map(s => s._id)||[]),
    ...(this.failed_events?.map(s => s._id)||[]),
  ]
  return this._all_individual_challenges?.filter(c => !exclude.some(excl => idEqual(excl._id, c._id)))||[]
})

UserSchema.virtual("_all_menus", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

// First available menu for this week
UserSchema.virtual("available_menu", {
  ref: "menu", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy", // is equal to foreignField
  options: {
    match: {$and:[{start_date: {$lt: moment()}}, {end_date:{$gt: moment()}}]},
  },
  justOne: true,
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
    ...(this.activity_targets||[]), ...(this.specificity_targets||[])]
  if (this.home_target) {
    all_targets.push(this.home_target)
  }
  const all_target_ids=all_targets.map(t => t._id)
  return this._all_targets?.filter(t => all_target_ids.some(i => idEqual(i, t._id))) || []
})

/* eslint-enable prefer-arrow-callback */


module.exports = UserSchema
