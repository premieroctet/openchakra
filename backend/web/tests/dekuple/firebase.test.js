const {forceDataModelDekuple}=require('../utils')
const moment=require('moment')
forceDataModelDekuple()

const {sendUserNotification, sendAppNotification}=require('../../server/utils/firebase')

describe('Test firebase', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must send user notification', async() => {
    const user_id=`63e4ef709a5bc677cf11a0d6`
    const message=`${moment().format('HH:mm:ss')}=>${user_id}`
    return sendUserNotification({user:{_id: user_id}}, title: 'Dekuple test', message})
  })

  it('must send application notification', async() => {
    const message=`${moment().format('HH:mm:ss')}=>all`
    return sendAppNotification({title: 'Dekuple test braodcast', message})
  })

})
