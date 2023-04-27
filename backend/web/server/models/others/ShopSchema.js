const { schemaOptions } = require("../../utils/schemas");
const { canAlfredParticularRegister } = require("../../../config/config");
const mongoose = require("mongoose");
const { CESU, INSURANCE_TYPES } = require("../../../utils/consts");
const { hideIllegal } = require("../../../utils/text");

const Schema = mongoose.Schema;

const ShopSchema = new Schema(
  {
    booking_request: {
      type: Boolean,
      default: false
    },
    no_booking_request: {
      type: Boolean,
      default: false
    },
    my_alfred_conditions: {
      type: Boolean,
      default: false
    },
    profile_picture: {
      type: Boolean,
      default: false
    },
    identity_card: {
      type: Boolean,
      default: false
    },
    recommandations: {
      type: Boolean,
      default: false
    },
    welcome_message: {
      type: String,
      set: text => hideIllegal(text)
    },
    flexible_cancel: {
      type: Boolean,
      default: false
    },
    moderate_cancel: {
      type: Boolean,
      default: false
    },
    strict_cancel: {
      type: Boolean,
      default: false
    },
    verified_phone: {
      type: Boolean,
      default: false
    },
    is_particular: {
      type: Boolean
    },
    is_professional: {
      type: Boolean
    },
    company: {
      type: {
        name: {
          type: String,
          required: true
        },
        siret: {
          type: String,
          required: true
        },
        vat_subject: {
          type: Boolean,
          required: true,
          default: false
        },
        vat_number: {
          type: String
        }
      },
      required: !canAlfredParticularRegister()
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "serviceUser"
      }
    ],
    alfred: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    picture: String,
    // particulier CESU : oblige, accepte, refuse
    cesu: {
      type: String,
      enum: [...CESU, null],
      default: "Disabled"
    },
    // Eligible au crédit impôt service
    cis: {
      type: Boolean,
      default: false
    },
    // Une seul assurance par type
    insurances: {
      type: [
        {
          kind: {
            type: String,
            enum: Object.keys(INSURANCE_TYPES),
            required: true
          },
          contract_number: String,
          company: String
        }
      ]
    },
    creation_date: {
      type: Date,
      default: Date.now
    }
  },
  schemaOptions
);

ShopSchema.virtual("insurance_text").get(function() {
  return (
    this.insurances &&
    this.insurances
      .map(ins => {
        return INSURANCE_TYPES[ins.kind];
      })
      .join(", ")
  );
});

module.exports = ShopSchema;
