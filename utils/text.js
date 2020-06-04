const ARTICLES="le la les un une de des d l à".split(/ /g)

const normalize = str => {
  const normalized = str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  return normalized
}

const createRegExps = str => {
  str = normalize(str).split(/ |'/g)
  // Remove articles
  str = str.filter( s => !ARTICLES.includes(s))
  const regexps = str.map( s => new RegExp(s, "i"))
  return regexps
}

const createQuery = str => {
  const regexps = createRegExps(str)
  var criterions=[]
  regexps.forEach( r => {
    criterions.push({'s_label' : { $regex : r}})
  })
  const query={ $or : criterions }
  return query
}

const matches = (str, keywords) => {
  const regexps = createRegExps(keywords)
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

module.exports = {normalize, createQuery, matches, formatIban, maskIban, createRegExps}
