const { MIN_AGE } = require('../consts')

const moment = require('moment')
const {
  AVAILABILITY,
  COACHING,
  COACH_OTHER,
  COMPANY_ACTIVITY,
  COMPANY_SIZE,
  COMPANY_STATUS,
  DEFAULT_ROLE,
  DEPARTEMENTS,
  MISSION_STATUS_BILL_SENT,
  MISSION_STATUS_FINISHED,
  MISSION_STATUS_PAYMENT_PENDING,
  MISSION_STATUS_QUOT_ACCEPTED,
  ROLES,
  ROLE_COMPANY_ADMIN,
  ROLE_COMPANY_BUYER,
  ROLE_TI,
  UNACTIVE_REASON,
} = require('../consts')
const { isEmailOk, isPhoneOk } = require('../../../../utils/sms')

const Validator = require('validator')
const { idEqual } = require('../../../utils/database')
const siret = require('siret')
const NATIONALITIES=require('../nationalities')
const mongoose = require("mongoose")
const bcrypt=require('bcryptjs')
const { schemaOptions } = require('../../../utils/schemas')
const lodash=require('lodash')
const IBANValidator = require('iban-validator-js')

const isBirthdayOk = birthday => {
  if (!birthday) return false
  const years=moment().diff(moment(birthday), 'years')
  return years>=MIN_AGE
}

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Le prénom est obligatoire'],
  },
  lastname: {
    type: String,
    required: [true, 'Le nom de famille est obligatoire'],
  },
  email: {
    type: String,
    required: true,
    set: v => v?.toLowerCase().trim(),
    validate: [value => isEmailOk(value), "L'email est invalide"],
    required: [true, "L'email est obligatoire"],
  },
  admin_comment: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est obligatoire'],
    set: pass => bcrypt.hashSync(pass, 10),
  },
  cguAccepted: {
    type: Boolean,
    validate: [value => !!value, 'Vous devez accepter les CGU'],
    required: [function() { return [ROLE_COMPANY_BUYER, ROLE_COMPANY_ADMIN, ROLE_TI].includes(this.role)}, 'Vous devez accepter les CGU'],
  },
  role: {
    type: String,
    enum: Object.keys(ROLES),
    required: [true, 'Le rôle est obligatoire'],
  },
  phone: {
    type: String,
    validate: [value => isPhoneOk(value), 'Le numéro de téléphone doit commencer par 0 ou +33'],
    set: v => v?.replace(/^0/, '+33'),
    required: [function() { return [ROLE_TI, ROLE_COMPANY_BUYER].includes(this.role)}, 'Le téléphone est obligatoire'],
  },
  birthday: {
    type: Date,
    validate: [value => isBirthdayOk(value), `Vous devez avoir au moins ${MIN_AGE} ans pour vous inscrire`],
    required: [function() { return this.role==ROLE_TI}, 'La date de naissance est obligatoire'],
  },
  picture: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  coaching: {
    type: String,
    enum: Object.keys(COACHING),
    required: [function() { return this.role==ROLE_TI}, "Le mode d'accompagnement est obligatoire"],
  },
  coaching_company: {
    type: String,
    required: [function() { return this.role==ROLE_TI && this.coaching==COACH_OTHER}, 'La structure accompagnante est obligatoire'],
  },
  coaching_end_date: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  unactive_reason: {
    type: String,
    enum: Object.keys(UNACTIVE_REASON),
    required: [function() { return !this.active}, 'Le raison de la désactivation est obligatoire'],
  },
  hidden: {
    type: Boolean,
    default: function() { return this.role==ROLE_TI},
    required: true,
  },
  // Agreed by AllE
  qualified: {
    type: Boolean,
    default: false,
    required: true,
  },
  nationality: {
    type: String,
    set: v => v || undefined, // To allow `null` value as empty
    enum: Object.keys(NATIONALITIES),
    required: false,
  },
  identity_proof_1: {
    type: String,
  },
  identity_proof_2: {
    type: String,
  },
  iban: {
    type: String,
    validate: [v => IBANValidator.isValid(v), "L'IBAN est invalide"],
  },
  availability: {
    type: String,
    enum: Object.keys(AVAILABILITY),
    required: false,
  },
  address: {
    type: String,
    required: [function() { return [ROLE_TI].includes(this.role)}, "L'adresse est obligatoire"],
  },
  zip_code: {
    type: String,
    enum: Object.keys(DEPARTEMENTS),
    required: [function() { return [ROLE_COMPANY_BUYER,ROLE_TI].includes(this.role)}, 'Le département est obligatoire'],
  },
  city: {
    type: String,
    required: [function() { return [ROLE_TI].includes(this.role)}, 'La ville est obligatoire'],
  },
  billing_address: {
    type: String,
  },
  company_name: {
    type: String,
    required: [function() { return this.role==ROLE_COMPANY_BUYER}, "Le nom de l'entreprise' est obligatoire"],
  },
  company_status: {
    type: String,
    enum: Object.keys(COMPANY_STATUS),
    required: false,
  },
  siret: {
    type: String,
    set: v => v?.replace(/ /g, ''),
    validate: [v => siret.isSIRET(v)||siret.isSIREN(v), 'Le SIRET ou SIREN est invalide'],
    required: false,
  },
  // In french: "Avis de situation"
  status_report: {
    type: String,
  },
  vat_subject: {
    type: Boolean,
  },
  // Insurance 1 type : décennale, tiers
  insurance_type: {
    type: String,
  },
  // Insurance 1 document
  insurance_report: {
    type: String,
  },
  // Insurance 2 type : décennale, tiers
  insurance2_type: {
    type: String,
  },
  // Insurance 2 document
  insurance2_report: {
    type: String,
  },
  company_activity: {
    type: String,
    enum: Object.keys(COMPANY_ACTIVITY),
    required: false,
  },
  company_size: {
    type: String,
    enum: Object.keys(COMPANY_SIZE),
    required: false,
  },
  company_function: {
    type: String,
    required: false,
  },
  company_picture: {
    type: String,
  },
  representative_firstname: {
    type: String,
  },
  representative_lastname: {
    type: String,
  },
  // Origin ip when account registered
  register_ip: {
    type: String,
    required: false,
  },
  payment_account_id: {
    type: String,
  },
  admin_validated: {
    type: Boolean,
  },
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
}, schemaOptions
);

