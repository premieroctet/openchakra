const mongoose = require('mongoose')
const lodash=require('lodash')
const moment = require('moment')
const {COMPANY_ACTIVITY, HARDNESS, CONTENTS_TYPE, SPOON_SOURCE, SURVEY_ANSWER,
} = require('../../server/plugins/smartdiet/consts')
const {forceDataModelSmartdiet}=require('../utils')
forceDataModelSmartdiet()
require('../../server/plugins/smartdiet/functions')

const {MONGOOSE_OPTIONS, loadFromDb} = require('../../server/utils/database')

const Key = require('../../server/models/Key')
const User = require('../../server/models/User')
const Company = require('../../server/models/Company')
const IndividualChallenge=require('../../server/models/IndividualChallenge')
const SpoonGain=require('../../server/models/SpoonGain')
const Content=require('../../server/models/Content')
const Group=require('../../server/models/Group')
const Comment=require('../../server/models/Comment')
const Message=require('../../server/models/Message')
const Measure=require('../../server/models/Measure')
const Question=require('../../server/models/Question')
const UserQuestion=require('../../server/models/UserQuestion')
const UserSurvey=require('../../server/models/UserSurvey')
const Webinar=require('../../server/models/Webinar')
require('../../server/models/Target')
require('../../server/models/Category')
require('../../server/models/Pip')
require('../../server/models/Menu')

const TROPHY_ON='trophy successful'
const TROPHY_OFF='trophy failed'

const SPOONS_GAIN=5

const COMPANY_DATA={
  name: 'S', size: 10, activity: Object.keys(COMPANY_ACTIVITY)[0],
}

const USER_DATA={firstname: 'S', lastname: 'S', dataTreatmentAccepted: true,
  cguAccepted: true, pseudo: 'S', phone: '0', email: 's',
}

const KEY_DATA={
  trophy_off_picture: TROPHY_OFF, trophy_on_picture: TROPHY_ON, spoons_count_for_trophy: SPOONS_GAIN,
  picture: 'p', name: 'clé',
}

const CHALL_DATA={start_date: moment(), end_date: moment(), description: 'S',
  name: 'Challenge', trophy_on_picture: TROPHY_ON, trophy_off_picture: TROPHY_OFF,
  fail_message: 'raté', success_message: 'success', trick: 'trick',
  hardness: Object.keys(HARDNESS)[0],
}

// Set all sources to gain 5 spoons
const SPOON_GAIN_DATA=Object.keys(SPOON_SOURCE).map(source=> ({source, gain: SPOONS_GAIN}))

const CONTENT_DATA={duration: 5, contents:'Tagada',type:Object.keys(CONTENTS_TYPE)[0],
  picture: 'tagada', default: false, name:'Contenu'
}

const GROUP_DATA={name: 'Un groupe', description:'Description du groupe', picture: 'tagada'}

const COMMENT_DATA={text:' Commmentaire'}

const MESSAGE_DATA={content: 'Group message'}

const QUESTION_DATA={picture: 'question picture', question: 'question', title: 'titre'}

const WEBINAR_DATA={start_date:moment(), end_date: moment(), name: 'webinar', description:'webinar', url: 'URL'}

jest.setTimeout(20000)

