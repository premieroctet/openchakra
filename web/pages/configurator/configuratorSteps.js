import React from 'react'

import {MachineType, machineTypeValidator} from '../../components/configurator/MachineType'
import {UseCase, useCaseValidator} from '../../components/configurator/UseCase'
import {BladeDimension, bladeDimensionValidator} from '../../components/configurator/BladeDimension'
import {Summary, summaryValidator} from '../../components/configurator/Summary'
// const validationSteps=require('../../utils/validationSteps/validationSteps')

const MACHINE_TYPE = {
  menu: 'Type de machine',
  validator: machineTypeValidator,
  component: props => <MachineType {...props}/>,
}

const USE_CASE = {
  menu: "Conditions d'utilisation",
  validator: useCaseValidator,
  component: props => <UseCase {...props}/>,
}

const BLADE_DIMENSION = {
  menu: 'Type et dimensions de la lame',
  validator: bladeDimensionValidator,
  component: props => <BladeDimension {...props}/>,
}

const SUMMARY = {
  menu: 'Résumé de recherche',
  validator: summaryValidator,
  component: props => <Summary {...props}/>,
}

const STEPS=[MACHINE_TYPE, USE_CASE, BLADE_DIMENSION, SUMMARY]

module.exports={STEPS}
