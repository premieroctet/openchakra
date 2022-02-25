import React from 'react'

import {MachineType, machineTypeValidator} from '../../components/configurator/MachineType'
import {UseCase, useCaseValidator} from '../../components/configurator/UseCase'
import {BladeDimension, bladeDimensionValidator} from '../../components/configurator/BladeDimension'
import {Fixtypes, fixtypesValidator} from '../../components/configurator/Fixtypes'
import {Summary, summaryValidator} from '../../components/configurator/Summary'
// const validationSteps=require('../../utils/validationSteps/validationSteps')

const MACHINE_TYPE = {
  menu: 'Votre machine',
  validator: machineTypeValidator,
  component: props => <MachineType {...props}/>,
}

const USE_CASE = {
  menu: "Vos conditions d'utilisation",
  validator: useCaseValidator,
  component: props => <UseCase {...props}/>,
}

const BLADE_DIMENSION = {
  menu: 'A propos de votre lame',
  validator: bladeDimensionValidator,
  component: props => <BladeDimension {...props}/>,
}

const FIXTYPES = {
  menu: 'A propos de votre équipement',
  validator: fixtypesValidator,
  component: props => <Fixtypes {...props}/>,
}

const SUMMARY = {
  menu: 'Résumé de recherche',
  validator: summaryValidator,
  component: props => <Summary {...props}/>,
}

const STEPS=[MACHINE_TYPE, USE_CASE, BLADE_DIMENSION, FIXTYPES, SUMMARY]

module.exports={STEPS}
