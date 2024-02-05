const ced = require('ced')
const csv_string = require('csv-string')
const stripBom = require('strip-bom')
const moment=require('moment')
const lodash=require('lodash')

const ARTICLES = 'le la les un une de des d l à'.split(/ /g)
const SIREN_LENGTH=9
const SIRET_LENGTH=14

const normalize = str => {
  str = str ? str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : ''
  return str
}

// Escapes special characters for regex
const escapeText = txt => {
  return txt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const createRegExp = str => {
  str = escapeText(normalize(str)).split(/ |'/g)
  // Remove articles
  str = str.filter(s => !ARTICLES.includes(s))
  const regexp = new RegExp(str.join('|'), 'i')
  return regexp
}

const createRegExpAND = str => {
  str = escapeText(normalize(str)).split(/ |'/g)
  // Remove articles
  str = str.filter(s => !ARTICLES.includes(s))
  const regexp = new RegExp(str.map(s => `(?=.*${s})`).join(''), 'i')
  return regexp
}

const createRegExpOR = str => {
  str = escapeText(normalize(str)).split(/ |'/g)
  // Remove articles
  str = str.filter(s => !ARTICLES.includes(s))
  const regexp = new RegExp(str.map(s => `\\b${s}\\b`).join('|'), 'i')
  return regexp
}

const matches = (str, keywords) => {
  const regexps = createRegExp(keywords)
  const ok = regexps.test(str)
  return ok
}

const formatIban = iban => {
  const result = iban.split('').map((l, idx) => ((idx + 1) % 4 == 0 ? `${l } ` : l)).join('')
  return result
}

const maskIban = iban => {
  const len = iban.length
  const masked = iban.slice(0, 4) + 'X'.repeat(len - 8) + iban.slice(-4)
  return masked
}

const frenchFormat = str => {
  const reg = /de ([éèêàaeiou])/i
  const result = str.replace(reg, 'd\'$1')
  return result
}

const normalizePhone = p => {
  if (p) {
    p=p.trim()
    const not_number=/[^\d]/
    while (p.match(not_number)) {
      p = p.replace(not_number, '')
    }
  }
  return p
}

const bufferToString = buff => {
  let encoding=ced(buff)
  if (encoding=='ASCII-7-bit') {
    encoding='UTF-8'
  }
  let text = buff.toString(encoding)
  // For MAC files
  text = stripBom(text)
  return text
}

const ILLEGAL_REGEX = /(O|0|\+33)[O\d \.,-]+\d|\S+@\S+|@\S+/

const hideIllegal = text => {
  if (text) {
    while (text.match(ILLEGAL_REGEX)) {
      text = text.replace(ILLEGAL_REGEX, '[Masqué]')
    }
  }
  return text
}

const formatAddress = addr => {
  if (!addr) {
    return null
  }
  return `${addr.address}, ${addr.city} ${addr.zip_code}`
}

const compact = string => {
  const result = string.replace(/ /g, '')
  return result
}

const to_siren = siretOrSiret => {
  siretOrSiret = compact(siretOrSiret)
  if (siretOrSiret.length==SIREN_LENGTH) {
    return siretOrSiret
  }
  if (siretOrSiret.length==SIRET_LENGTH) {
    return siretOrSiret.slice(0, 9)
  }
  return ''
}

const compute_vat_number = siren => {
  if (!siren) {
    return ''
  }
  const siren_formatted = to_siren(siren)
  const siren_compact = compact(siren_formatted.toString())
  if (siren_compact.length!=9) {
    return ''
  }
  const siren_int = parseInt(`${siren_compact}12`)
  if (isNaN(siren_int)) {
    return ''
  }
  const siren_modulo = siren_int%97
  const result = `FR${siren_modulo.toString().padStart(2, '0')}${siren_compact}`
  return result
}

const isSiretSirenLength = value => {
  if (!value) {
    return false
  }
  value=parseInt(compact(value))
  if (isNaN(value)) {
    return false
  }
  const lengthOk =[SIRET_LENGTH, SIREN_LENGTH].includes(value.toString().length)
  return lengthOk
}

const insensitiveComparator = (a, b) => {
  return (a||'').localeCompare(b, 'fr')
}

const getWordAt = (text, position) => {
  const patBefore=/\w*$/
  const patAfter=/^\w*/
  const before=text.substring(0, position)
  const after=text.substring(position)
  const matchBefore=before.match(patBefore)[0]
  const matchAfter=after.match(patAfter)[0]
  const start=position-matchBefore.length
  const end=position+matchAfter.length
  const length=end-start
  return {start: start, end: end, word: matchBefore+matchAfter}
}

const computeBookingReference = (user, alfred) => {
  let reference = `${user.avatar_letters}${alfred.avatar_letters }_${ moment().format('DDMMYYYY')}`
  return reference
}

const capitalize = text => {
  return text ? text[0].toUpperCase()+text.slice(1).toLowerCase() : text
}

const guessDelimiter = text => {
  const delimiter=csv_string.detect(text.toString())
  return delimiter
}

const formatPercent = value => {
  if (!value) { return null }
  return `${parseInt(value*100)}%`
}

const formatDeadline = dl => {
  if (!dl) {
    return dl
  }
  return dl.replace('jours', 'jour(s)').replace('semaines', 'semaine(s)').replace('heures', 'heure(s)')
}

const splitRemaining = (pattern, delimiter) => {
  if (lodash.isEmpty(pattern)) {
    return string
  }
  const [first, ...rest]=pattern.split(delimiter)
  return [first, rest.join(delimiter)]
}

const formatDateTime = datetime => {
  return moment(datetime).format(`[le] DD/MM/YY [à] HH:mm`)
}

module.exports = {
  normalize,
  matches,
  formatIban,
  maskIban,
  createRegExpOR,
  createRegExpAND,
  frenchFormat,
  normalizePhone,
  bufferToString,
  hideIllegal,
  formatAddress,
  compact,
  compute_vat_number,
  isSiretSirenLength,
  insensitiveComparator,
  computeBookingReference,
  capitalize,
  getWordAt,
  guessDelimiter,
  formatPercent,
  formatDeadline,
  splitRemaining,
  formatDateTime,
}
