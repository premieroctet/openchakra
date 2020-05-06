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
      var in_perimeter = distance < serviceUser.perimeter;
      return in_perimeter;
    }
  }
}

isServiceAtAlfredOrVisio = su => {
  return su.location.alfred || su.location.visio;
}


const sortfn = gps => {
  const sort = (su1, su2) => {
    var d1, d2;
    try {
      d1 = geolib.getDistance(gps, su1.service_address.gps);
    }
    catch (e) {
      console.warn(`Warning: GPS incorrect pour serviceUser ${su1._id}`)
      d1 = 100000;
    }
    try {
      d2 = geolib.getDistance(gps, su2.service_address.gps);
    }
    catch (e) {
      console.warn(`Warning: GPS incorrect pour serviceUser ${su2._id}`)
      d2 = 100000;
    }
    return d1-d2;
  }
  return sort;
}


const filterServicesGPS = (serviceUsers, coordinates) => {
  var filteredServiceUsers=serviceUsers.filter( su => isServiceAtAlfredOrVisio(su) || isServiceAroundGPS(su, coordinates) );
  filteredServiceUsers.sort(sortfn(coordinates));
  return filteredServiceUsers;
}

module.exports = { filterServicesGPS };
