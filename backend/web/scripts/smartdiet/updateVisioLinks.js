const {
  getAppointmentVisioLink
} = require('../../server/plugins/agenda/smartagenda')

const mongoose = require('mongoose')
const { getDataModel } = require('../../config/config')
const Appointment = require('../../server/models/Appointment')
const { getDatabaseUri } = require('../../config/config')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')

const updateAppointments = () => {
  return Appointment.find({smartagenda_id: {$ne: null}, visio_url: null})
    .then(appts => Promise.all(appts.map(appt => {
      console.log(appt)
      return getAppointmentVisioLink(appt.smartagenda_id)
        .then(url => {
          appt.visio_url=url
          return appt.save()
        })
    })))
}

if (getDataModel()!='smartdiet') {
  console.error(`Run as smartdiet datamodel`)
}

return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  .then(() => updateAppointments())
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit())
