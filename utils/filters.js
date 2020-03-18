const geolib = require('geolib');
const isEmpty = require('../server/validation/is-empty');

const isServiceAroundGPS = (serviceUser, coordinates) => {

  const serviceGPS = serviceUser.service_address.gps;
  if (!serviceGPS) {
    console.warn("Incorect GPS in "+serviceUser._id+":"+JSON.stringify(serviceGPS));
    return false;
  }
  else {
    const latAlfred = serviceGPS.lat;
    const lngAlfred = serviceGPS.lng;
    if (isEmpty(latAlfred) || isEmpty(lngAlfred)) {
      console.warn("Incorect GPS in "+serviceUser._id+":"+JSON.stringify(serviceGPS));
      return false;
    }
    else {
      // FIX : à vérifier
      /*const isNear = geolib.isPointWithinRadius({latitude: latUser, longitude: lngUser},{latitude:latAlfred,longitude:lngAlfred},(serviceUser.perimeter*1000));
      if(!isNear) {
      const removeIndex = service.findIndex(i => i._id == serviceUser._id);
      service.splice(removeIndex, 1);
      }*/
      var distance = geolib.convertDistance( geolib.getDistance( {latitude:coordinates.lat, longitude:coordinates.lng}, {latitude:latAlfred, longitude: lngAlfred}), 'km').toFixed(2);
      return distance < serviceUser.perimeter;
    }
  }
}

isServiceAtAlfredOrVisio = su => {
  // FIX : test only
  return false;
  // FIX : end
  return su.location.alfred || su.location.visio;
}

const filterServicesGPS = (serviceUsers, coordinates) => {
  return serviceUsers.filter( su => isServiceAtAlfredOrVisio(su) || isServiceAroundGPS(su, coordinates) );
}

module.exports = { filterServicesGPS };
