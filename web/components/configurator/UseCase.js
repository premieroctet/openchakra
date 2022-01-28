const {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} = require('@material-ui/core')
import React, {useState, useEffect} from 'react'

function UseCase(props) {

  const [quality, setQuality]=useState(props.quality)

  function onChange(value) {
    props.onChange && props.onChange({target: {name: 'quality', value: value}})
  }

  useEffect(() => {
    onChange(quality)
  }, [quality])

  return (
    <Grid style={{display: 'flex'}}>
      <Grid xs={12} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Type de terrain</h2>
        <RadioGroup value={quality} onChange={ev => setQuality(ev.target.value)}>
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
