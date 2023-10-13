const {forceDataModelSmartdiet}=require('../utils')
const moment=require('moment')
forceDataModelSmartdiet()

const {sendUserNotification, sendAppNotification}=require('../../server/utils/firebase')

describe('Test firebase', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must send user notification', async() => {
    const user_id=`6501b78e90eb0d7f52d35a65`
    const message=`${moment().format('HH:mm:ss')}=>${user_id}`
    return sendUserNotification(user_id, message)
  })

  it('must send application notification', async() => {
    const message=`${moment().format('HH:mm:ss')}=>all`
    return sendAppNotification(message)
  })

})
