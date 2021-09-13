const i18n = require('./i18n')

const getIdentifiersInner = (prefix, data) => {
  if (typeof data=='string') {
    return {[prefix]: data}
  }
  if (['object'].includes(typeof data)) {
    return Object.keys(data).map(k => getIdentifiersInner(`${prefix}${prefix ? '.' :''}${k}`, data[k]))
  }
}

const getQueries = () => {
  const ids=getIdentifiersInner('', i18n).flat(6)
  const queries=ids.filter(i => i).map(obj => {
    let [k, v]=Object.entries(obj)[0]
    const compName=k.split('.')[0]
    v=v.replace(/['’]/g, "\\'")
    return `db.uiconfigurations.update(
      {page: 'textes', component: '${compName}', label: '${v}'},
      {$set : {classname: '${k}', type:'content', attributes: [{name:'content', value: '${v}'}]}},
      {upsert: true})`
  })
  return queries
}

const getIdentifiers = () => {
  return getIdentifiersInner('', i18n).flat(6).map(o => o && Object.entries(o).map(i => i.join('=')))
}

const getKeys = () => {
  const ids=getIdentifiersInner('', i18n).flat(6).filter(i => i)
  const keys=ids.map(id => Object.keys(id)[0])
  keys.sort()
  return keys
}

module.exports= {getIdentifiers, getQueries, getKeys}