UserSchema.virtual("full_name").get(function() {
  return `${this.firstname} ${this.lastname}`;
});

// For password checking only
UserSchema.virtual("password2")

const PROFILE_ATTRIBUTES={
  firstname: 'prénom',
  lastname : 'nom de famille',
  email : 'email',
  phone : 'téléphone',
  birthday : 'date de naissance',
  nationality : 'nationalité',
  picture : 'photo de profil',
  identity_proof_1 : "pièce d'identité",
  iban : 'iban',
  company_name : 'nom de la société',
  company_status : 'statut',
  siret : 'siret',
  status_report : 'avis de situation',
  insurance_type : "type d'assurance",
  insurance_report : "justificatif d'assurance",
  company_picture : "logo de l'entreprise",
}

UserSchema.virtual('profile_progress').get(function() {
  let filled=Object.keys(PROFILE_ATTRIBUTES).map(att => !!lodash.get(this, att))
  if (this.role==ROLE_TI) {
    filled.push(this.jobs?.length>0)
  }
  return (filled.filter(v => !!v).length*1.0/filled.length)*100
});

UserSchema.virtual('missing_attributes').get(function() {
  let missing=lodash(PROFILE_ATTRIBUTES)
    .pickBy((name, att) => !lodash.get(this, att) && name)
    .values()
    .value()
  if (this.role==ROLE_TI && !(this.jobs?.length>0)) {
    missing.push('métier') 
  }
  return missing ? `Informations manquantes : ${missing.join(', ')}` : ''
});

