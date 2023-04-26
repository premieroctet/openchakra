const {forceDataModelFumoir}=require('../utils')
const moment=require('moment')
forceDataModelFumoir()

const {sendUserNotification, sendAppNotification}=require('../../server/utils/firebase')

describe('Test firebase', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must send user notification', async() => {
    const user_id=`640b60e4487fd042c3084a82`
    const message=`${moment().format('HH:mm:ss')}=>${user_id}`
    console.log(`Sending user ${message}`)
    return sendUserNotification(user_id, message)
  })

  it('must send application notification', async() => {
    const message=`${moment().format('HH:mm:ss')}=>all`
    console.log(`Sending user ${message}`)
    return sendAppNotification(message)
  })

})
