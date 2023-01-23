const moment=require('moment')
const lodash=require('lodash')
const mongoose = require('mongoose')
const {forceDataModelAftral}=require('../utils')
forceDataModelAftral()

const {
  APPRENANT,
  RES_AVAILABLE,
  RES_CURRENT,
  RES_FINISHED,
  RES_TO_COME,
} = require('../../utils/aftral_studio/consts')
const {
  getResourceStatus,
  getThemeStatus,
  myCache,
} = require('../../server/utils/studio/aftral_studio/functions')
const Session = require('../../server/models/Session')
const UserSessionData = require('../../server/models/UserSessionData')
const Theme = require('../../server/models/Theme')
const Resource = require('../../server/models/Resource')
const User = require('../../server/models/User')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

jest.setTimeout(20000)

describe('XLSX imports', () => {
  let resources, user, themes

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    user=await User.create({firstname: 'Sébastien', name: 'Auvray', email: 'seb@test.com', role: APPRENANT})
    resources=await Promise.all(lodash.range(6).map(idx => Resource.create({name: `resource ${idx}`})))
    themes=await Promise.all(lodash.range(3).map(idx => Theme.create({name: `theme ${idx}`, ordered: false, resources: resources.slice(idx*2, (idx+1)*2)})))
    await Session.create({themes, ordered: false, trainees: [user]})
    await UserSessionData.create({user, finished: resources.slice(0, 2)})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('should return proper status', async() => {
    let resStatus=await Promise.all(resources.map(r => getResourceStatus(user, {}, r)))
    expect(resStatus).toEqual([RES_FINISHED, RES_FINISHED, RES_AVAILABLE, RES_AVAILABLE, RES_AVAILABLE, RES_AVAILABLE])
    let themeStatus=await Promise.all(themes.map(r => getThemeStatus(user, {}, r)))
    expect(themeStatus).toEqual([RES_FINISHED, RES_AVAILABLE, RES_AVAILABLE])

    await UserSessionData.findOneAndUpdate({}, {$push: {spent_times: {resource: resources[2], spent_time: 10000}}}, {new: true})
    // Clear cache
    myCache.flushAll()
    resStatus=await Promise.all(resources.map(r => getResourceStatus(user, {}, r._id)))
    expect(resStatus).toEqual([RES_FINISHED, RES_FINISHED, RES_CURRENT, RES_AVAILABLE, RES_AVAILABLE, RES_AVAILABLE])
    themeStatus=await Promise.all(themes.map(r => getThemeStatus(user, {}, r._id)))
    expect(themeStatus).toEqual([RES_FINISHED, RES_CURRENT, RES_AVAILABLE])

    // Test orders
    await Theme.updateMany({}, {ordered: true})
    await Session.updateMany({}, {ordered: true})
    myCache.flushAll()
    const allResStatus=await Promise.all(resources.map(r => getResourceStatus(user, {}, r._id, true)))
    expect(allResStatus).toEqual([RES_FINISHED, RES_FINISHED, RES_CURRENT, RES_TO_COME, RES_TO_COME, RES_TO_COME])
    const allThemeStatus=await Promise.all(themes.map(r => getThemeStatus(user, {}, r._id)))
    return expect(allThemeStatus).toEqual([RES_FINISHED, RES_CURRENT, RES_TO_COME])

  })
})
