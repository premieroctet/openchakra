const { isPhoneOk } = require('../../../utils/sms')

describe('Stripe tests', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  const NUMBERS=[
    ['0675774324', true], ['0775774324', true], ['06 75 77 43 24', true],
    ['+336 75 77 4 3 24', true], ['0875774324', false], ['+33875774324', false],
    ['0235736009', false]
  ]

  test.each(NUMBERS) (
    "%p must be valid:%p",
    ((number, expected) => {
      expect(isPhoneOk(number)).toEqual(expected)
    })
  )

})
