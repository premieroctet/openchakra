const Validator = require('validator')
const {isValidPhoneNumber} = require('libphonenumber-js')

class RegExpParam extends RegExp {


  constructor(reg, repl) {
    super(reg)
    this.repl = repl
  }

  [Symbol.replace](str) {
    return RegExp.prototype[Symbol.replace].call(this, str, this.repl)
  }
}

const fillSms = (pattern, values) => {
  const r = RegExp('{{\\s*params.([^\\s]+)\\s*}}')
  while (found = r.exec(pattern)) {
    const param = found[1]
    if (values[param] == undefined) {
      console.error(`Missing param ${param}`)
      return null
    }
    pattern = pattern.replace(new RegExpParam(`{{\\s*params.${param}\\s*}}`, values[param]))
  }
  return pattern
}

const isPhoneOk = value => {
  return Validator.isMobilePhone(value, ['fr-FR'])
}

const isInternationalPhoneOK = (value, langIsoCode = 'FR') => {
  if (!value) {
    return false
  }
  return isValidPhoneNumber(value, langIsoCode)
}

const isEmailOk = value => {
  return Validator.isEmail(value)
}

module.exports = {fillSms, isPhoneOk, isEmailOk, isInternationalPhoneOK}
