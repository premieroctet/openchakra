const {
  COMPANY_ACTIVITY_BANQUE
} = require('../../../server/plugins/smartdiet/consts')
const {
  getModelAttributes,
  getModels
} = require('../../../server/utils/database')
const {forceDataModelSmartdiet}=require('../../utils')

forceDataModelSmartdiet()

require('../../../server/plugins/smartdiet/functions')
const {ROLE_ADMIN} = require('../../../server/plugins/smartdiet/consts')
const moment=require('moment')
const mongoose = require('mongoose')
const {MONGOOSE_OPTIONS, loadFromDb} = require('../../../server/utils/database')

const Message=require('../../../server/models/Message')
const Company=require('../../../server/models/Company')
require('../../../server/models/Group')
const Key=require('../../../server/models/Key')
const Group = require('../../../server/models/Group')
const User = require('../../../server/models/User')
const Offer = require('../../../server/models/Offer')

describe('Measure model ', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must generate _count attributes', async() => {
    const attributes=await getModelAttributes('message')
    const names=attributes.map(att => att[0])
    console.log(names.filter(name => /count/.test(name) && !name.includes('.')))
  })

  it('must load _count attributes', async() => {
    const key=await Key.create({picture:'picture', name:'Clé'})
    const offer=await Offer.create({coaching_credit:1, video_unlimited:true,
      podcasts_unlimited:true, articles_unlimited:true,infographies_unlimited:true,
      webinars_unlimited:true,duration:1,price:1,name:'offre'
    })
    const company=await Company.create({name:'Compagnie', offer:null, size:15,
      activity:COMPANY_ACTIVITY_BANQUE, offer})
    const user=await User.create({dataTreatmentAccepted:true, cguAccepted:true,
      company, pseudo:'SEB',email:'jjlk',firstname:'S',lastname:'A'})
    const group=await Group.create({name:'groupe',key,moderator:user,description:'AA',picture:'A'})
    await Message.create({content: 'hop',group,sender:user, likes:[user._id]})
    const messages=await loadFromDb({model: 'message', fields:['likes_count']})
    console.log(messages)
  })

})
