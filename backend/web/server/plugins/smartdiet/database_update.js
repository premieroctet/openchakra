const lodash=require('lodash')
const mongoose=require('mongoose')
const moment=require('moment')
const { PHONE_REGEX, isPhoneOk } = require("../../../utils/sms")
const User = require("../../models/User")
const { QUIZZ_TYPE_ASSESSMENT, PARTICULAR_COMPANY_NAME, COACHING_STATUS_NOT_STARTED } = require('./consts')
const Appointment = require('../../models/Appointment')
const Company = require('../../models/Company')
const CoachingLogbook = require('../../models/CoachingLogbook')
const Coaching = require('../../models/Coaching')
const { runPromisesWithDelay } = require('../../utils/concurrency')
const Message = require('../../models/Message')
const Conversation = require('../../models/Conversation')
const { idEqual } = require('../../utils/database')
const Offer = require('../../models/Offer')
const Quizz = require('../../models/Quizz')
const { updateCoachingStatus } = require('./coaching')

const log = (...params) => {
  return console.log('DB Update', ...params)
}

const error = (...params) => {
  return console.error('DB Update', ...params)
}

const normalizePhones = async () => {

  log('normalizing phone numbers')
  const normalizePhone = user => {
    if (!isPhoneOk(user.phone)) {
      error(`Clearing invalid phone`, user.phone, 'for', user.email, 'resetting')
      user.phone=null
      return user.save()
    }
    user.phone=user.phone.replace(/^0/, '+33').replace(/ /g, '')
    log(`Normalized for`, user.email, 'to', user.phone)
    return user.save()
  }

  // Normalize user phones
  return User.find({phone: {$ne:null, $not: {$regex: PHONE_REGEX}}})
    .then(users => Promise.allSettled(users.map(u => normalizePhone(u))))
    .then(res => res.some(r => r.status=='rejected') && log(JSON.stringify(lodash.groupBy(res, 'status').rejected)))
}

const renameHealthQuizzTypes = async () => {
  log('Quizz HEALTH => ASSESSMENT')
  /** Rename quizzs types HEALTH to ASSESSMENT */
  await mongoose.connection.collection('quizzs')
  .updateMany({type: 'QUIZZ_TYPE_HEALTH'}, {$set: {type: QUIZZ_TYPE_ASSESSMENT}})
    .then(({matchedCount, modifiedCount}) => log(`quizz type HEALTH=>ASSESSMENT modified`, modifiedCount, '/', matchedCount))
    .catch(err => error(`quizz type HEALTH=>ASSESSMENT`, err))

  /** Rename userquizzs types HEALTH to ASSESSMENT */
  await mongoose.connection.collection('userquizzs')
    .updateMany({type: 'QUIZZ_TYPE_HEALTH'}, {$set: {type: QUIZZ_TYPE_ASSESSMENT}})
    .then(({matchedCount, modifiedCount}) => log(`userquizz type HEALTH=>ASSESSMENT modified`, modifiedCount, '/', matchedCount))
    .catch(err => error(`userquizz type HEALTH=>ASSESSMENT`, err))
}

const setAppointmentsDietAndUser = async () => {
  // Set user & diet on appointments
  return Appointment.deleteMany({coaching: null})
    .then(() => Appointment.find({$or: [{diet: null},{user: null}]}).populate('coaching'))
    .then(appts => {
      return Promise.all(appts.map(app => {
        log(app.coaching.user, app.coaching.diet)
        app.user=app.coaching.user
        app.diet=app.coaching.diet
        return app.save()
      }))
    })
    .then(() => log(`Update appointments with user & diet OK`))
    .catch(err => error(`Update appointments with user & diet`, err))
}

const moveLogbooksToUsers = async () => {
  return CoachingLogbook.distinct('coaching')
    .then(coachingIds => Coaching.find({_id: coachingIds}, {user:1}))
    // Link logbooks to user instead of coaching
    .then(coachings => {
      log('starting move', coachings.length,'logbooks from coaching to user')
      return Promise.all(coachings.map(coaching => {
        log('move logbooks to user for coaching', coaching._id)
        return CoachingLogbook.updateMany({coaching: coaching._id}, {$set: {user: coaching.user}, $unset: {coaching: 1}})
      }))
    })
}

const upgradeMessage = async () => {
  log('syncing messages')
// Remove messages linked to other than users :-|
  const conversationFilter={group:null}
  Message.find(conversationFilter).populate(['sender', 'receiver'])
    .then(messages => {
      // Remove messages having no sender or no receiver
      const wrongMessages=messages.filter(m => (!m.sender || !m.receiver) || idEqual(m.sender._id, m.receiver._id))
      log(wrongMessages.length, 'invalid messages to remove')
      return Promise.all(wrongMessages.map(m => m.delete()))
    })
    .then(() => Message.find({...conversationFilter, conversation: null}, {sender:1, receiver:1}))
    .then(messages => {
      messages=messages.filter(m => m.sender._id != m.receiver._id)
      const grouped=lodash.groupBy(messages, message => {
        const sorted = [message.sender._id.toString(), message.receiver._id.toString()].sort();
        return sorted.join('-');
      })
      // Create conversations for each unordered (sender, receiver) pair
      return Promise.all(Object.keys(grouped).map(key => {
        const [user1, user2]=key.split('-')
        return Conversation.getFromUsers(user1, user2)
      }))
      // Update messages with their conversations
      .then(conversations => Promise.all(conversations.map(conv => {
        const filter={$or: [{sender: conv.users[0], receiver: conv.users[1]}, {sender: conv.users[1], receiver: conv.users[0]}]}
        return Message.updateMany(filter, {conversation: conv})
      })))
    })
    .then(res => log(lodash.sumBy(res, 'nModified'), 'messages updated'))
}

