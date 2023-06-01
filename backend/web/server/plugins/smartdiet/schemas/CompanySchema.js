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
    },
    code: {
      type: String,
      required: false,
    },
    picture: {
      type: String,
    },
    activity: {
      type: String,
      enum: Object.keys(COMPANY_ACTIVITY),
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    offer: {
      type: Schema.Types.ObjectId,
      ref: 'offer',
      required: true,
    },
    collective_challenges: [{
      type: Schema.Types.ObjectId,
      ref: "collectiveChallenge",
    }],
  },
  schemaOptions,
)

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

CompanySchema.virtual('groups_count').get(function() {
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
      const count=lodash.filter(comments||[], c => c.user.company._id==this._id)?.length||0
      return count
    })
})

CompanySchema.virtual('contents_count').get(function() {
  // TODO WTF
  return 0
})

module.exports = CompanySchema
