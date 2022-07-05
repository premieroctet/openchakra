import mongoose from 'mongoose'
import ServiceUser from '../../server/models/ServiceUser'
import User from '../../server/models/User'
import {getDatabaseUri} from '../../config/config'
import {MONGOOSE_OPTIONS} from '../../server/utils/database'
import {createBooking} from '../../server/utils/booking'
import validateBooking from '../../server/validation/booking'

describe('Booking creation', () => {

  beforeAll(() => {
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  })

  afterAll(() => {
  })

  test.only('Validate booking', () => {
    const data={
      serviceUserId: '5e652c271bee64541cfc08a0',
      prestations: {'5fa28a8b5a565501f403cea1': 1},
      location: 'main',
      date: '2022-07-12T22:00:00.000Z',
      customerBooking: '6230ea891bc383400b84ab38',
      userId: '5e16f578b9a2462bc340c64e',
    }
    expect(validateBooking(data)).resolves.not.toThrowError()
    // Bad service id
    const badServiceId={...data, serviceUserId: '616fc555b74e117a496eca99'}
    expect(validateBooking(badServiceId)).rejects.toThrow(Error)
    // Bad date
    const badDate={...data, date: '2022-07-05T22:00:00.000Z'}
    expect(validateBooking(badDate)).rejects.toThrow(Error)
    // Bad location
    const badLocation={...data, location: 'elearning'}
    expect(validateBooking(badLocation)).rejects.toThrow(Error)
    // Bad prestations
    const badPrestations={...data, prestations: {'616fc555b74e117a496eca519': 1}}
    return expect(validateBooking(badPrestations)).rejects.toThrow(Error)
  })

  test('Create basic booking', () => {
    return Promise.all([
      ServiceUser.findById('616ee895974dfc0638756acf'),
      User.findOne({email: /sebastien.auvray@my-alfred.io/}),
    ])
      .then(([serviceUser, user]) => {
        expect(serviceUser).toBeTruthy()
        expect(user).toBeTruthy()
        return createBooking({
          serviceUserId: '616ee895974dfc0638756acf',
          user: user,
          prestations: {},
        })
      })
  })
})
