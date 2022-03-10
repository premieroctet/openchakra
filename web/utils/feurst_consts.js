const {is_development} = require('../config/config')

const EXCAVATRICE='EXCAVATRICE'
const CHARGEUSE='CHARGEUSE'
const PELLE_BUTTE='PELLE-BUTTE'
const UNKNOWN='UNKNOWN'

const MACHINE_TYPES={
  [EXCAVATRICE]: 'MACHINE_TYPE.excavator',
  [CHARGEUSE]: 'MACHINE_TYPE.loader',
  [PELLE_BUTTE]: 'MACHINE_TYPE.shovel',
}

const PIN='PIN'
const SOLD='SOLD'

const FIX_TYPES={
  [PIN]: 'FIX_TYPE.pin',
  [SOLD]: 'FIX_TYPE.sold',
}

const DROITE='DROITE'
const DELTA='DELTA'
const SEMI_DELTA='SEMI-DELTA'

const BLADE_SHAPES={
  [DROITE]: 'BLADE_SHAPE.straight',
  [DELTA]: 'BLADE_SHAPE.delta',
  [SEMI_DELTA]: 'BLADE_SHAPE.semi_delta',
  [UNKNOWN]: 'BLADE_SHAPE.unknown',
}

const QUOTATION_CC=is_development() ? 'sebastien.auvray@alfredplace.io': 'florian.benetiere@safe-feurst.fr'

module.exports={
  PIN, SOLD, FIX_TYPES,
  DROITE, DELTA, SEMI_DELTA, UNKNOWN, BLADE_SHAPES,
  EXCAVATRICE, CHARGEUSE, PELLE_BUTTE, MACHINE_TYPES,
  QUOTATION_CC,
}
