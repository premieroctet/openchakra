const isEmpty = require('../server/validation/is-empty');

const data2ServiceUser = (data, su) => {

  console.log('data2ServiceUser:data is ' + JSON.stringify(data, null, 2));
  su.service = data.service;
  su.perimeter = data.perimeter || 0;

  su.minimum_basket = data.minimum_basket || 0;
  su.deadline_before_booking = isEmpty(data.deadline_unit) || isEmpty(data.deadline_value) ? '' : data.deadline_value + ' ' + data.deadline_unit;
  su.description = data.description;
  su.equipments = data.equipments;

  su.travel_tax = data.travel_tax || 0;
  su.pick_tax = data.pick_tax || 0;
  su.location = data.location;

  su.level = data.level;
  su.experience_title = data.experience_title;
  su.experience_description = data.experience_description;
  su.experience_skills = data.experience_skills;


  su.professional_access = data.professional_access
  su.particular_access = data.particular_access

  su.service_address = data.service_address;
  su.equipments = data.equipments;

  console.log(`Mapped to ${JSON.stringify(su, null, 2)}`)
  return su;
};

module.exports = {data2ServiceUser};
