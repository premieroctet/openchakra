const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvailabilitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date:[ {
      monday: {
          event: [{
              begin: {
                  type: Date
              },
              end: {
                  type: Date
              },
              service: {
                  type: Schema.Types.ObjectId,
                  ref: 'serviceUser'
              },
              all_services: {
                  type: Boolean,
                  default: false
              }
          }]
      },
      tuesday: {
            event: [{
                begin: {
                    type: Date
                },
                end: {
                    type: Date
                },
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'serviceUser'
                },
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      wednesday: {
            event: [{
                begin: {
                    type: Date
                },
                end: {
                    type: Date
                },
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'serviceUser'
                },
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      thursday: {
            event: [{
                begin: {
                    type: Date
                },
                end: {
                    type: Date
                },
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'serviceUser'
                },
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      friday: {
            event: [{
                begin: {
                    type: Date
                },
                end: {
                    type: Date
                },
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'serviceUser'
                },
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      saturday: {
            event: [{
                begin: {
                    type: Date
                },
                end: {
                    type: Date
                },
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'serviceUser'
                },
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      sunday: {
            event: [{
                begin: {
                    type: Date
                },
                end: {
                    type: Date
                },
                service: {
                    type: Schema.Types.ObjectId,
                    ref: 'serviceUser'
                },
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      }
    }],
    period: {
        active: {
            type: Boolean,
            default: false
        },
        month_begin: {
            type: String
        },
        month_end: {
            type: String
        }
    }


});

module.exports = Availability = mongoose.model('availability',AvailabilitySchema);
