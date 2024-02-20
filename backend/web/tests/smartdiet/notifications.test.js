const lodash=require('lodash')
const moment=require('moment')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet}=require('../utils')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { USER_DATA, COMPANY_NO_INSURANCE_DATA, WEBINAR_DATA } = require('./data/modelsBaseData')
const User = require('../../server/models/User')
const Company = require('../../server/models/Company')
const { webinarNotifications } = require('../../server/plugins/smartdiet/functions')
const Webinar = require('../../server/models/Webinar')

forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')


describe('Notifications ', () => {

  var user;
  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const company=await Company.create({...COMPANY_NO_INSURANCE_DATA, })
    user=await User.create({...USER_DATA, password:'hop', email: 'sebastien.auvray@wappizy.com', company})
  })

  afterAll(async() => {
    await mongoose.connection.close()
  })

  it(`must send notifications`, async() => {
    let res;
    res=await webinarNotifications()
    expect(res).toEqual(0)
    const start_date=moment().add(15, 'day'), end_date=moment(start_date).add(1, 'hour')
    const webinar15=await Webinar.create({...WEBINAR_DATA, start_date, end_date, user})
    await User.updateOne({}, {$push: {'registered_events': {event: webinar15}}})
    res=await webinarNotifications()
    expect(res).toEqual(1)
    const webinarToday=await Webinar.create({...WEBINAR_DATA, start_date:moment(), end_date:moment().add(1.5, 'hour'), user})
    await User.updateOne({}, {$push: {'registered_events': {event: webinarToday}}})
    res=await webinarNotifications()
    expect(res).toEqual(2)
  })
})