const DEFAULT_OFFER_START = moment('2019-01-01')
const DEFAULT_OFFER_END = moment('2030-12-31')

const upgradeParticularCompanyOffer = async () => {
  const company=await Company.findOne({name: PARTICULAR_COMPANY_NAME}).populate('offers')
  if (lodash.isEmpty(company.offers)) {
    const assQuizz=await Quizz.findOne({type: QUIZZ_TYPE_ASSESSMENT})
    if (!assQuizz) {
      throw new Error('No assessment quizz')
    }
    //const offer=await Offer.create({company, assessment_quizz: assQuizz, validity_start: DEFAULT_OFFER_START, validity_end: DEFAULT_OFFER_END})
    const offer=await Offer.create({company, assessment_quizz: assQuizz, 
        validity_start: DEFAULT_OFFER_START, validity_end: DEFAULT_OFFER_END,
        price:0, duration:0, name: `Offre pour ${PARTICULAR_COMPANY_NAME}`,
    })
  }
}

const upgradeOffers = async () => {
  const assQuizz=await Quizz.findOne({type: QUIZZ_TYPE_ASSESSMENT})
  if (!assQuizz) {
    throw new Error('No assessment quizz')
  }
  let offers=await Offer.find()
  offers=offers.map(offer => {
    offer.assessment_quizz=offer.assessment_quizz || assQuizz
    offer.validity_start=offer.validity_start || DEFAULT_OFFER_START
    offer.validity_end=offer.validity_end || DEFAULT_OFFER_END
    return offer
  })
  await Promise.all(offers.map(o => o.save()))
}

const upgradeCompanyOffers = async () => {
  const companies=await Company.find().populate('offers')
  const noOffersCompanies=companies.filter(c => lodash.isEmpty(c.offers))
  if (!lodash.isEmpty(noOffersCompanies)) {
    throw new Error(`Companies without offer ${noOffersCompanies.map(c => c.name)}`)
  }
}

const setCoachingAssQuizz = async () => {
  /** Extract HEALTH QUIZZ from coachings quizz, set it to assessment_quizz
   * use collection because Coaching.quizz attribute was removed from schema
   * */
  return Coaching.find()
    .populate({path: 'quizz'})
    .then(coachings => {
      const withAssessmentQuizz=coachings.filter(c => c.quizz?.some(q => q.type==QUIZZ_TYPE_ASSESSMENT))
      log('moving health quizz for ', withAssessmentQuizz.length, 'coachings')
      return Promise.all(withAssessmentQuizz.map(c => {
        const healthQuizz=c.quizz.find(q => q.type==QUIZZ_TYPE_ASSESSMENT)._id
        return Coaching.findOneAndUpdate({_id: c._id}, {$set: {assessment_quizz: healthQuizz}, $pull: {quizz: healthQuizz}}, {runValidators: true})
      }))
    })
}

const setOffersOnCoachings = () => {
  log('set offers on coachings')
/** Set offers on coachings */
  return Coaching.find({offer: null})
    .populate({path: 'user', populate: {path: 'company', populate: 'current_offer'}})
    .then(coachings => Promise.all(coachings.map(coaching => {
      // Remove coachings with deleted users
      if (!coaching.user) {
        return coaching.delete()
      }
      coaching.offer=coaching.user?.company.current_offer
      coaching.status=COACHING_STATUS_NOT_STARTED
      if (!coaching.offer) {
        error('coaching without offer', coaching)
      }
      else {
        console.log('saved coaching', coaching._id, 'offer', coaching.offer._id)
        coaching.save()
      }
    })))
    .then(() => {
      return Coaching.find({}, {_id:1})
        .then(coachings =>  Promise.allSettled(coachings.map(coaching => updateCoachingStatus(coaching._id)
          .catch(err => console.error(`Coaching ${coaching._id}:${err}`)))))
      })
}

const databaseUpdate = async () => {
  console.log('************ UPDATING DATABASE')
  await normalizePhones()
  await renameHealthQuizzTypes()
  await setAppointmentsDietAndUser()
  await moveLogbooksToUsers()
  await upgradeMessage()
  await upgradeOffers()
  await upgradeParticularCompanyOffer()
  await upgradeCompanyOffers()
  await setOffersOnCoachings()
  await setCoachingAssQuizz()
}

module.exports=databaseUpdate