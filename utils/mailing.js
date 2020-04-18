const moment=require('moment');
const {SIB}=require('./sendInBlue');

const {computeUrl } = require('../config/config');

// Templates
const CONFIRM_EMAIL=5;
const BOOKING_CANCELLED_BY_CLIENT=8;
const BOOKING_CANCELLED_BY_ALFRED=14;
const SHOP_DELETED=15;
const BOOKING_CONFIRMED=19;
const RESET_PASSWORD=22;
const BOOKING_EXPIRED_2_ALFRED=31;
const BOOKING_EXPIRED_2_CLIENT=30;
const BOOKING_DETAILS=26;
const BOOKING_INFOS=24;
const NEW_BOOKING=23;
const SHOP_ONLINE=20; // OK
const BOOKING_REFUSED=18; // OK




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

const sendBookingConfirmed = booking => {
 SIB.sendMail(
   BOOKING_CONFIRMED,
   booking.user.email,
   {
     client_firstname: booking.user.firstname,
     alfred_firstname: booking.alfred.firstname,
     service_label: booking.service,
     service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
     total_cost: parseFloat(booking.amount).toFixed(2),
   }
 )
}

const sendBookingCancelledByAlfred = booking => {
 SIB.sendMail(
   BOOKING_CANCELLED_BY_ALFRED,
   booking.user.email,
   {
     client_firstname: booking.user.firstname,
     alfred_firstname: booking.alfred.firstname,
     service_label: booking.service,
     service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
   }
 )
}

const sendBookingCancelledByClient = booking => {
 SIB.sendMail(
   BOOKING_CANCELLED_BY_CLIENT,
   booking.alfred.email,
   {
     client_firstname: booking.user.firstname,
     alfred_firstname: booking.alfred.firstname,
     service_label: booking.service,
     service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
   }
 )
}

// FIX: to implement
const sendResetPassword = (user, req) => {
  SIB.sendMail(
    RESET_PASSWORD,
    user.email,
    {
      user_firstname: user.firstname,
      link_initiatenewpassword: new URL('/validateAccount?user='+user._id, computeUrl(req)),
    }
  )
}
const sendBookingExpiredToAlfred = booking => {
  SIB.sendMail(
    BOOKING_EXPIRED_2_ALFRED,
    booking.alfred.email,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
    }
  )
}

const sendBookingExpiredToClient = booking => {
  SIB.sendMail(
    BOOKING_EXPIRED_2_CLIENT,
    booking.user.email,
    {
      client_firstname: booking.user.firstname,
      alfred_firstname: booking.alfred.firstname,
      service_label: booking.service,
      service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
    }
  )
}

const sendBookingDetails = booking => {
   SIB.sendMail(
     BOOKING_DETAILS,
     booking.user.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
       total_cost: parseFloat(booking.amount).toFixed(2),
     }
   )
}

const sendBookingInfos = booking => {
   SIB.sendMail(
     BOOKING_INFOS,
     booking.user.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
       total_cost: parseFloat(booking.amount).toFixed(2),
     }
   )
}

const sendNewBooking = booking => {
   SIB.sendMail(
     NEW_BOOKING,
     booking.alfred.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
       total_revenue: parseFloat(booking.amount-booking.fees).toFixed(2),
     }
   )
}

const sendShopOnline = (alfred, req) => {
   SIB.sendMail(
     SHOP_ONLINE,
     alfred.email,
     {
       alfred_firstname: alfred.firstname,
       link_manageshop: new URL('/shop?id_alfred='+alfred._id, computeUrl(req)),
     }
   )
}

const sendBookingRefused = (booking, req) => {
   SIB.sendMail(
     BOOKING_REFUSED,
     booking.user.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: moment(booking.time_prestation).format('DD/MM/YYYY à HH:mm'),
       link_booknewalfred: new URL('/search', computeUrl(req)),
     }
   )
}

module.exports={
  sendVerificationMail, sendShopDeleted, sendBookingConfirmed, sendBookingCancelledByAlfred, sendBookingCancelledByClient,
  sendBookingExpiredToAlfred, sendBookingExpiredToClient, sendBookingDetails, sendBookingInfos, sendNewBooking,
  sendShopOnline,sendBookingRefused
}
