const siret = require('siret')
const mongoose = require('mongoose')
const {schemaOptions} = require('../../../utils/schemas')
const lodash=require('lodash')
const {COMPANY_ACTIVITY, COMPANY_SIZE}=require('../consts')

const Schema = mongoose.Schema

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom de la société est requis'],
    },
    siret: {
      type: String,
      set: v => v ? v.replace(/ /g, '') : v,
      validate: [v => siret.isSIRET(v)||siret.isSIREN(v) , 'Le siret/siren est invalide'],
      required: false,
    },
    code: {
      type: String,
      required: false,
      index: true,
    },
    picture: {
      type: String,
    },
    activity: {
      type: String,
      enum: Object.keys(COMPANY_ACTIVITY),
      required: [true, `L'activité est obligatoire`],
    },
    size: {
      type: Number,
      required: [true, `La taille est obligatoire`],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "company",
    },
    // Check (or not) wether the account must satisfy lead's integrity
    // during registration
    registration_integrity: {
      type: Boolean,
      default: false,
      required: true,
    },
    // Type prestation bilan
    assessment_appointment_type: {
      type: Schema.Types.ObjectId,
      ref: 'appointmentType',
      required: false,
    },
    // Type prestation suivi
    followup_appointment_type: {
      type: Schema.Types.ObjectId,
      ref: 'appointmentType',
      required: false,
    },
    // Outbound call script
    script: {
      type: Text,
      required: false,
    }
  },
  schemaOptions,
)

CompanySchema.virtual('users', {
  ref: 'user', // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "company", // is equal to foreignField
});

CompanySchema.virtual("offers", {
  ref: "offer", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "company", // is equal to foreignField
});

CompanySchema.virtual("webinars", {
  ref: "webinar", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "companies", // is equal to foreignField
});

CompanySchema.virtual("administrators", {
  ref: "user", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "company", // is equal to foreignField
  justOne: true,
});

CompanySchema.virtual("groups", {
  ref: "group", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "companies", // is equal to foreignField
});

CompanySchema.virtual('groups_count', {localField: 'tagada', foreignField: 'tagada'}).get(function() {
  return this.groups?.length || 0
})

CompanySchema.virtual('likes_count').get(function() {
  return mongoose.model('content').find()
    .populate('likes')
    .then(contents => {
      var count=0
      contents.forEach(content => {
        count+=lodash.filter(content.likes||[], l => l.company._id==this._id)?.length || 0
      });
      return count
    })
})

CompanySchema.virtual('shares_count').get(function() {
  return mongoose.model('content').find()
    .populate('shares')
    .then(contents => {
      var count=0
      contents.forEach(content => {
        count+=lodash.filter(content.shares||[], s => s.company._id==this._id)?.length||0
      });
      return count
    })
})

CompanySchema.virtual('comments_count').get(function() {
  return mongoose.model('comment').find({pip: null})
    .populate('user')
    .then(comments => {
      const count=lodash.filter(comments||[], c => c.user?.company._id==this._id)?.length||0
      return count
    })
})

CompanySchema.virtual('contents_count').get(function() {
  // TODO WTF
  return 0
})

CompanySchema.virtual("children", {
  ref: "company", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "parent", // is equal to foreignField
});

CompanySchema.virtual("collective_challenges", {
  ref: "collectiveChallenge", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "company", // is equal to foreignField
});

module.exports = CompanySchema
