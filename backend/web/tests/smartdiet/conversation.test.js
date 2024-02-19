const lodash=require('lodash')
const mongoose = require('mongoose')
const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
const Conversation = require('../../server/models/Conversation')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const Message = require('../../server/models/Message')
const { ROLE_EXTERNAL_DIET } = require('../../server/plugins/smartdiet/consts')
const User = require('../../server/models/User')

forceDataModelSmartdiet()

require('../../server/plugins/smartdiet/functions')

const DIET_CRITERION={email: 'stephanieb.smartdiet@gmail.com', role: ROLE_EXTERNAL_DIET}

describe('Conversation ', () => {

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/smartdiet`, MONGOOSE_OPTIONS)
  })

  afterAll(async() => {
    // await mongoose.connection.close()
  })

  it(`must check conversations`, async() => {
    const conversations=await Conversation.find()
    const getConvUsers = conv => new Set(conv.users.map(u => u._id.toString()))
    const getMsgUsers = msg => new Set([msg.sender, msg.receiver].map(u => u._id.toString()))
    const messages=await Message.find({group: null})
    console.log('conversations', conversations)
    messages.forEach(m => {
      const msgUsers = getMsgUsers(m)
      const conv=conversations.find(c => lodash.isEqual(msgUsers, getConvUsers(c)))
      expect(conv._id.toString()).toEqual(m.conversation._id.toString())
    })
  })

  it(`must check conversations messages`, async() => {
    const conversations=await Conversation.find()
      .populate({path: 'users'})
      .populate({path: 'messages', populate: ['sender', 'receiver']})
    const sortedConversations=lodash.sortBy(conversations, conv => conv.users.map(u => u.email).sort().join('-'))
    sortedConversations.map(conv => {
      console.group(conv.users.map(u => u.email).sort())
      conv.messages.forEach(m => {
        console.log(m.group ? "GROUPE!!!"+m: '')
        console.log([m.sender, m.receiver].map(u => u.email).sort())
      })
      console.groupEnd()
    })
  })

  it.only('Should return latest messages', async()=> {
    const diet=await User.findOne(DIET_CRITERION)
    const conversations=await Conversation.find({users: diet._id}).populate(['messages', 'latest_messages'])
    conversations
      .filter(c => c.messages.length==1)
      .forEach(conv => {
        console.log(conv._id)
        expect(conv.latest_messages).toHaveLength(1)
    })
  })

})

