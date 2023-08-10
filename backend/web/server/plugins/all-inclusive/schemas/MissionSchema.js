const {
  BOOLEAN,
  BOOLEAN_YES,
  CUSTOMER_TIPS,
  MISSION_FREQUENCY,
  MISSION_FREQUENCY_UNKNOWN,
  MISSION_STATUS_ASKING,
  MISSION_STATUS_ASKING_ALLE,
  MISSION_STATUS_BILL_SENT,
  MISSION_STATUS_CUST_CANCELLED,
  MISSION_STATUS_DISPUTE,
  MISSION_STATUS_FINISHED,
  MISSION_STATUS_PAYMENT_PENDING,
  MISSION_STATUS_QUOT_ACCEPTED,
  MISSION_STATUS_QUOT_REFUSED,
  MISSION_STATUS_QUOT_SENT,
  MISSION_STATUS_TI_REFUSED,
  MISSION_STATUS_TO_BILL,
  PAYMENT_STATUS,
  ROLE_COMPANY_BUYER,
  ROLE_TI,
  TI_TIPS
} = require('../consts')
const { capitalize } = require('../../../../utils/text')
const mongoose = require("mongoose")
const lodash=require('lodash')
const { schemaOptions } = require('../../../utils/schemas')

const Schema = mongoose.Schema;

const MissionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est obligatoire']
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire']
  },
  start_date: {
    type: Date,
    required: false,
  },
  // TODO: convert to hours/days...
  duration: {
    type: String,
    required:false,
  },
  // Mission address
  address: {
    type: String,
    required: [function() { return this.customer_location}, "L'adresse de mission est obligatoire"],
  },
  required_services: {
    type: String,
    required: false,
  },
  document: {
    type: String,
    required: false,
  },
  customer_location: {
    type: Boolean,
    default: false,
    required: true,
  },
  foreign_location: {
    type: Boolean,
    default: false,
    required: true,
  },
  recurrent: {
    type: String,
    enum: Object.keys(BOOLEAN),
    required: [true, 'La récurrence (oui/non) est obligatoire']
  },
  frequency: {
    type: String,
    set: v => v || undefined, // To allow `null` value as empty
    enum: Object.keys(MISSION_FREQUENCY),
    required: [function() { return this.recurrent==BOOLEAN_YES}, 'La fréquence de mission est obligatoire']
  },
  // Customer
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobUser",
    required: false,
  },
  // Date when quotation is sent to customer
  quotation_sent_date: {
    type: Date,
  },
  ti_refuse_date: {
    type: Date,
  },
  customer_cancel_date: {
    type: Date,
  },
  customer_accept_quotation_date: {
    type: Date,
  },
  customer_refuse_quotation_date: {
    type: Date,
  },
  ti_finished_date: {
    type: Date,
  },
  bill_sent_date: {
    type: Date,
  },
  customer_accept_bill_date: {
    type: Date,
  },
  customer_refuse_bill_date: {
    type: Date,
  },
  bill: {
    type: String,
  },
  // Payment process
  payin_id: {
    type: String,
  },
  // Null: pending, true: ok
  payin_achieved: {
    type: Boolean,
    required: false,
  },
  transfer_id: {
    type: String,
  },
  transfer_status: {
    type: String,
  },
  payout_id: {
    type: String,
  },
  payout_status: {
    type: String,
  },
  dummy: {
    type: Number,
    default: 0,
    required: true,
  },
}, schemaOptions
);

MissionSchema.virtual('status').get(function() {
  if (this.customer_accept_bill_date) {
    return MISSION_STATUS_FINISHED
  }
  if (this.customer_refuse_bill_date) {
    return MISSION_STATUS_DISPUTE
  }
  if (this.bill_sent_date) {
    return MISSION_STATUS_BILL_SENT
  }
  if (this.ti_finished_date) {
    return MISSION_STATUS_TO_BILL
  }
  if (this.customer_refuse_quotation_date) {
    return MISSION_STATUS_QUOT_REFUSED
  }
  if (this.payin_id && this.payin_achieved==true) {
    return MISSION_STATUS_QUOT_ACCEPTED
  }
  if (this.payin_id && this.payin_achieved==null) {
    return MISSION_STATUS_PAYMENT_PENDING
  }
  if (this.customer_cancel_date) {
    return MISSION_STATUS_CUST_CANCELLED
  }
  if (this.ti_refuse_date) {
    return MISSION_STATUS_TI_REFUSED
  }
  if (this.quotation_sent_date) {
    return MISSION_STATUS_QUOT_SENT
  }
  if (!!this.job) {
    return MISSION_STATUS_ASKING
  }
  return MISSION_STATUS_ASKING_ALLE
})

