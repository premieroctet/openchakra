import React from 'react'

import {MachineType, machineTypeValidator} from '../../components/configurator/MachineType'
import {Job, jobValidator} from '../../components/configurator/Job'
import {MachineWeight, machineWeightValidator} from '../../components/configurator/MachineWeight'
import {UseCase, useCaseValidator} from '../../components/configurator/UseCase'
import {BladeDimension, bladeDimensionValidator} from '../../components/configurator/BladeDimension'
import {Summary, summaryValidator} from '../../components/configurator/Summary'
// const validationSteps=require('../../utils/validationSteps/validationSteps')

const MACHINE_TYPE = {
  menu: 'Type de machine',
  validator: machineTypeValidator,
  component: props => <MachineType {...props}/>,
}

const JOB = {
  menu: 'Métier',
  validator: jobValidator,
  component: props => <Job {...props}/>,
}

const MACHINE_WEIGHT = {
  menu: 'Tonnage Machine',
  validator: machineWeightValidator,
  component: props => <MachineWeight {...props}/>,
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

const STEPS=[MACHINE_TYPE, /* JOB,*/ /* MACHINE_WEIGHT,*/ USE_CASE, BLADE_DIMENSION, SUMMARY]

module.exports={STEPS}
