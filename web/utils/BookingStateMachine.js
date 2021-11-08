const {BOOK_STATUS: BS}=require('./consts')

const STATES=Object.values(BS)

const TRANSITIONS={
  [BS.TO_CONFIRM]: [BS.CONFIRMED, BS.REFUSED, BS.EXPIRED, BS.CANCELLED],
  [BS.INFO]: [BS.PREAPPROVED, BS.REFUSED],
  [BS.PREAPPROVED]: [BS.CONFIRMED, BS.CANCELLED],
  [BS.CONFIRMED]: [BS.FINISHED, BS.CANCELLED],
  [BS.INFO]: [BS.PREAPPROVED, BS.REFUSED],
  [BS.TO_PAY]: [BS.TO_CONFIRM, BS.CUSTOMER_PAID],
}

class StateMachine {

  constructor(initialState) {
    if (!STATES.includes(initialState)) {
      throw new Error(`Etat inconnu ${initialState}, attendu ${STATES}`)
    }
    this.initialState=initialState
  }

  checkAllowed(destinationState) {
    const transitions=TRANSITIONS[this.initialState] || []
    if (!transitions || !transitions.includes(destinationState)) {
      throw new Error(`Impossible de passer de ${this.initialState} à ${destinationState}`)
    }
  }
}

const stateMachineFactory = initialState => {
  return new StateMachine(initialState)
}

module.exports={stateMachineFactory}
