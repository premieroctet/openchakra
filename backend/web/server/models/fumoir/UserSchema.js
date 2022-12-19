const mongoose = require("mongoose");
const { schemaOptions } = require("../../utils/schemas");
const { ROLES } = require("../../../utils/fumoir/consts");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    role: {
      type: String,
      enum: Object.keys(ROLES)
    },
    picture: {
      type: String
    },
    banner: {
      type: String
    },
    email: {
      type: String,
      required: true,
      set: v => v.toLowerCase().trim()
    },
    linkedIn: {
      type: String,
      set: v => v.toLowerCase().trim()
    },
    twitter: {
      type: String,
      set: v => v.toLowerCase().trim()
    },
    phone: {
      type: String
    },
    job: {
      type: String
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "company"
    },
    description: {
      type: String
    },
    cgv_validation_date: {
      type: Date
    },
    password: {
      type: String,
      default: "INVALID",
      required: true
    },
    creation_date: {
      type: Date,
      default: Date.now
    },
    last_login: [
      {
        type: Date
      }
    ],
    subscription_start: {
      type: Date,
    },
    subscription_end: {
      type: Date,
    },
    resetToken: {
      type: Schema.Types.ObjectId,
      ref: "resetToken"
    }
  },
  schemaOptions
);

UserSchema.virtual("full_name").get(function() {
  return `${this.firstname} ${this.lastname}`;
});

UserSchema.virtual("is_active").get(function() {
  return this.subscription_start && this.subscription_end
  && moment().isBetween(this.subscription_start, this.subscription_end)
});

module.exports = UserSchema;
