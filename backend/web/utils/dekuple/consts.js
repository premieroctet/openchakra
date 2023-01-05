const GDR_MALE='MALE'
const GDR_FEMALE='FEMALE'

const GENDER = {
  [GDR_MALE]: 'Homme',
  [GDR_FEMALE]: 'Femme',
}

const MEASURE_BLOD_PRESURE='BLOOD_PRESSURE'
const MEASURE_HEARTBEAT='HEARTBEAT'

const MEASURE_TYPE={
  [MEASURE_BLOD_PRESURE]: 'Tension artérielle',
  [MEASURE_HEARTBEAT]: 'Rythme cardiaque',
}

module.exports={
  GENDER,
  MEASURE_TYPE,
}
