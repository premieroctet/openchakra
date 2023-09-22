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
// AdminDashboardSchema.virtual('group_active_members_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
// AdminDashboardSchema.virtual('average_group_answers', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('messages_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('users_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
//AdminDashboardSchema.virtual('active_users_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('leads_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('users_men_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('user_women_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('users_no_gender_count', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('weight_lost_total', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('weight_lost_average', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('centimeters_lost_total', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('centimeters_lost_average', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual('age_average', {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })
AdminDashboardSchema.virtual(`measures_evolution`, {localFields:'tagada',foreignField:'tagada'}).get(function() { return 0 })


module.exports = AdminDashboardSchema
