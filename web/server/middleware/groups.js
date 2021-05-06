const {MANAGER, MICROSERVICE_MODE, CARETAKER_MODE}=require('../../utils/consts')

const get_group = (user_id, role) => {
  return Group.findOne( { members: user_id, type: role==MANAGER ? MICROSERVICE_MODE : CARETAKER_MODE})
}

const get_budget(user_id, role) => {
  return new Promise( (res, rej) => {
    if (role==ADMIN || !role)
      return resolve(Number.MAX_SAFE_INTEGER)
    ])
    get_group(user_id, role)
      .then( group => {
        if (!group) {
          return rej(`No group for user ${user_id}, role ${role}`)
        }
        if (! (group.budget && group.budget_period) {
          return rej(`No budget or budget period : ${JSON.stringify(group)}`)
        }
        return group.budget
      })
  })
}

const get_paid_bookings(user_id, role) => {
  get_group(user_id, role)
    .then( group => {
      const user_predicate = role==MANAGER ? { $in : group.members} : user_id
      return Booking.find({
        user: user_predicate,
        date : {$gt: start_date},
        user_role : role,
        status : { $nin : [BOOK_STATUS.REFUSED, BOOK_STATUS.CANCELED, BOOK_STATUS.EXPIRED, BOOK_STATUS.INFO, BOOK_STATUS.PREAPPROVED]}
      })
    })
}
