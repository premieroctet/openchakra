const mongoose = require("mongoose")
const { schemaOptions } = require('../../../utils/schemas');
const { DUMMY_REF } = require("../../../utils/database");

const Schema = mongoose.Schema;

const AdminDashboardSchema = new Schema({
  }, schemaOptions
);

AdminDashboardSchema.virtual('company', DUMMY_REF).get(function() { return null })
AdminDashboardSchema.virtual('webinars_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('average_webinar_registar', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('webinars_replayed_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('groups_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('messages_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('users_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('leads_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('users_men_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('user_women_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual('users_no_gender_count', DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual(`started_coachings`, DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual(`specificities_users`, DUMMY_REF).get(function() { return 0 })
AdminDashboardSchema.virtual(`reasons_users`, DUMMY_REF).get(function() { return 0 })


module.exports = AdminDashboardSchema
