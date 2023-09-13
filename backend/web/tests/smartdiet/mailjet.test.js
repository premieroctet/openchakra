const {forceDataModelSmartdiet}=require('../utils')
forceDataModelSmartdiet()
const {sendNotification} = require('../../server/utils/mailing')
const mailjetProvider=require('../../server/utils/mailjet')

describe('Mailjet', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it.skip('must send notification', async() => {
    await sendNotification({
      notification: 4982108,
      destinee: {email: 'hello@wappizy.com'},
      params: {
        firstname: 'hello !!',
        FIRSTNAME: 'HELLO !!',
        CODEENTREPRISE: 'Wappizy',
      },
    })
  })

  it('must get contacts lists', () => {
    return mailjetProvider.getContactLists()
      .then(res => console.log(res))
  })

  it('must get campaigns', () => {
    return mailjetProvider.getCampaigns()
      .then(res => console.log(res))
  })

})
