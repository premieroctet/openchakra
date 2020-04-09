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

const computeAverageNotes = notes => {
  console.log("Compute note:"+JSON.stringify(notes));
  var res={}
  if (isEmpty(notes)) {
    return res;
  }
  Object.keys(notes[0]).forEach( k => {
    const value=notes.reduce ((prev, next) => prev+next[k], 0)/notes.length;
    res[k]=value;
  })
  console.log("Returning:"+JSON.stringify(res));
  return res;
}

module.exports={computeDistanceKm, computeBookingReference, computeAverageNotes};
