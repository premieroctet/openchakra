const MAPPING={
  'Télésurveillance, alarme': 'Télésurveillance, alarme AvoCotés',
  'Cours & apprentissage langues': 'Cours de langues',
  'Entretien jardin & potager': 'Entretien jardin & potager, jardinage',
  "Garde d'enfant": "Garde d'enfant - Baby-sitting"
}

db.bookings.find({}).forEach(function (b){
  if (b.service.constructor.name=='ObjectId') {
    // Is already a ref
    return
  }

  if (b.service.match(/^[0-9a-fA-F]{24}$/)) {
    print(`${b._id} ${b.service} matches ObjectId format`)
    try {
      b.service=new ObjectId(b.service)
      db.bookings.save(b)
    }
    catch(err) {
      print(`Invalid service string:${b.service}`)
    }
    return
  }

  // Test by service name
  let s=db.services.findOne({label: b.service})
  if (s) {
    b.service=s._id
    db.bookings.save(b)
    print(`Found service ${s.label}`)
    return
  }

  let mapped=false
  for (let key in MAPPING) {
    const value=MAPPING[key]
    if (b.service==key) {
      print(`Matched ${key}, searching for ${value}`)
      mapped=true
      let s=db.services.findOne({label: value})
      if (s) {
        b.service=s._id
        db.bookings.save(b)
        print(`Replaced ${key} with ${value}`)
      }
      else {
        print(`${b._id} ${b.service} service introuvable`)
      }
    }
  }
})
