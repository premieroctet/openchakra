const {createUser} = require('../../utils/withings')
const User = require('../../models/User')
const {addAction} = require('../../utils/studio/actions')

const registerAction = props => {
  console.log(`Dekuple Register with ${JSON.stringify(props)}`)
  return User.exists({email: props.email})
    .then(exists => {
      if (exists) {
        return Promise.reject(`Un compte avec le mail ${props.email} existe déjà`)
      }
      return User.create({...props})
    })
    .then(user => {
      return createUser(user)
        .then(withingsCode => User.findByIdAndUpdate(user._id, {withings_usercode: withingsCode}))
        .then(() => user)
        .catch(err => {
          return User.findByIdAndDelete(user._id)
            .then(() => Promise.reject(err))
        })
    })
}

const openWithingsSettingsAction = () => {
  return Promise.resolve({redirect: 'tagaada'})
}


addAction('register', registerAction)
addAction('openWithingsSettings', openWithingsSettingsAction)
