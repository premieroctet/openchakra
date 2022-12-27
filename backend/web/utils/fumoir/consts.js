const FUMOIR_ADMIN = 'FUMOIR_ADMIN'
const FUMOIR_MANAGER = 'FUMOIR_MANAGER'
const FUMOIR_CHEF = 'FUMOIR_CHEF'
const FUMOIR_MEMBER = 'FUMOIR_MEMBER'

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

const TO_COME='TO_COME'
const CURRENT='CURRENT'
const FINISHED='FINISHED'

const EVENT_STATUS = {
  [TO_COME]: 'A venir',
  [CURRENT]: 'En cours',
  [FINISHED]: 'Terminé',
}

// Discriminator for mongoose products
const PRODUCT_DISC_OPTION = {discriminatorKey: 'kind'}
// Discriminator for mongoose products
const CATEGORY_DISC_OPTION = {discriminatorKey: 'kind'}

module.exports = {
  ROLES,
  PLACES,
  PRODUCT_DISC_OPTION,
  EVENT_STATUS,
  TO_COME, CURRENT, FINISHED,
  CATEGORY_DISC_OPTION,
}
