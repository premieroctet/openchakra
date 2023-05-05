const { sendNotification, setSmsContents } = require('../../utils/mailing')

const SIB_IDS={
  WELCOME_MEMBER: 5,
  FORGOT_PASSWORD: 7,
}

const SMS_CONTENTS={
}

setSmsContents(SMS_CONTENTS)

// #1
const sendWelcomeRegister = ({user}) => {
  return sendNotification({
    notification: SIB_IDS.WELCOME_MEMBER,
    destinee: user,
    params: {
      fullname: user.fullname,
    },
  })
}

// #2
const sendForgotPassword = ({user, password}) => {
  return sendNotification({
    notification: SIB_IDS.FORGOT_PASSWORD,
    destinee: user,
    params: {
      fullname: user.fullname,
      login: user.email,
      password: password,
    },
  })
}

module.exports = {
  sendWelcomeRegister,
  sendForgotPassword,
}
