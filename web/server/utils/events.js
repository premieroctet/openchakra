const EventLog = require('../models/EventLog')
const User = require('../models/User')

const logEvent = (req, category, title, description, data=null) => {
  console.log('Loggin event')
  user = req.user
  superuserid=req.context.getLoggedAs()
  let event= {
    category: category,
    account: {user: user._id, full_name: user.full_name, email: user.email},
    title: title,
    description: description,
    data: data,
  }
  const promise = superuserid ?  User.findOne({_id: superuserid}, 'firstname name email') : Promise.resolve(null)
  promise
    .then(superuser => {
      if (superuserid) {
        if (!superuser) {
          return console.error(`Create event ${JSON.stringify()}: superuser ${superuserid} not found `)
        }
        event.super_account={user: superuser._id, full_name: superuser.full_name, email: superuser.email}
      }
      EventLog.create(event)
        .then(ev => console.log(`Event ${JSON.stringify(ev)}`))
        .catch(err => console.error(`Error on event ${JSON.stringify(event)}:${err}`))
    })
    .catch(err => {
      console.error(`Create event: user ${superuserid} not found : ${err}`)
    })
}

module.exports={logEvent}
