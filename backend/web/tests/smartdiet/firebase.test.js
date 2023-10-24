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
    const user_id=`65089ca2b74fb64fcd2d8099`
    const message=`Notification du ${moment().format('HH:mm:ss')} pour ${user_id}`
    return sendUserNotification({user:{_id: user_id}}, title: 'Smartdiet test', message})
  })

  it.skip('must send application notification', async() => {
    const message=`${moment().format('HH:mm:ss')}=>all`
    return sendAppNotification({title: 'Smartdiet test broadcast', message})
  })

})
