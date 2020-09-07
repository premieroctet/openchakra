const isEmpty = require('../server/validation/is-empty');

const data2ServiceUser = (data, su) => {

  console.log('data2ServiceUser:data is ' + JSON.stringify(data));
  su.service = data.service;
  su.perimeter = data.perimeter || 0;

  su.minimum_basket = data.minimum_basket || 0;
  su.deadline_before_booking = isEmpty(data.deadline_unit) || isEmpty(data.deadline_value) ? '' : data.deadline_value + ' ' + data.deadline_unit;
  su.description = data.description;
  su.equipments = data.equipments;

  su.travel_tax = data.travel_tax || 0;
  su.pick_tax = data.pick_tax || 0;
  su.level = data.level;
  su.location = data.location;

  su.graduated = false;
  // FIX : reinsert diploma & certification files
  console.log('Diploma before:' + JSON.stringify(su.diploma));
  if ('diplomaName' in data && 'diplomaYear' in data) {
    if (su.diploma == null) {
      su.diploma = {};
    }
    ;
    su.diploma.name = data.diplomaName;
    su.diploma.year = data.diplomaYear;
    su.graduated = true;
  } else {
    console.log('No file uploaded');
  }
  console.log('Diploma after:' + JSON.stringify(su.diploma));

  su.is_certified = false;
  if ('certificationName' in data && 'certificationYear' in data) {
    if (su.certification == null) {
      su.certification = {};
    }
    ;
    su.certification.name = data.certificationName;
    su.certification.year = data.certificationYear;
    su.is_certified = true;
  } else {
    console.log('No file uploaded');
  }

  su.service_address = data.service_address;
  su.equipments = data.equipments;

  return su;
};

module.exports = {data2ServiceUser};
