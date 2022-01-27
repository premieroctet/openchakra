const {TextField} = require('@material-ui/core')

const {Grid} = require('@material-ui/core')
import React from 'react'

function BladeDimension(props) {

  function onChange(name, value) {
    props.onChange && props.onChange({target: {name: name, value: value}})
  }

  return (
    <>
      <h2>Type lame</h2>
      <Grid onClick={() => onChange('bladeType', 'straight')}>Droite</Grid>
      <Grid onClick={() => onChange('bladeType', 'delta')}>Delta</Grid>
      <h2>Largeur godet</h2>
      <Grid>
        <TextField value={props.bucketSize} onChange={ev => onChange('bucketSize', ev.target.value)} />
      </Grid>
      <h2>Epaisseur</h2>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(thick => (
        <Grid onClick={() => onChange('bladeThickness', thick)}>{thick}</Grid>
      ),
      )
      }
    </>
  )
}

const validator = state => {
  return !!state.bladeType && !!state.bucketSize && !!state.bladeThickness
}

module.exports={BladeDimension, bladeDimensionValidator: validator}
