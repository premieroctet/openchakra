const {Grid} = require('@material-ui/core')
import React from 'react'

function MachineWeight(props) {

  function onChange(value) {
    props.onChange && props.onChange({target: {name: 'machineWeight', value: value}})
  }

  return (
    <>
      {props.values.map(v => {
        const {label, value}=v
        return (
          <Grid onClick={() => onChange(value)}>{label}</Grid>
        )
      })}
    </>
  )
}

const validator = state => {
  return !!state.machineWeight
}

module.exports={MachineWeight, machineWeightValidator: validator}
