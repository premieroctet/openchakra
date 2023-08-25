const {
  MONGOOSE_OPTIONS,
  getMongooseModels
} = require('../../../server/utils/database')
const moment = require('moment')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet}=require('../../utils')
forceDataModelSmartdiet()
const User=require('../../../server/models/User')
const Company=require('../../../server/models/Company')
const Content=require('../../../server/models/Content')
const Comment=require('../../../server/models/Comment')
const Key=require('../../../server/models/Key')
require('../../../server/models/Target')
require('../../../server/models/Category')
require('../../../server/models/Association')
require('../../../server/models/Question')
const {loadFromDb}=require('../../../server/utils/database')
const {CONTENTS_TYPE}=require('../../../server/plugins/smartdiet/consts')
require('../../../server/plugins/smartdiet/functions')

jest.setTimeout(10000)

describe('Validate virtual attributes mapping', ()=> {
  let user
  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    const company=await Company.create({size:100, activity:'COMPANY_ACTIVITY_BANQUE',name:'Test'})
	user=await User.create({pseudo:'s',email:'email',firstname:'f',lastname:'l',company, dataTreatmentAccepted:true,cguAccepted:true})
    const key=await Key.create({trophy_on_picture:1,trophy_off_picture:1,spoons_count_for_trophy:1,picture:1,name:1})
    const content=await Content.create({key,creator:user,default:true,duration:1,type:Object.keys(CONTENTS_TYPE)[0],name:'contents',contents:1,picture:1})
    const comment=await Comment.create({content,text:'comment',user})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  test('Check virtual attribute populate', async () => {
    const [loaded_user]=await loadFromDb({model: 'user',fields:['contents.comments_count'],user})
    expect(loaded_user.contents).toHaveLength(1)
    expect(loaded_user.contents[0].comments_count).toEqual(1)
  })

})
