const { getAuthorizationCode } = require('../../server/utils/withings')
const { updateTokens } = require('../../server/plugins/dekuple/functions')
const User = require('../../server/models/User')
const mongoose = require('mongoose')
const { getDataModel, getDatabaseUri } = require('../../config/config')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')

const run = async () => {
  if (getDataModel()!='dekuple') {
    console.error('Script to run under dekuple model only')
  }
  console.log(getDatabaseUri())
  await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  const users=await User.find().then(async users => {
    return users.map(async u => {
      u.access_token=null
      u.csrf_token=null
      u.refresh_token=null
      u.expires_at=null
      const authCode=await getAuthorizationCode(u.email)
      u.withings_usercode=authCode
      await updateTokens(u)
      const saved=await u.save()
      console.log(saved)
      return saved
    })
  })
}

run()

