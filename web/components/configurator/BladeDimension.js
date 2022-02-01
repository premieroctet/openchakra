const {
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} = require('@material-ui/core')

import React from 'react'

function BladeDimension(props) {

  return (
    <Grid style={{display: 'flex'}}>
      <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Type lame</h2>
        <RadioGroup name="bladeShape" value={props.bladeShape} onChange={ev => props.onBladeShapeChange(ev.target.value)}>
          <FormControlLabel value='straight' control={<Radio />} label='Droite' />
          <FormControlLabel value="delta" control={<Radio />} label='Delta' />
        </RadioGroup>
      </Grid>
      <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Largeur godet</h2>
        <Grid>
          <TextField name='bucketWidth' type='number' value={props.bucketSize} onChange={ev => props.onBucketWidthChange(ev.target.name, ev.target.value)} />mm
        </Grid>
      </Grid>
      <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Epaisseur (mm)</h2>
        <Select name='bladeThickness' value={props.thickness} onChange={ev => props.onBladeThicknessChange(ev.target.name, ev.target.value)}>
          {props.thicknesses.map(thick => (
            <MenuItem value={thick}>{thick}</MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}

const validator = state => {
  return !!state.bladeShape && !!state.bucketWidth && !!state.bladeThickness
}

module.exports={BladeDimension, bladeDimensionValidator: validator}
