db.bookings.find({}).forEach(function (b){
  if (b.service.constructor.name=='ObjectId') {
    return
  }
  if (b.service.match(/[A-Z]|[g-z]/)) {
    print(`${b._id} ${b.service} label`)
    let s=db.services.findOne({label: b.service})
    if (s) {
      b.service=s._id
      db.bookings.save(b)
    }
    else {
      print(`${b._id} ${b.service} service introuvable`)
    }
  }
  else if (b.service.match(/^[0-9a-fA-F]{24}$/)) {
    print(`${b._id} ${b.service} matches ObjectId format`)
    try {
      b.service=new ObjectId(b.service)
      db.bookings.save(b)
    }
    catch(err) {
      print(`Invalid service string:${b.service}`)
    }
  }
})