/* eslint-disable prefer-arrow-callback */
MissionSchema.virtual("ti_tip").get(function() {
  return TI_TIPS[this.status] || ''
})

MissionSchema.virtual("customer_tip").get(function() {
  return CUSTOMER_TIPS[this.status] || ''
})

MissionSchema.virtual("quotations", {
  ref: "quotation", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: "mission" // is equal to foreignField
});

MissionSchema.virtual("comments", {
  ref: "comment", // The Model to use
  localField: "_id", // Find in Model, where localField
  foreignField: 'mission' // is equal to foreignField
});


MissionSchema.virtual("location_str").get(function() {
  const locations=[]
  if (this.customer_location) { locations.push("chez le client")}
  if (this.foreign_location) { locations.push("à distance")}
  return capitalize(locations.join(" et "))
})

MissionSchema.methods.canRefuseMission = function(user) {
  return user.role==ROLE_TI && this.status==MISSION_STATUS_ASKING
}

MissionSchema.methods.canCancelMission = function(user) {
  return user.role==ROLE_COMPANY_BUYER && this.status==MISSION_STATUS_ASKING
  return true
}

MissionSchema.methods.canCreateQuotation = function(user) {
  return false
  return this.status==MISSION_STATUS_ASKING
}

// TODO: fsm
MissionSchema.methods.canAcceptQuotation = function(user) {
  console.log(`Role:${user.role} ${ROLE_COMPANY_BUYER},status:${this.status} ${MISSION_STATUS_QUOT_SENT}`)
  return user.role==ROLE_COMPANY_BUYER && this.status==MISSION_STATUS_QUOT_SENT
}

// TODO: fsm
MissionSchema.methods.canRefuseQuotation = function(user) {
  return user.role==ROLE_COMPANY_BUYER && this.status==MISSION_STATUS_QUOT_SENT
}

MissionSchema.methods.canShowQuotation = function(user) {
  return !lodash.isEmpty(this.quotations)
}

MissionSchema.methods.canEditQuotation = function(user) {
  return user.role==ROLE_TI
  && [MISSION_STATUS_ASKING, MISSION_STATUS_QUOT_SENT].includes(this.status)
  && this.quotations?.length>0
}

MissionSchema.methods.canFinishMission = function(user) {
  const res=user.role==ROLE_TI && MISSION_STATUS_QUOT_ACCEPTED==this.status
  return res
}

MissionSchema.methods.canStoreBill = function(user) {
  return user.role==ROLE_TI &&
    [MISSION_STATUS_TO_BILL, MISSION_STATUS_DISPUTE].includes(this.status)
}

MissionSchema.methods.canSendBill = function(user) {
  return user.role==ROLE_TI
    && this.bill
    && [MISSION_STATUS_TO_BILL, MISSION_STATUS_DISPUTE].includes(this.status)
}

MissionSchema.methods.canShowBill = function(user) {
  return !!this.bill
}

MissionSchema.methods.canAcceptBill = function(user) {
  return user.role==ROLE_COMPANY_BUYER && !!this.bill
  && this.status==MISSION_STATUS_BILL_SENT
}

MissionSchema.methods.canRefuseBill = function(user) {
  return user.role==ROLE_COMPANY_BUYER && !!this.bill
  && this.status==MISSION_STATUS_BILL_SENT
}

MissionSchema.methods.canLeaveComment = function(user) {
  return user.role==ROLE_COMPANY_BUYER && !!this.bill
  && this.status==MISSION_STATUS_FINISHED
}

// Got from quotation
// TODO: must use this.mer instead of direct computation
MissionSchema.virtual('customer_total').get(function() {
  return this.quotations?.[0]?.customer_total
})

// TODO: Compute properly fro non qualified TI
MissionSchema.virtual('mer').get(function() {
  return this.quotations?.[0]?.mer
})

MissionSchema.virtual('gross_total').get(function() {
  return this.quotations?.[0]?.gross_total
})

MissionSchema.virtual('aa').get(function() {
  return this.quotations?.[0]?.aa
})

MissionSchema.virtual('ti_total').get(function() {
  return this.quotations?.[0]?.ti_total
})

MissionSchema.virtual('vat_total').get(function() {
  return this.quotations?.[0]?.vat_total
})

/* eslint-enable prefer-arrow-callback */


module.exports = MissionSchema;
