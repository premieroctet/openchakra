const {forceDataModelSmartdiet, buildAttributesException}=require('../utils')
forceDataModelSmartdiet()
const { sendNotification } = require('../../server/utils/mailing')

describe('Mailjet', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must send notification', async() => {
    await sendNotification({
      notification:4982108,
      destinee: {email: 'hello@wappizy.com'},
      params: {
        firstname: 'hello !!',
        FIRSTNAME: 'HELLO !!',
        CODEENTREPRISE: 'Wappizy'
      },
    })
  })

})
