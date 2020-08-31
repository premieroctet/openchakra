const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moment=require('moment')
const {DAYS}=require('../../utils/dateutils')

const AvailabilitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
      monday: {
          event: [{
              begin: {
                  type: String
              },
              end: {
                  type: String
              },
              services: [{
                  label: {
                      type: String
                  },
                  value: {
                    type: Schema.Types.ObjectId,
                    ref: 'service'
                  }
              }],
              all_services: {
                  type: Boolean,
                  default: false
              }
          }]
      },
      tuesday: {
            event: [{
                begin: {
                    type: String
                },
                end: {
                    type: String
                },
                services: [{
                    label: {
                        type: String
                    },
                    value: {
                        type: Schema.Types.ObjectId,
                        ref: 'service'
                    }

                }],
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      wednesday: {
            event: [{
                begin: {
                    type: String
                },
                end: {
                    type: String
                },
                services: [{
                    label: {
                        type: String
                    },
                    value: {
                        type: Schema.Types.ObjectId,
                        ref: 'service'
                    }

                }],
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      thursday: {
            event: [{
                begin: {
                    type: String
                },
                end: {
                    type: String
                },
                services: [{
                    label: {
                        type: String
                    },
                    value: {
                        type: Schema.Types.ObjectId,
                        ref: 'service'
                    }

                }],
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      friday: {
            event: [{
                begin: {
                    type: String
                },
                end: {
                    type: String
                },
                services: [{
                    label: {
                        type: String
                    },
                    value: {
                        type: Schema.Types.ObjectId,
                        ref: 'service'
                    }

                }],
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      saturday: {
            event: [{
                begin: {
                    type: String
                },
                end: {
                    type: String
                },
                services: [{
                    label: {
                        type: String
                    },
                    value: {
                        type: Schema.Types.ObjectId,
                        ref: 'service'
                    }

                }],
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
      sunday: {
            event: [{
                begin: {
                    type: String
                },
                end: {
                    type: String
                },
                services: [{
                    label: {
                        type: String
                    },
                    value: {
                        type: Schema.Types.ObjectId,
                        ref: 'service'
                    }

                }],
                all_services: {
                    type: Boolean,
                    default: false
                }
            }]
      },
    period: {
        active: {
            type: Boolean,
            default: false
        },
        month_begin: {
            type: Date
        },
        month_end: {
            type: Date
        }
    }


}, { toJSON: { virtuals: true, getters: true } });


AvailabilitySchema.virtual('as_text').get( function() {
  if (this.period.active) {
    return `Période du ${moment(this.period.month_begin).format('DD/MM/YY')} au ${moment(this.period.month_end).format('DD/MM/YY')}`
  }
  else {
    DAYS.forEach( d => {
      if (this[d].event && this[d].event.length>0) {
        return this[d].event[0].begin
      }
    })
    return null
  }
})


module.exports = Availability = mongoose.model('availability',AvailabilitySchema);
