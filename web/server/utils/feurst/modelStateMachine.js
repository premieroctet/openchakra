const {QUOTATION} = require('../../../utils/feurst/consts')

const {CREATED, HANDLED} = require('../../../utils/feurst/consts')

const QUOTATIONS_STATES=[CREATED, COMPLETE, VALID, HANDLED, CONVERTED, EXPIRED]

const QUOTATIONS_TRANSITIONS={
  [CREATED]: [COMPLETE],
  [COMPLETE]: [VALID, HANDLED],
  [VALID]: [HANDLED, COMPLETED, CREATED],
  [HANDLED]: [CONVERTED, COMPLETED, CREATED],
}

class StateMachine {

  constructor(states, transitions, initialState) {
    if (!states.includes(initialState)) {
      throw new Error(`Etat inconnu ${initialState}, attendu ${STATES}`)
    }
    this.initialState=initialState
    this.transitions=transitions
  }

  checkAllowed(destinationState) {
    const transitions=this.transiions[this.initialState] || []
    if (!transitions || !transitions.includes(destinationState)) {
      throw new Error(`Impossible de passer de ${this.initialState} à ${destinationState}`)
    }
  }
}

const stateMachineFactory = (datamodel, initialState) => {
  if (datamodel==QUOTATION) {
    return new StateMachine(QUOTATIONS_STATES, QUOTATIONS_TRANSITIONS, initialState)
  }
  throw new Error(`Unkown data model:${datamodel}`)
}

module.exports={stateMachineFactory}
