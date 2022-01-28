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

  function onChange(name, value) {
    props.onChange && props.onChange({target: {name: name, value: value}})
  }

  return (
    <Grid style={{display: 'flex'}}>
      <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Type lame</h2>
        <RadioGroup name="bladeShape" value={props.bladeShape} onChange={ev => onChange('bladeShape', ev.target.value)}>
          <FormControlLabel value='straight' control={<Radio />} label='Droite' />
          <FormControlLabel value="delta" control={<Radio />} label='Delta' />
        </RadioGroup>
      </Grid>
      <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Largeur godet</h2>
        <Grid>
          <TextField name='bucketWidth' type='number' value={props.bucketSize} onChange={ev => onChange(ev.target.name, ev.target.value)} />mm
        </Grid>
      </Grid>
      <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Epaisseur (mm)</h2>
        <Select name='bladeThickness' value={props.thickness} onChange={ev => onChange(ev.target.name, ev.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(thick => (
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
