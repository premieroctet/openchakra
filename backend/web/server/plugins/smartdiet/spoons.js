const lodash=require('lodash')
const {CREATED_AT_ATTRIBUTE}=require('../../utils/database')
const {SPOON_SOURCE, SPOON_SOURCE_CONTENT_LIKE, SPOON_SOURCE_CONTENT_READ,
  SPOON_SOURCE_GROUP_JOIN, SPOON_SOURCE_CONTENT_COMMENT, SPOON_SOURCE_CONTENT_PINNED,
  SPOON_SOURCE_GROUP_MESSAGE, SPOON_SOURCE_GROUP_LIKE, SPOON_SOURCE_INDIVIDUAL_CHALLENGE_PASSED, SPOON_SOURCE_INDIVIDUAL_CHALLENGE_ROUTINE,
  SPOON_SOURCE_MEASURE_CHEST, SPOON_SOURCE_MEASURE_WAIST, SPOON_SOURCE_MEASURE_HIPS,
  SPOON_SOURCE_MEASURE_THIGHS, SPOON_SOURCE_MEASURES_ARMS, SPOON_SOURCE_MEASURE_WEIGHT,
  SPOON_SOURCE_SURVEY_DONE, SPOON_SOURCE_SURVEY_PASSED, SURVEY_ANSWER,
  SPOON_SOURCE_WEBINAR_LIVE, SPOON_SOURCE_WEBINAR_REPLAY,
}=require('./consts')
const User=require('../../models/User')
const SpoonGain=require('../../models/SpoonGain')
const Content=require('../../models/Content')
const Group=require('../../models/Group')
const Comment=require('../../models/Comment')
const Message=require('../../models/Message')
const Measure=require('../../models/Measure')
const UserSurvey=require('../../models/UserSurvey')
require('../../models/UserQuestion')

const computeChallengeSpoons = ({challenge, userId}) => {
  return Promise.all([
    User.exists({_id: userId, passed_events: challenge._id}),
    User.exists({_id: userId, routine_events: challenge._id})])
    .then(([passed, routine]) => (passed ? SpoonGain.findOne({source: SPOON_SOURCE_INDIVIDUAL_CHALLENGE_PASSED}) : routine ? SpoonGain.findOne({source: SPOON_SOURCE_INDIVIDUAL_CHALLENGE_ROUTINE}) : 0 ))
    .then(gain => gain?.gain || 0)
    .catch(err => console.error(err))
}

const getUserIndChallengeTrophy = (userId, params, data) => {
  return computeChallengeSpoons({challenge: data, userId})
    .then(spoons => (spoons>=data.spoons_count_for_trophy ? data.trophy_on_picture : data.trophy_off_picture))
}

