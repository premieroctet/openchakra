const EXCAVATRICE='EXCAVATRICE'
const CHARGEUSE='CHARGEUSE'
const PELLE_BUTTE='PELLE-BUTTE'

const MACHINE_TYPES={
  [EXCAVATRICE]: 'excavatrice',
  [CHARGEUSE]: 'chargeuse',
  [PELLE_BUTTE]: 'pelle-butte',
}

const PIN='PIN'
const SOLD='SOLD'

const FIX_TYPES={
  [PIN]: 'À claveter',
  [SOLD]: 'À souder',
}

const DROITE='DROITE'
const DELTA='DELTA'
const SEMI_DELTA='SEMI-DELTA'

const BLADE_SHAPES={
  [DROITE]: 'Droite',
  [DELTA]: 'Delta',
  [SEMI_DELTA]: 'Semi-delta',
}

module.exports={
  PIN, SOLD, FIX_TYPES,
  DROITE, DELTA, SEMI_DELTA, BLADE_SHAPES,
  EXCAVATRICE, CHARGEUSE, PELLE_BUTTE, MACHINE_TYPES,
}
