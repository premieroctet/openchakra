const geolib = require('geolib');
const isEmpty = require('../server/validation/is-empty');
const { createRegExps } = require('./text')


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
      console.warn("Incorrect GPS in "+serviceUser._id+":"+JSON.stringify(serviceGPS));
      return false;
    }
    else {
      // FIX : à vérifier
      /*const isNear = geolib.isPointWithinRadius({latitude: latUser, longitude: lngUser},{latitude:latAlfred,longitude:lngAlfred},(serviceUser.perimeter*1000));
      if(!isNear) {
      const removeIndex = service.findIndex(i => i._id == serviceUser._id);
      service.splice(removeIndex, 1);
      }*/
      try {
        const dist= geolib.getDistance(
          {latitude:coordinates.lat.toString(), longitude:coordinates.lng.toString()},
          {latitude:latAlfred.toString(), longitude: lngAlfred.toString()})
        var distance = geolib.convertDistance( dist, 'km');
        var in_perimeter = distance < serviceUser.perimeter;
        return in_perimeter;
      }
      catch (err) {
        console.error(`Error computing distance between ${coordinates} and ${latAlfred}/${lngAlfred}:${JSON.stringify(err)}`);
        return false;
      }
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

const filterServicesKeyword = (serviceUsers, keyword) => {
  const regexps = createRegExps(keyword)
  const filteredServices = serviceUsers.filter( su =>
      regexps.some(r => r.test(su.service.s_label)) ||
      regexps.some(r => r.test(su.service.category.s_label)) ||
      su.prestations.some(p => p.prestation && p.prestation.s_label && p.prestation.job ?
         regexps.some(r => r.test(p.prestation.s_label)) || regexps.some(r => r.test(p.prestation.job.s_label))
        : false)
  )
  return filteredServices
}

module.exports = { filterServicesGPS, filterServicesKeyword };
