const {SIB, CONFIRM_EMAIL, SHOP_DELETED}=require('./sendInBlue');

const {computeUrl } = require('../config/config');

const sendVerificationMail = (user, req) => {
  SIB.sendMail(
    CONFIRM_EMAIL,
    user.email,
    {
      link_confirmemail:new URL('/validateAccount?user='+user._id, computeUrl(req)),
      user_firstname: user.firstname,
    }
  )
}

const sendShopDeleted = (user, req) => {
  SIB.sendMail(
    SHOP_DELETED,
    user.email,
    {
      user_firstname: user.firstname,
    }
  )
}

module.exports={sendVerificationMail, sendShopDeleted}