UserSchema.virtual("jobs", {
  ref: "jobUser", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

// All missions
UserSchema.virtual("_missions", {
  ref: "mission", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

UserSchema.virtual("missions", {localField: 'dummy', foreignField: 'dummy'}).get(function() {
  if (this.role==ROLE_COMPANY_BUYER) {
    return this._missions?.filter(m => idEqual(m.user?._id, this._id))
  }
  if (this.role==ROLE_TI) {
    return this._missions?.filter(m => idEqual(m.job?.user?._id, this._id)) || []
  }
  return []
})

UserSchema.virtual("missions_with_bill", {localField: 'dummy', foreignField: 'dummy'}).get(function() {
  if (this.role==ROLE_COMPANY_BUYER) {
    return this._missions?.filter(m => m.bill && idEqual(m.user?._id, this._id))
  }
  if (this.role==ROLE_TI) {
    return this._missions?.filter(m => m.bill && idEqual(m.job?.user?._id, this._id)) || []
  }
  return []
})


UserSchema.virtual("requests", {
  ref: "request", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "user" // is equal to foreignField
});

UserSchema.virtual("qualified_str").get(function() {
  return this.qualified ? 'qualifié' : 'à qualifier'
});

UserSchema.virtual("visible_str").get(function() {
  return this.hidden ? 'masqué' : 'visible'
});

UserSchema.virtual("finished_missions_count").get(function() {
  if (lodash.isEmpty(this.missions)) {
    return 0
  }
  return this.missions.filter(m => m.status==MISSION_STATUS_FINISHED).length
})

// All recommandations
UserSchema.virtual("_all_recommandations", {
  ref: "recommandation", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

UserSchema.virtual("recommandations", {localField: 'tagada', foreignField: 'tagada'}).get(function() {
  const recos=this._all_recommandations?.filter(a => idEqual(a?.job?.user?._id, this._id)) || []
  return recos
})

UserSchema.virtual("recommandations_count", {localField: 'tagada', foreignField: 'tagada'}).get(function() {
  return this.recommandations?.length || 0
})

UserSchema.virtual("recommandations_note").get(function() {
  const recos=this.recommandations || []
  return lodash.sumBy(recos, 'note')/recos.length
})

UserSchema.virtual("comments_count").get(function() {
  const recos=lodash(this.missions||[]).map(j => j.comments || []).flatten()
  return recos.size()
})

UserSchema.virtual("comments_note").get(function() {
  const recos=lodash(this.missions||[]).map(j => j.comments || []).flatten()
  return recos.sumBy('note')/recos.size()
})

// Achieved revenue : accepeted bills
UserSchema.virtual("revenue").get(function() {
  if (this.role!=ROLE_TI) {
    return 0
  }
  return lodash(this.missions)
      .filter(m => [MISSION_STATUS_FINISHED].includes(m.status))
      .sumBy(m => m.quotations[0].ti_total)
})

// Achieved revenue : accepted quotation
UserSchema.virtual("revenue_to_come").get(function() {
  if (this.role!=ROLE_TI) {
    return 0
  }
  return lodash(this.missions)
      .filter(m => m.status==MISSION_STATUS_QUOT_ACCEPTED)
      .sumBy(m => m.quotations[0].ti_total)
})

UserSchema.virtual("accepted_quotations_count").get(function() {
  return this.missions?.filter(m => m.status==MISSION_STATUS_QUOT_ACCEPTED ).length
})

UserSchema.virtual("profile_shares_count").get(function() {
  return 0
})

// Customer spent
UserSchema.virtual("spent").get(function() {
  if (this.role!=ROLE_COMPANY_BUYER) {
    return 0
  }
  return lodash(this.missions)
      .filter(m => m.status==MISSION_STATUS_FINISHED)
      // TODO: finished mission should have a quotations
      .sumBy(m => m.quotations[0]?.customer_total || 0)
})

UserSchema.virtual("spent_to_come").get(function() {
  if (this.role!=ROLE_COMPANY_BUYER) {
    return 0
  }
  return lodash(this.missions)
    .filter(m => [MISSION_STATUS_QUOT_ACCEPTED].includes(m.status))
    // TODO: finished mission should have a quotations
    .sumBy(m => m.quotations[0]?.customer_total || 0)
})

UserSchema.virtual("pending_bills").get(function() {
  return lodash(this.missions)
    .filter(m => [MISSION_STATUS_BILL_SENT].includes(m.status))
    // TODO: finished mission should have a quotations
    .sumBy(m => m.quotations[0]?.customer_total || 0)
})

UserSchema.virtual("profile_shares_count").get(function() {
  return 0
})

// All jobs
UserSchema.virtual("_all_jobs", {
  ref: "jobUser", // The Model to use
  localField: "dummy", // Find in Model, where localField
  foreignField: "dummy" // is equal to foreignField
});

UserSchema.virtual('pinned_jobs', {localField: 'tagada', foreignField: 'tagada'}).get(function () {
  return this?._all_jobs?.filter(j => j.pins?.some(p => idEqual(p._id, this._id)))
})

UserSchema.virtual("search_text").get(function() {
  const attributes='firstname,lastname,qualified_str,visible_str,company_name'.split(',')
  let values=attributes.map(att => this[att])
  values.push(COACHING[this.coaching])
  values.push(DEPARTEMENTS[this.zip_code])
  values.push(this.admin_validated && 'administratif')
  values=values.filter(v=>!!v)
  return values.join(' ')
});

module.exports = UserSchema;
