const {getKeys}=require('./utils/i18n_extraction')

const keys=getKeys()
keys.sort()

keys.forEach(k => {
  const pref=keys.filter(k2 => k.includes(k2) && k2!=k)
  if (pref.length>0) {
    console.log(`Prefixes de ${k}:${pref}`)
  }
})
console.log('Test préfixes dans i18n')
