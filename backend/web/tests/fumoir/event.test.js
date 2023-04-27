const {
  inviteGuest,
  registerToEvent,
  unregisterFromEvent
} = require('../../server/plugins/fumoir/functions')
const mongoose = require('mongoose')
const moment=require('moment')
const {forceDataModelFumoir}=require('../utils')

forceDataModelFumoir()
require('../../server/models/User')
const Event = require('../../server/models/Event')
const Invitation = require('../../server/models/Invitation')
const User = require('../../server/models/User')
const Guest = require('../../server/models/Guest')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')
const { FUMOIR_MEMBER } = require('../../server/plugins/fumoir/consts')

jest.setTimeout(20000)

describe('Test on events', () => {

  let member=null
  let event=null

  beforeAll(async() => {
    //return mongoose.connect(`mongodb://localhost/test${moment().unix()}`, MONGOOSE_OPTIONS)
    await mongoose.connect(`mongodb://localhost/test-fumoir`, MONGOOSE_OPTIONS)
    await User.remove({})
    await Invitation.remove({})
    await Guest.remove({})
    await Event.remove({})
    member=await User.create({
        email: 'test@test.com', password:'pass',role: FUMOIR_MEMBER, subscription_price:100,
        subscription_start:moment(), subscription_end:moment(), firstname:'f',lastname:'l'})
    event=await Event.create({max_people:40, max_guests_per_member:1})
  })

  afterAll(async() => {
    /**
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    */
  })

  it('Should register to event', async() => {
    await registerToEvent({event: event._id, user: member})
    const newEv=await Event.findOne().populate({path: 'invitations', populate:'member guest'})
    expect(newEv.invitations).toHaveLength(1)
    const invitCount=await Invitation.countDocuments()
    expect(invitCount).toEqual(1)
    let invit=await Invitation.findOne().populate('member guest')
    expect(invit.member._id.toString()).toEqual(member._id.toString())
    expect(invit.guest).toBeFalsy()
    // Invite a guest
    await inviteGuest({eventOrBooking: event._id, email:'a@a.com', phone:null}, member)
    invit=await Invitation.findOne().populate('member guest')
    expect(invit.member._id.toString()).toEqual(member._id.toString())
    expect(invit.guest).toBeTruthy()
    // Unregister from event
    await unregisterFromEvent({event: event._id, user: member})
    const ev=await Event.findOne().populate('invitations')
    expect(ev.invitations).toHaveLength(0)
    const guests_count=await Guest.countDocuments()
    expect(guests_count).toBe(0)
  })


})
