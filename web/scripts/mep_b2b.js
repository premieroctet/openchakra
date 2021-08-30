const {connectionPool}=require('../server/utils/database')
const {serverContextFromPartner}=require('../server/utils/serverContext')

// MAJ serviceUsers correspondant à 932556 : affiner frais de déplacement
const mep_b2b = () => {
  console.log(connectionPool.databases)
  connectionPool.databases.map(d => serverContextFromPartner(d)).forEach(context => {
    console.log(`MEP updating database ${context.getDbName()}`)
    const ServiceUser=context.getModel('ServiceUser')
    ServiceUser.find({travel_tax: {$ne: null}}, 'travel_tax')
      .then(results => {
        results.forEach(r => {
          if (!r._doc.travel_tax || typeof r._doc.travel_tax == 'number') {
            r.travel_tax={rate: r._doc.travel_tax || 0, from: 0}
            r.save()
            console.log('Saved')
          }
          else {
            console.log('Did not save')
          }
        })
      })
  })
}

console.log(connectionPool)
setTimeout(mep_b2b, 2000)
