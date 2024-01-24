const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const AdminDashboardSchema = new Schema({
  }, schemaOptions
);

AdminDashboardSchema.virtual('company', {localFields:'tagada',foreignField:'tagada'}).get(function() { return null })
AdminDashboardSchema.virtual('webinars_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('average_webinar_registar', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('webinars_replayed_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('groups_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('messages_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('users_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('leads_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('users_men_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('user_women_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('users_no_gender_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual(`started_coachings`, {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual(`specificities_users`, {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual(`reasons_users`, {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })


module.exports = AdminDashboardSchema
