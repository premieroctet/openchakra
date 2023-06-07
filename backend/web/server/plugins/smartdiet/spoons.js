const User=require('../../models/User')
const SpoonGain=require('../../models/SpoonGain')

const computeChallengeSpoons = ({challenge, user}) => {
  return User.exists({_id: user._id, passed_events: challenge._id})
    .then(passed => (passed ? SpoonGain.findOne({source: 'SPOON_SOURCE_INDIVIDUAL_CHALLENGE_PASSED'}) : 0))
    .then(gain => gain?.gain || 0)
    .catch(err => console.error(err))
}

const getUserIndChallengeTrophy = (user, params, data) => {
  console.log(data)
  return computeChallengeSpoons({challenge: data, user})
    .then(spoons => (spoons>=data.spoons_count_for_trophy ? data.trophy_on_picture : data.trophy_off_picture))
}

module.exports={
  getUserIndChallengeTrophy,
  computeChallengeSpoons,
}
