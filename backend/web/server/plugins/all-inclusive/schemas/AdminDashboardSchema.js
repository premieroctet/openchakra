const {
  MISSION_STATUS_ASKING,
  MISSION_STATUS_ASKING_ALLE,
  ROLE_COMPANY_BUYER,
  ROLE_TI
} = require('../consts')

const { CREATED_AT_ATTRIBUTE } = require('../../../../utils/consts')
const moment = require('moment')
const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const AdminDashboardSchema = new Schema({
  dummy: {
    type: Number,
    default: 0,
    required: true,
  }
  }, schemaOptions
);

// All users
AdminDashboardSchema.virtual('_all_users', {
  ref: "user", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
})

// All users
AdminDashboardSchema.virtual('_all_missions', {
  ref: "mission", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
})

AdminDashboardSchema.virtual('ti_registered_today').get(function() {
  console.time('*************** TI registered')
  const today=moment().format('LL')
  const res=this._all_users?.filter(u => u.role==ROLE_TI && u[CREATED_AT_ATTRIBUTE] && moment(u[CREATED_AT_ATTRIBUTE]).format('LL')==moment().format('LL')).length || 0
  console.timeEnd('*************** TI registered')
  return res
})

AdminDashboardSchema.virtual('customers_registered_today').get(function() {
  console.time('*************** Customers registered')
  const today=moment().format('LL')
  const res=this._all_users?.filter(u => u.role==ROLE_COMPANY_BUYER && u[CREATED_AT_ATTRIBUTE] && moment(u[CREATED_AT_ATTRIBUTE]).format('LL')==moment().format('LL')).length || 0
  console.timeEnd('*************** Customers registered')
  return res
})

// All missions
AdminDashboardSchema.virtual('pending_missions').get(function() {
  console.time('*************** Pending missions')
  const status=[MISSION_STATUS_ASKING, MISSION_STATUS_ASKING_ALLE]
  const res=this._all_missions?.filter(m => status.includes(m.status)).length || 0
  console.timeEnd('*************** Pending missions')
  return res
})

module.exports = AdminDashboardSchema
