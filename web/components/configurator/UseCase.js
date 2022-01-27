const {Grid} = require('@material-ui/core')
import React from 'react'

function UseCase(props) {
  function onChange(value) {
    props.onChange && props.onChange({target: {name: 'useCase', value: value}})
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
  return !!state.useCase
}

module.exports={UseCase, useCaseValidator: validator}
