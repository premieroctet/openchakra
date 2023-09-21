const {forceDataModelSmartdiet}=require('../utils')
forceDataModelSmartdiet()
const {sendNotification} = require('../../server/utils/mailing')
const mailjetProvider=require('../../server/utils/mailjet')

describe('Mailjet', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  const CONTACTS_LIST_NAME='Liste test workflow appli'

  it('must send notification', async() => {
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
    console.log(JSON.stringify(lists, null, 2))
    expect(lists.length).toBeGreaterThan(0)
  })

  it('must add user to a contacts list', () => {
    return mailjetProvider.getContactsLists()
      .then(res => res.find(r => r.Name==CONTACTS_LIST_NAME))
      .then(list => {
        console.log(`Got list ${JSON.stringify(list)}`)
        return mailjetProvider.addContactToList({
          fullname: 'test user', email: 'hello@wappizy.com', list: list.ID,
        })
        .then(console.log)
      })
  })

  it('must add then remove a user to a contacts list', () => {
    return mailjetProvider.getContactsLists()
      .then(res => res.find(r => r.Name==CONTACTS_LIST_NAME))
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