describe('Spoons gain tests ', () => {

  let user=null
  let content=null
  let group=null
  let company=null
  let webinar=null

  beforeAll(async() => {
    await mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    company=await Company.create(COMPANY_DATA)
    user=await User.create({...USER_DATA, company})
    const key=await Key.create(KEY_DATA)
    await IndividualChallenge.create({...CHALL_DATA, user})
    await SpoonGain.create(SPOON_GAIN_DATA)
    content=await Content.create({...CONTENT_DATA, key, creator: user})
    group=await Group.create({...GROUP_DATA, key, moderator: user})
    await Measure.create([{user}, {user}])
    const questions=await Promise.all(lodash.range(1, 10).map(order => Question.create({...QUESTION_DATA, order})))
    const survey=await UserSurvey.create({user})
    const userQuestions=await Promise.all(questions.map(question => UserQuestion.create({question, order: question.order, survey})))
    webinar=await Webinar.create({...WEBINAR_DATA, user})
  })

  afterAll(async() => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
  })

  it('must compute individual challenge trophy', async() => {
    const [challengeBefore]=await loadFromDb({model: 'individualChallenge', fields: ['trophy_picture'], user})
    expect(challengeBefore.trophy_picture).toEqual(TROPHY_OFF)
    await User.findByIdAndUpdate(user._id, {$addToSet: {passed_events: challengeBefore._id}})
    const [challengeAfter]=await loadFromDb({model: 'individualChallenge', fields: ['trophy_picture'], user})
    expect(challengeAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await User.findByIdAndUpdate(user._id, {$pull: {passed_events: challengeBefore._id}})
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute content liked key trophy', async() => {
    const [keyBefore]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyBefore.trophy_picture).toEqual(TROPHY_OFF)
    await Content.findOneAndUpdate({}, {$addToSet: {likes: user._id}})
    const [keyAfter]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await Content.findOneAndUpdate({}, {$pull: {likes: user._id}})
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute content viewed key trophy', async() => {
    const [keyBefore]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyBefore.trophy_picture).toEqual(TROPHY_OFF)
    await Content.findOneAndUpdate({}, {$addToSet: {viewed_by: user._id}})
    const [keyAfter]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await Content.findOneAndUpdate({}, {$pull: {viewed_by: user._id}})
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute group joined key trophy', async() => {
    const [keyBefore]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyBefore.trophy_picture).toEqual(TROPHY_OFF)
    await Group.findOneAndUpdate({}, {$addToSet: {users: user._id}})
    const [keyAfter]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await Group.findOneAndUpdate({}, {$pull: {users: user._id}})
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute comment content key trophy', async() => {
    const [keyBefore]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyBefore.trophy_picture).toEqual(TROPHY_OFF)
    const comment=await Comment.create({...COMMENT_DATA, content, user})
    const [keyAfter]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await comment.delete()
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute comment pinned key trophy', async() => {
    const [keyBefore]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyBefore.trophy_picture).toEqual(TROPHY_OFF)
    const c=await Content.findOneAndUpdate({}, {$addToSet: {pins: user}})
    const [keyAfter]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await Content.findOneAndUpdate({}, {$pull: {pins: user}})
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute group message key trophy', async() => {
    const [keyBefore]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyBefore.trophy_picture).toEqual(TROPHY_OFF)
    const message=await Message.create({...MESSAGE_DATA, sender: user, group})
    const [keyAfter]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await message.delete()
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute group likes key trophy', async() => {
    const [keyBefore]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyBefore.trophy_picture).toEqual(TROPHY_OFF)
    await Group.findOneAndUpdate({}, {$addToSet: {likes: user._id}})
    const [keyAfter]=await loadFromDb({model: 'key', fields: ['trophy_picture'], user})
    expect(keyAfter.trophy_picture).toEqual(TROPHY_ON)
    const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    await Group.findOneAndUpdate({}, {$pull: {likes: user._id}})
    expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN)
  })

  it('must compute measures spoons', async() => {
    const ATTRIBUTES='chest,waist,hips,thighs,arms,weight'.split(',')
    const [user_before]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    expect(user_before.spoons_count).toEqual(0)
    for await (const [index, att] of ATTRIBUTES.entries()) {
      await Measure.updateMany({}, {[att]: 6})
      const [loaded_user]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
      expect(loaded_user.spoons_count).toEqual(SPOONS_GAIN*(index+1)*2)
    }
    await Measure.updateMany({}, {$set:Object.fromEntries(ATTRIBUTES.map(att=>([att, null])))})
  })

  it('must compute survey spoons', async() => {
    const [user_before]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    expect(user_before.spoons_count).toEqual(0)
    // Survey filled but not passed
    await UserQuestion.updateMany({answer:Object.keys(SURVEY_ANSWER)[0]})
    const [user_survey_done]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    expect(user_survey_done.spoons_count).toEqual(SPOONS_GAIN)
    // Survey passed
    await UserQuestion.updateMany({answer:lodash.max(Object.keys(SURVEY_ANSWER))})
    const [user_survey_passed]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    expect(user_survey_passed.spoons_count).toEqual(SPOONS_GAIN*2)
    await UserQuestion.updateMany({answer:null})
  })

  it('must compute webinar spoons', async() => {
    const [user_before]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    expect(user_before.spoons_count).toEqual(0)
    await User.update({}, {$addToSet:{passed_events: webinar._id}})
    const [user_after]=await loadFromDb({model: 'user', fields: ['spoons_count'], user})
    expect(user_after.spoons_count).toEqual(SPOONS_GAIN)
    await User.update({}, {$pull:{passed_events: webinar._id}})
  })

})
