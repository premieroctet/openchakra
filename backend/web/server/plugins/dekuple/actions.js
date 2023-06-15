const User = require('../../models/User')
const { BadRequestError } = require('../../utils/errors')
const {
  generatePassword,
  validatePassword
} = require('../../../utils/passwords')
const {updateTokens} = require('./functions')
const {createUser} = require('../../utils/withings')
const {addAction} = require('../../utils/studio/actions')
const { sendForgotPassword, sendWelcomeRegister } = require('./mailing')

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
        .then(user => sendWelcomeRegister({user, password: props.password}))
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

const forgotPasswordAction=({context, parent, email}) => {
  return User.findOne({email})
   .then(user => {
     if (!user) {
       throw new BadRequestError(`Aucun compte n'est associé à cet email`)
     }
     const password=generatePassword()
     user.password=password
     return user.save()
       .then(user => sendForgotPassword({user, password}))
       .then(user => `Un email a été envoyé à l'adresse ${email}`)
   })
}

addAction('register', registerAction)
addAction('openWithingsSettings', openWithingsSettingsAction)
addAction('forgotPassword', forgotPasswordAction)

const changePassword=({password, password2}, user) => {
  return validatePassword({password, password2})
    .then(()=> {
      return User.findByIdAndUpdate(user._id, {password})
    })
}

addAction('changePassword', changePassword)
