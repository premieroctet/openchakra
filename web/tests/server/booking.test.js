import mongoose from 'mongoose'
import PaymentBase from '../../server/plugins/payment/paymentBase'
import {BadRequestError, NotFoundError} from '../../server/utils/errors'
import User from '../../server/models/User'
import {getDatabaseUri} from '../../config/config'
import {MONGOOSE_OPTIONS} from '../../server/utils/database'
import {createBooking} from '../../server/utils/booking'
import validateBooking from '../../server/validation/booking'

describe('Booking creation', () => {

  const BOOKING_DATA={
    // customerBooking: '6230ea891bc383400b84ab38',
    serviceUserId: '62bb1f3b19a2abc3093f18c8',
    prestations: {'62cbeaec4771c308a50139c7': 1},
    location: 'elearning',
    cpf: true,
    date: '2022-07-13T22:00:00.000Z',
    userId: '5e16f578b9a2462bc340c64e',
  }

  beforeAll(() => {
    return mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
  })

  afterAll(() => {
  })

  test('Validate booking', () => {
    expect(validateBooking(BOOKING_DATA)).resolves.not.toThrowError()
    // Bad service id
    const badServiceId={...BOOKING_DATA, serviceUserId: '616fc555b74e117a496eca99'}
    expect(validateBooking(badServiceId)).rejects.toThrow(NotFoundError)
    // Bad date
    const badDate={...BOOKING_DATA, date: '2022-07-05T22:00:00.000Z'}
    expect(validateBooking(badDate)).rejects.toThrow(BadRequestError)
    // Bad location
    const badLocation={...BOOKING_DATA, location: 'visio'}
    expect(validateBooking(badLocation)).rejects.toThrow(BadRequestError)
    // Bad customerBooking prestations
    const badCustomerBooking={...BOOKING_DATA, customerBookingId: '6230ea891bc383400b84ab38'}
    expect(validateBooking(badCustomerBooking)).rejects.toThrow(NotFoundError)
    // Bad prestations
    const badPrestations={...BOOKING_DATA, prestations: {'616fc555b74e117a496eca519': 1}}
    return expect(validateBooking(badPrestations)).rejects.toThrow(NotFoundError)
  })

  test('Create basic booking', () => {
    return User.findById(BOOKING_DATA.userId)
      .then(user => {
        return createBooking({...BOOKING_DATA, customer: user})
          .then(book => {
            expect(book.amount).toBe(0)
            expect(book.prestations).toHaveLength(1)
            expect(book.customer_fee).toBe(0)
            expect(book.provider_fee).toBe(0)
            expect(book.travel_tax).toBe(0)
          })
      })
  })
})
