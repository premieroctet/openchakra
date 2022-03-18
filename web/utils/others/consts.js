const BOOK_STATUS= {
  CONFIRMED: 'Confirmée',
  REFUSED: 'Refusée',
  CANCELLED: 'Annulée',
  FINISHED: 'Terminée',
  EXPIRED: 'Expirée',
  TO_CONFIRM: 'En attente de confirmation',
  TO_PAY: 'En attente de paiement',
  INFO: "Demande d'infos",
  PREAPPROVED: 'Pré-approuvée',
  CUSTOMER_PAID: 'Payée par le client',
}

const ADMIN='ADMIN'
const MANAGER='MANAGER'
const EMPLOYEE='EMPLOYEE'

const ROLES = {
  [ADMIN]: 'Administrateur',
  [MANAGER]: 'Manager',
  [EMPLOYEE]: 'Collaborateur',
}


const AVOCOTES_COMPANY_NAME='AOD avocotés'


module.exports={BOOK_STATUS, AVOCOTES_COMPANY_NAME, ADMIN, MANAGER, EMPLOYEE, ROLES}
