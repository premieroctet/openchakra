
const normalize = str => {
  return str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

const createRegexps = str => {
  str = normalize(str).split(' ')
  const regexps = str.map( s => new RegExp(s, "i"))
  console.log(`Created regexps:${regexps}`)
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

module.exports = {normalize, createQuery, matches}
