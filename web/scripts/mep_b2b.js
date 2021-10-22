const {normalize}=require('../utils/text')
const {connectionPool}=require('../server/utils/database')
const {serverContextFromPartner}=require('../server/utils/serverContext')

// MAJ serviceUsers correspondant à 932556 : affiner frais de déplacement
// Suppression des frais de déplacement si travel_tax type null/undefined/number
const mep_b2b = () => {
  console.log(connectionPool.databases)
  connectionPool.databases.map(d => serverContextFromPartner(d)).forEach(context => {
    console.log(`MEP updating database ${context.getDbName()}`)
    const ServiceUser=context.getModel('ServiceUser')
    ServiceUser.find({}, 'travel_tax')
      .then(results => {
        results.forEach(r => {
          if (['undefined', 'number'].includes(typeof r._doc.travel_tax)) {
            const org=r._doc.travel_tax
            r.travel_tax= null
            r.save()
            console.log(`Update serviceUser #${r._id} travel_tax:${org}=>${r.travel_tax}`)
          }
          else {
            console.log(`Did not update serviceUser #${r._id} travel_tax:${r.travel_tax}`)
          }
        })
      })
    const Service=context.getModel('Service')
    Service.find({})
      .then(services => {
        services.forEach(s => {
          console.log(JSON.stringify(s, null, 2))
          s.travel_tax = undefined
          s.s_label = normalize(s.label)
          console.log(JSON.stringify(s, null, 2))
          s.save()
        })
        console.log('Service.travel_tax supprimé')
      })
      .catch(err => console.error(`Service.travel_tax suppression:${err}`))
  })
}

console.log(connectionPool)
setTimeout(mep_b2b, 2000)
