const {logEvent}=require('./events')
const uuidv4 = require('uuid/v4')

const INVITATION_TITLE='Invitation pour inscription'

const getRegisterCode = (req, email) => {
  return new Promise((res, rej) => {
    req.context.getModel('User').exists({email: email})
      .then(exists => {
        if (exists) {
          return rej(`Un compte avec l'email ${email} existe déjà`)
        }
        let code=uuidv4()
        logEvent(req, 'Administration', INVITATION_TITLE, `Invitation envoyée à ${email}, code:${code}`, data={email: email, code: code, registered: false})
        return res(code)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

const checkRegisterCodeValidity = (req, code) => {
  return new Promise((res, rej) => {
    req.context.getModel('EventLog').findOne({'data.code': code})
      .then(data => {
        if (!data) {
          return rej('Ce lien n\'est pas valide')
        }
        if (data.data.registered) {
          return rej('Ce lien a déjà été utilisé')
        }
        return res('Ce lien est valide')
      })
      .catch(err => rej(err))
  })
}

const setRegisterCodeUsed = (req, code) => {
  return new Promise((res, rej) => {
    checkRegisterCodeValidity(req, code)
      .then(() => {
        return req.context.getModel('EventLog').update({'data.code': code}, {'data.registered': true})
      })
      .then(result => {
        if (!result.nModified==1) {
          console.error(`Erreur au set du register code ${code}:${JSON.stringify(result)}`)
          return rej(`Impossible d'enregistrer le code ${code}`)
        }
        return res()
      })
      .catch(err => {
        console.error(err)
        return rej(err)
      })
  })
}

module.exports={getRegisterCode, checkRegisterCodeValidity, setRegisterCodeUsed}
