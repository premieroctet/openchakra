const moment=require('moment')
const {forceDataModelSmartdiet}=require('../utils')
forceDataModelSmartdiet()
const { sendAppointmentRemindTomorrow } = require('../../server/plugins/smartdiet/mailing')

describe('Mailjet', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('Must send an SMS with correct sender', async() => {
    const appt={
      user: {
        phone: '+33675774324',
        email: 'sebastien.auvray@wappizy.com',
      },
      start_date: moment().add(1, 'day'),
      diet: {
        firstname: 'Maria',
      }
    }
    await sendAppointmentRemindTomorrow({appointment: appt})
  })
})
