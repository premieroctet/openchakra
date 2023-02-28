const User = require('../../models/User')
const {updateTokens} = require('./functions')
const {createUser} = require('../../utils/withings')
const {addAction} = require('../../utils/studio/actions')
const { validatePassword } = require('../../../utils/passwords')

const registerAction = props => {
  console.log(`Dekuple Register with ${JSON.stringify(props)}`)
  return User.exists({email: props.email})
    .then(exists => {
      if (exists) {
        return Promise.reject(`Un compte avec le mail ${props.email} existe déjà`)
      }
      return validatePassword({...props})
        .then(() => User.create({...props}))
    })
    .then(user => {
      return createUser(user)
        .then(withingsCode => {user.withings_usercode=withingsCode; return user.save()})
        .then(user => updateTokens(user))
        .catch(err => {
          return User.findByIdAndDelete(user._id)
            .then(() => Promise.reject(err))
        })
    })
}

const openWithingsSettingsAction = () => {
  return Promise.resolve({redirect: 'tagaada'})
}

const deactivateAccount = (params, user) => {
  return User.findByIdAndUpdate(user._id, {active: false}, {new: true})
}

addAction('register', registerAction)
addAction('openWithingsSettings', openWithingsSettingsAction)
addAction('deactivateAccount', deactivateAccount)
