const {SIB}=require('./sendInBlue');

const {computeUrl } = require('../config/config');
const {booking_datetime_str} = require('./dateutils');
var fs = require('fs');

// Templates

/**
10  VERS ALFRED == Un virement vous a été envoyé
11  VERS ALFRED == Laissez un commentaire
12  VERS USER == Laissez un commentaire à votre Alfred
17  VERS ALFRED == pré Réservation refusée ??? Idem annnulée (18)
21  VERS ALFRED == N'oubliez pas de mettre à jour vos disponibilités 🗓
*/

// FIX 4, 17, 18
const NEW_BOOKING_MANUAL=4;
const CONFIRM_EMAIL=5;
const ASKING_INFO=6;
const NEW_MESSAGE_ALFRED=7;
const BOOKING_CANCELLED_BY_CLIENT=8;
const NEW_MESSAGE_CLIENT=13;
const BOOKING_CANCELLED_BY_ALFRED=14;
const SHOP_DELETED=15;
const ASKINFO_PREAPPROVED=16;
const BOOKING_REFUSED_2_ALFRED=17;
const BOOKING_REFUSED_2_CLIENT=18; // OK
const BOOKING_CONFIRMED=19;
const SHOP_ONLINE=20; // OK
const RESET_PASSWORD=22;
const NEW_BOOKING=23;
const BOOKING_INFOS=24;
const BOOKING_DETAILS=26;
const BOOKING_EXPIRED_2_CLIENT=30;
const BOOKING_EXPIRED_2_ALFRED=31;

const getHost = () => {
  try {
    var data = fs.readFileSync('host.txt', 'utf8');
    return data;
  }
  catch (err) {
      console.error(err);
      return null;
  }
}

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
     service_datetime: booking_datetime_str(booking),
     total_cost: parseFloat(booking.amount).toFixed(2),
   }
 )
}

const sendBookingCancelledByAlfred = (booking, req) => {
 SIB.sendMail(
   BOOKING_CANCELLED_BY_ALFRED,
   booking.user.email,
   {
     client_firstname: booking.user.firstname,
     alfred_firstname: booking.alfred.firstname,
     service_label: booking.service,
     service_datetime: booking_datetime_str(booking),
     link_findnewalfred : new URL('/search', computeUrl(req)),

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
     service_datetime: booking_datetime_str(booking),
   }
 )
}

const sendResetPassword = (user, token, req) => {
  SIB.sendMail(
    RESET_PASSWORD,
    user.email,
    {
      user_firstname: user.firstname,
      link_initiatenewpassword: new URL('/resetPassword?token='+token, computeUrl(req)),
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
      service_datetime: booking_datetime_str(booking),
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
      service_datetime: booking_datetime_str(booking),
      link_booknewalfred: new URL('/search', getHost()),
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
       service_datetime: booking_datetime_str(booking),
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
       service_datetime: booking_datetime_str(booking),
       total_cost: parseFloat(booking.amount).toFixed(2),
     }
   )
}

const sendNewBooking = (booking, req) => {
   SIB.sendMail(
     NEW_BOOKING,
     booking.alfred.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: booking_datetime_str(booking),
       total_revenue: parseFloat(booking.amount-booking.fees).toFixed(2),
       link_showreservation: new URL('/reservations/detailsReservation?id='+booking._id, computeUrl(req)),

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

const sendBookingRefusedToClient = (booking, req) => {
   SIB.sendMail(
     BOOKING_REFUSED_2_CLIENT,
     booking.user.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: booking_datetime_str(booking),
       link_booknewalfred: new URL('/search', computeUrl(req)),
     }
   )
}

const sendBookingRefusedToAlfred = (booking, req) => {
   SIB.sendMail(
     BOOKING_REFUSED_2_ALFRED,
     booking.alfred.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: booking_datetime_str(booking),
     }
   )
}

const sendAskingInfo = (booking, req) => {
   SIB.sendMail(
     ASKING_INFO,
     booking.alfred.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: booking_datetime_str(booking),
       total_revenue: parseFloat(booking.amount-booking.fees).toFixed(2),
       link_requestinformation: new URL('/reservations/detailsReservation?id='+booking._id, computeUrl(req)),
     }
   )
}

const sendNewMessageToAlfred = (booking, chatroom_id, req) => {
  const url=new URL(`/reservations/messagesDetails?id=${chatroom_id}&booking=${booking._id}`, computeUrl(req));
   SIB.sendMail(
     NEW_MESSAGE_ALFRED,
     booking.alfred.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       link_showclientmessage: url,
     }
   )
}

const sendNewMessageToClient = (booking, chatroom_id, req) => {
  const url=new URL(`/reservations/messagesDetails?id=${chatroom_id}&booking=${booking._id}`, computeUrl(req));
   SIB.sendMail(
     NEW_MESSAGE_CLIENT,
     booking.user.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       link_showalfredmessage: url,
     }
   )
}

const sendAskInfoPreapproved = (booking, req) => {
   SIB.sendMail(
     ASKINFO_PREAPPROVED,
     booking.user.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       link_confirmbooking: new URL('/reservations/detailsReservation?id='+booking._id, computeUrl(req)),
     }
   )
}

const sendNewBookingManual = (booking, req) => {
   SIB.sendMail(
     NEW_BOOKING_MANUAL,
     booking.alfred.email,
     {
       client_firstname: booking.user.firstname,
       alfred_firstname: booking.alfred.firstname,
       service_label: booking.service,
       service_datetime: booking_datetime_str(booking),
       total_revenue: parseFloat(booking.amount-booking.fees).toFixed(2),
       link_confirmbooking: new URL('/reservations/detailsReservation?id='+booking._id, computeUrl(req)),

     }
   )
}

module.exports={
  sendVerificationMail, sendShopDeleted, sendBookingConfirmed, sendBookingCancelledByAlfred, sendBookingCancelledByClient,
  sendBookingExpiredToAlfred, sendBookingExpiredToClient, sendBookingDetails, sendBookingInfos, sendNewBooking,
  sendShopOnline,sendBookingRefusedToClient, sendAskingInfo, sendNewMessageToAlfred, sendNewMessageToClient,
  sendAskInfoPreapproved, sendResetPassword, sendNewBookingManual
}
