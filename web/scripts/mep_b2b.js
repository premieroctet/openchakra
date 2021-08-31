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
  })
}

console.log(connectionPool)
setTimeout(mep_b2b, 2000)
