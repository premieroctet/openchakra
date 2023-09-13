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

  it('must get contacts lists', async() => {
    const lists=await mailjetProvider.getContactsLists()
    expect(lists.length).toBeGreaterThan(0)
  })

  it.only('must add then remove a user to a contacts list', () => {
    return mailjetProvider.getContactsLists()
      .then(res => res.find(r => r.Name=='SmartDiet Académie'))
      .then(list => {
        return mailjetProvider.addContactToList({
          fullname: 'test user', email: 'hello@wappizy.com', list: list.ID,
        })
          .then(() => list)
      })
      .then(list => mailjetProvider.removeContactFromList({
        email: 'hello@wappizy.com', list: list.ID,
      }),
      )
  })

})