const SOURCE_COMPUTE_FNS={
  [SPOON_SOURCE_CONTENT_LIKE]: ({source, key_filter, userId}) => {
    return Content.countDocuments({...key_filter, likes: userId})
      .catch(err => console.error(err))
  },
  [SPOON_SOURCE_CONTENT_READ]: ({source, key_filter, userId}) => {
    return Content.countDocuments({...key_filter, viewed_by: userId})
      .catch(err => console.error(err))
  },
  [SPOON_SOURCE_GROUP_JOIN]: ({source, key_filter, userId}) => {
    return Group.countDocuments({...key_filter, users: userId})
      .catch(err => console.error(err))
  },
  [SPOON_SOURCE_CONTENT_COMMENT]: ({source, key_filter, userId}) => {
    return Comment.find({user: userId})
      .populate({path: 'content', match: key_filter})
      .then(comments => comments.filter(c => !!c.content).length)
  },
  [SPOON_SOURCE_CONTENT_PINNED]: ({source, key_filter, userId}) => {
    return Content.countDocuments({...key_filter, pins: userId})
      .catch(err => console.error(err))
  },
  [SPOON_SOURCE_GROUP_MESSAGE]: ({source, key_filter, userId}) => {
    return Message.find({sender: userId})
      .populate({path: 'group', match: key_filter})
      .then(message => message.filter(c => !!c.group).length)
  },
  [SPOON_SOURCE_GROUP_LIKE]: ({source, key_filter, userId}) => {
    return Group.countDocuments({...key_filter, likes: userId})
      .catch(err => console.error(err))
  },
  [SPOON_SOURCE_INDIVIDUAL_CHALLENGE_PASSED]: ({source, key_filter, userId}) => {
    return User.findById(userId)
      .populate({path: 'passed_events', match: {'__t': 'individualChallenge', ...key_filter}})
      .then(u => u.passed_events.length)
  },
  [SPOON_SOURCE_INDIVIDUAL_CHALLENGE_ROUTINE]: ({source, key_filter, userId}) => {
    return User.findById(userId)
      .populate({path: 'routine_events', match: {'__t': 'individualChallenge', ...key_filter}})
      .then(u => u.passed_events.length)
  },
  [SPOON_SOURCE_MEASURE_CHEST]: ({source, key_filter, userId}) => {
    if (!lodash.isEmpty(key_filter)) {return Promise.resolve(0)}
    return Measure.countDocuments({user: userId, chest: {$ne: null}})
  },
  [SPOON_SOURCE_MEASURE_WAIST]: ({source, key_filter, userId}) => {
    if (!lodash.isEmpty(key_filter)) {return Promise.resolve(0)}
    return Measure.countDocuments({user: userId, waist: {$ne: null}})
  },
  [SPOON_SOURCE_MEASURE_HIPS]: ({source, key_filter, userId}) => {
    if (!lodash.isEmpty(key_filter)) {return Promise.resolve(0)}
    return Measure.countDocuments({user: userId, hips: {$ne: null}})
  },
  [SPOON_SOURCE_MEASURE_THIGHS]: ({source, key_filter, userId}) => {
    if (!lodash.isEmpty(key_filter)) {return Promise.resolve(0)}
    return Measure.countDocuments({user: userId, thighs: {$ne: null}})
  },
  [SPOON_SOURCE_MEASURES_ARMS]: ({source, key_filter, userId}) => {
    if (!lodash.isEmpty(key_filter)) {return Promise.resolve(0)}
    return Measure.countDocuments({user: userId, arms: {$ne: null}})
  },
  [SPOON_SOURCE_MEASURE_WEIGHT]: ({source, key_filter, userId}) => {
    if (!lodash.isEmpty(key_filter)) {return Promise.resolve(0)}
    return Measure.countDocuments({user: userId, weight: {$ne: null}})
  },
  [SPOON_SOURCE_SURVEY_DONE]: ({source, key_filter, userId}) => {
    return UserSurvey.find({user: userId}).sort({[CREATED_AT_ATTRIBUTE]: -1}).limit(1)
      .populate('questions')
      .then(([survey]) => survey.questions.every(q => !lodash.isNil(q.answer))? 1 : 0)
  },
  [SPOON_SOURCE_SURVEY_PASSED]: ({source, key_filter, userId}) => {
    const maxAnswer=lodash.max(Object.keys(SURVEY_ANSWER))
    return UserSurvey.find({user: userId}).sort({[CREATED_AT_ATTRIBUTE]: -1}).limit(1)
      .populate('questions')
      .then(([survey]) => survey.questions.every(q => q.answer==maxAnswer)? 1 : 0)
  },
  [SPOON_SOURCE_WEBINAR_LIVE]: ({source, key_filter, userId}) => {
    return User.findById(userId)
    .populate({path: 'passed_events', match: {'__t': 'webinar', ...key_filter}})
    .then(u => u.passed_events.length)
  },
  [SPOON_SOURCE_WEBINAR_REPLAY]: ({source, key_filter, userId}) => {
    return User.findById(userId)
    .populate({path: 'replayed_events', match: {'__t': 'webinar', ...key_filter}})
    .then(u => u.passed_events.length)
  },
}

const computeSourceSpoonCount = ({source, key, userId}) => {
  return SpoonGain.findOne({source})
    .then(spoonGain => {
      // No gain or 0 for this source : return 0
      if (!spoonGain?.gain) {
        //throw new Error(`No defined gain for ${source}`)
        //console.error(`No defined gain for ${source}`)
        return 0
      }
      const fn=SOURCE_COMPUTE_FNS[source]
      if (!fn) {
        //console.error(`Missing compute spoon fn for ${source}`)
        return 0
      }
      const key_filter=key ? {key: key._id}:{}
      return fn({source, key_filter, userId})
        .then(sourceSpoons => {
          const total=sourceSpoons*spoonGain.gain
          //console.log(`User ${user.email}:key:${key?.name},source:${source},matched:${sourceSpoons},gain:${spoonGain.gain}=>${total}` )
          return total
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

const countUserSpoons = (userId, key) => {
  return Promise.all(Object.keys(SPOON_SOURCE).map(k => computeSourceSpoonCount({source: k, key, userId})))
      .then(spoons => lodash.sum(spoons))
}

const getUserKeyTrophy = (userId, params, key) => {
  return countUserSpoons(userId, key)
    .then(spoonsCount => {
      return spoonsCount>= key.spoons_count_for_trophy ? key.trophy_on_picture : key.trophy_off_picture
    }).catch(err => console.error(err))
}

const getUserSpoons = (userId) => {
  return countUserSpoons(userId, null, null)
}

const getUserKeySpoons = (userId, params, key) => {
  return countUserSpoons(userId, key)
}

const getUserKeyReadContents = (userId, params, key) => {
  return computeSourceSpoonCount({source: SPOON_SOURCE_CONTENT_READ, key, userId})
}

const getUserKeyProgress = (userId, params, key) => {
  return Promise.all([
    getUserKeyReadContents(userId, params, key),
    Content.countDocuments({key})
  ])
    .then(([spoons, total]) => total ? parseInt(spoons*100/total) : 0)
}

module.exports={
  getUserIndChallengeTrophy,
  getUserKeyTrophy,
  getUserSpoons,
  getUserKeySpoons,
  getUserKeyProgress,
  getUserKeyReadContents,
}
