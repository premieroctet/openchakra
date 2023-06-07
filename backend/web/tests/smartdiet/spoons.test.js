const mongoose = require('mongoose')
const moment = require('moment')
const {COMPANY_ACTIVITY, HARDNESS} = require('../../server/plugins/smartdiet/consts')
const {forceDataModelSmartdiet}=require('../utils')

forceDataModelSmartdiet()
require('../../server/plugins/smartdiet/functions')

const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')

const Key = require('../../server/models/Key')
const User = require('../../server/models/User')
const Company = require('../../server/models/Company')
const IndividualChallenge=require('../../server/models/IndividualChallenge')
const SpoonGain=require('../../server/models/SpoonGain')
require('../../server/models/Comment')
require('../../server/models/Target')
require('../../server/models/Category')
require('../../server/models/Pip')

const COMPANY_DATA={
  name: 'S', size: 10, activity: Object.keys(COMPANY_ACTIVITY)[0],
}

const USER_DATA={firstname: 'S', lastname: 'S', dataTreatmentAccepted: true,
  cguAccepted: true, pseudo: 'S', phone: '0', email: 's',
}

const KEY_DATA={
  trophy_off_picture: 'off', trophy_on_picture: 'on', spoons_count_for_trophy: '5',
  picture: 'p', name: 'clé',
}

const CHALL_DATA={start_date: moment(), end_date: moment(), description: 'S',
  name: 'Challenge', trophy_on_picture: 'on', trophy_off_picture: 'off',
  fail_message: 'raté', success_message: 'success', trick: 'trick',
  hardness: Object.keys(HARDNESS)[0],
}

const SPOON_GAIN_DATA={
  source: 'SPOON_SOURCE_INDIVIDUAL_CHALLENGE_PASSED', gain: '5',
}

describe('Measure model ', () => {

  let user=null

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const company=await Company.create(COMPANY_DATA)
    user=await User.create({...USER_DATA, company})
    await Key.create(KEY_DATA)
    await IndividualChallenge.create({...CHALL_DATA, user})
    await SpoonGain.create(SPOON_GAIN_DATA)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must compute key trophy', async() => {
    // ({model, fields, id, user, params})
    const challengesBefore=await loadFromDb({model: 'individualChallenge', fields: ['trophy_picture'], user})
    console.log(`Off:${challengesBefore[0].trophy_picture}`)
    await User.findByIdAndUpdate(user._id, {$addToSet: {passed_events: challengesBefore[0]._id}})
    const challengesAfter=await loadFromDb({model: 'individualChallenge', fields: ['trophy_picture'], user})
    console.log(`On:${challengesAfter[0].trophy_picture}`)
  })

})
