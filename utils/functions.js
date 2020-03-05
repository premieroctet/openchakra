import getDistance from "geolib/es/getDistance";
import convertDistance from "geolib/es/convertDistance";
const isEmpty = require('../server/validation/is-empty');

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
    ).toFixed(2);
  }
  catch (error) {
    console.log("Error:"+error);
    return null;
  }
}

export {computeDistanceKm};
