
const normalize = str => {
  return str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

const createRegexps = str => {
  str = normalize(str).split(' ')
  const regexps = str.map( s => new RegExp(s, "i"))
  return regexps
}

const createQuery = str => {
  const regexps = createRegexps(str)
  var criterions=[]
  regexps.forEach( r => {
    criterions.push({'s_label' : { $regex : r}})
  })
  const query={ $or : criterions }
  return query
}

const matches = (str, keywords) => {
  const regexps = createRegexps(keywords)
  const ok = regexps.some ( r => str.match(r) )
  return ok
}

const formatIban = iban => {
  const result = iban.split('').map( (l, idx) => (idx+1)%4==0 ? l+" " : l).join('')
  return result
}

const maskIban = iban => {
  const len=iban.length
  const masked = iban.slice(0, 4)+"X".repeat(len-8)+iban.slice(-4)
  return masked
}


module.exports = {normalize, createQuery, matches, formatIban, maskIban, }
