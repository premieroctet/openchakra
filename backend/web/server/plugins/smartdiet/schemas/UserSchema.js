const {
  idEqual,
  setIntersects,
  shareTargets
} = require('../../../utils/database')
const {
  ACTIVITY,
  EVENT_IND_CHALLENGE,
  GENDER,
  NO_CREDIT_AVAILABLE,
  ROLES,
  ROLE_CUSTOMER,
  ROLE_RH,
  STATUS_FAMILY
} = require('../consts')
const mongoose = require('mongoose')
const moment=require('moment')
const { ForbiddenError } = require('../../../utils/errors')
const {schemaOptions} = require('../../../utils/schemas')
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
    required: false,
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
    set: v ? v.replace(/ /g,'') : v,
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
    required: true,
  }],
  health_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: true,
  }],
  activity_targets: [{
    type: Schema.Types.ObjectId,
    ref: 'target',
    required: true,
  }],
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
    type: Schema.Types.ObjectId,
    ref: 'event',
    required: true,
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
  const exclude=[
    ...(this.passed_events?.map(s => s._id)||[]),
    ...(this.failed_events?.map(s => s._id)||[]),
  ]
  return (this._all_individual_challenges||[])
    .filter(i => this.registered_events.some(r => idEqual(r._id, i._id)))
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
    ...(this.activity_targets||[]), ...(this.specificity_targets||[])]
  if (this.home_target) {
    all_targets.push(this.home_target)
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
  if (this.registered_events.some(e => idEqual(e._id, event_id))) {
    return Promise.resolve(true)
  }
  return Promise.all([
    mongoose.models.company.findById(this.company).populate('offers'),
    mongoose.models.event.findById(event_id),
    mongoose.models.event.find({"_id": {$in: this.registered_events}}),
  ])
    .then(([{offers}, event, registered_events]) => {
      const sameTypeEventsCount=registered_events.filter(e => e.type==event.type).length
      const limit=offers[0]?.getEventLimit(event.type)
      if (sameTypeEventsCount>=limit) {
        throw new ForbiddenError(NO_CREDIT_AVAILABLE)
      }
      return true
    })
}
/* eslint-enable prefer-arrow-callback */


module.exports = UserSchema
