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
        <h2>Largeur godet (cm)</h2>
        <Grid>
          <TextField name='bucketWidth' type='number' value={props.bucketSize} onChange={ev => props.onBucketWidthChange(ev.target.value)} />
        </Grid>
        <h2>Epaisseur (mm)</h2>
        <Grid>
          <Select name='bladeThickness' value={props.bladeThickness} onChange={ev => props.onBladeThicknessChange(ev.target.value)}>
            {props.thicknesses.map(thick => (
              <MenuItem value={thick}>{thick}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Type de fixation</h2>
        <Grid>
          <Select name='fixType' value={props.fixType} onChange={ev => props.onFixTypeChange(ev.target.value)}>
            {props.fixTypes.map(fixType => (
              <MenuItem value={fixType} key={fixType}>{fixType}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Grid>
  )
}

const validator = state => {
  return !!state.bladeShape && !!state.bladeThickness
}

module.exports={BladeDimension, bladeDimensionValidator: validator}
