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
  }, schemaOptions
);

AdminDashboardSchema.virtual('contact_sent', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('refused_bills', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('accepted_bills', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('visible_ti', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('hidden_ti', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('qualified_ti', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('visible_tipi', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('hidden_tipi', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('qualified_tipi', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('missions_requests', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('refused_missions', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('sent_quotations', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('quotation_ca_total', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('commission_ca_total', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('tipi_commission_ca_total', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('tini_commission_ca_total', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('customer_commission_ca_total', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('ti_registered_today', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('customers_registered_today', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })

module.exports = AdminDashboardSchema
