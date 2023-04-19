const {forceDataModelFumoir}=require('../utils')
forceDataModelFumoir()

const {sendNotification}=require('../../server/utils/firebase')

describe('Test firebase', () => {

  beforeAll(async() => {
  })

  afterAll(async() => {
  })

  it('must send notification', async() => {
    return sendNotification('640b60e4487fd042c3084a82', 'Salut la team!!')
  })

})
