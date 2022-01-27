const {Grid} = require('@material-ui/core')
import React from 'react'

function Job(props) {

  function onChange(value) {
    props.onChange && props.onChange({target: {name: 'job', value: value}})
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
  return !!state.job
}

module.exports={Job, jobValidator: validator}
