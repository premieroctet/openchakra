const mongoose = require('mongoose')
const User = require('../../server/models/User')
const Reminder = require('../../server/models/Reminder')
const {MONGOOSE_OPTIONS} = require('../../server/utils/database')

describe('Test virtual single ref', () => {

  beforeAll(() => {
    return mongoose.connect('mongodb://localhost/test', MONGOOSE_OPTIONS)
      .then(() => mongoose.connection.dropDatabase())
  })

  it('reminder days must be unique', async() => {
    const [user]=await User.create(
      [{email: 'test@a.com', firstname: 'A', birthday: Date.now(), lastname: 'S', withings_id: 12}],
      {runValidators: true},
    )

    const reminders=await Reminder.create(
      [{type: 'Médecin', time: Date.now(), user}],
      {runValidators: true})
    console.log(reminders)
  })
})
