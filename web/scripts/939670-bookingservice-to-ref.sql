db.bookings.find({}).forEach(function (b){
  if (b.service.constructor.name=='ObjectId') {
    return
  }
  if (b.service.match(/[A-Z]|[g-z]/)) {
    print(`${b._id} matches ${b.service}`)
    db.services.find({label: b.service})
      .forEach(function (s){
        b.service=s._id
        db.bookings.save(b)
      })
  }
  else {
    print(`${b._id} matches ObjectId format ${b.service}`)
    b.service=new ObjectId(b.service)
    db.bookings.save(b)
  }
})
