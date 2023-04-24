const {forceDataModelFumoir}=require('../utils')
const moment=require('moment')
forceDataModelFumoir()

const {sendNotification}=require('../../server/utils/firebase')

describe('Test firebase', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must send notification', async() => {
    const test_number=''
    const user_id=`640b60e4487fd042c3084a82${test_number}`
    const message=`${moment().format('HH:mm:ss')}/${user_id}`
    console.log(`Sending ${message}`)
    return sendNotification(user_id, message)
  })

})
