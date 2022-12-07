const FUMOIR_ADMIN='FUMOIR_ADMIN'
const FUMOIR_MANAGER='FUMOIR_MANAGER'
const FUMOIR_CHEF='FUMOIR_CHEF'
const FUMOIR_MEMBER='FUMOIR_MEMBER'

const FUMOIR_BASE = 'FUMOIR'

const ROLES = {
  [FUMOIR_ADMIN]: 'Administrateur',
  [FUMOIR_CHEF]: 'Cuisinier',
  [FUMOIR_MANAGER]: 'Manager fumoir',
  [FUMOIR_MEMBER]: 'Membre',
}

const PLACES = {
  [FUMOIR_BASE]: 'Fumoir de Georges',
}

module.exports={
  ROLES,
  PLACES,
}
