import React from 'react'

import {MachineType, machineTypeValidator} from '../../components/configurator/MachineType'
import {UseCase, useCaseValidator} from '../../components/configurator/UseCase'
import {BladeDimension, bladeDimensionValidator} from '../../components/configurator/BladeDimension'
import {FixTypes, fixtypesValidator} from '../../components/configurator/Fixtypes'
import {Summary, summaryValidator} from '../../components/configurator/Summary'
// const validationSteps=require('../../utils/validationSteps/validationSteps')

const MACHINE_TYPE = {
  menu: 'MACHINE_TYPE.title',
  validator: machineTypeValidator,
  component: props => <MachineType {...props}/>,
}

const USE_CASE = {
  menu: 'USE_CASE.title',
  validator: useCaseValidator,
  component: props => <UseCase {...props}/>,
}

const BLADE_DIMENSION = {
  menu: 'BLADE_DIMENSION.title',
  validator: bladeDimensionValidator,
  component: props => <BladeDimension {...props}/>,
}

const FIXTYPES = {
  menu: 'FIX_TYPES.title',
  validator: fixtypesValidator,
  component: props => <FixTypes {...props}/>,
}

const SUMMARY = {
  menu: 'SUMMARY.title',
  validator: summaryValidator,
  component: props => <Summary {...props}/>,
}

const STEPS=[MACHINE_TYPE, USE_CASE, BLADE_DIMENSION, FIXTYPES, SUMMARY]

module.exports={STEPS}
