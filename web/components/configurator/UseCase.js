const {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} = require('@material-ui/core')

import React from 'react'

function UseCase(props) {

  return (
    <Grid style={{display: 'flex'}}>
      <Grid xs={12} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Type de terrain</h2>
        <RadioGroup value={props.quality} onChange={ev => props.onQualityChange(ev.target.value)}>
          <FormControlLabel value='standard' control={<Radio />} label='Terre/gravat/tout venant' />
          <FormControlLabel value='xd' control={<Radio />} label='Basalte/calcaire/marbre' />
          <FormControlLabel value='xhd' control={<Radio />} label='Granit/porphyre/rhyolite' />
        </RadioGroup>
      </Grid>
    </Grid>

  )
}

const validator = state => {
  return !!state.quality
}

module.exports={UseCase, useCaseValidator: validator}
