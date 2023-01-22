const https = require('https')
const axios=require('axios')
const {API_PATH}=require('../../utils/consts')
const {login}=require('../utils')
const {sendELearningAccess}=require('../../server/utils/mailing')

https.globalAgent.options.rejectUnauthorized = false

describe('Send mails', () => {

  // TODO Function sendELearningAccess disappeared ? Skip for now
  test.skip('Send course access', () => {
    return sendELearningAccess({
      email: 'sebastien.auvray@my-alfred.io',
      firstname: 'Sébastien',
      login: 'login',
      password: 'password',
      date: '01/01/2024',
      label: 'Permis poids lourds',
      elearning_link: 'https://moodle.org/login/index.php',
    })
  })

  // TODO Server should be running, no way!
  test.skip('Post course access', () => {
    const bookingId='62e138f36dd1880d48340a34'
    return login('sebastien.auvray@my-alfred.io')
      .then(() => {
        return axios.post(`https://localhost${API_PATH}/booking/${bookingId}/send-course-access`)
      })
      .then(res => {
        return expect(res.status).toBe(200)
      })
  })

})
