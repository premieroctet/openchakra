import getDistance from "geolib/es/getDistance";
import convertDistance from "geolib/es/convertDistance";
const isEmpty = require('../server/validation/is-empty');
const moment=require('moment');

const computeDistanceKm = (latlon1, latlon2) => {
  if (isEmpty(latlon1) || isEmpty(latlon2)) { return null; }
  if (isEmpty(latlon1.lat) || isEmpty(latlon1.lng)) { return null; }
  if (isEmpty(latlon2.lat) || isEmpty(latlon2.lng)) { return null; }
  try {
    return convertDistance(
      getDistance(
        {latitude:latlon1.lat,longitude:latlon1.lng},
        {latitude:latlon2.lat, longitude: latlon2.lng}
      ),
      "km"
    ).toFixed(0);
  }
  catch (error) {
    console.log("Error:"+error);
    return null;
  }
}

const computeBookingReference = (user, alfred) => {
  var reference = user.avatar_letters+alfred.avatar_letters+ "_"+moment().format('DDMMYYYY');
  return reference;
}

module.exports={computeDistanceKm, computeBookingReference};
