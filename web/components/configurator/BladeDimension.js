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
import {feurstImgPath} from '../../pages/configurator'


function BladeDimension(props) {

  const imgBlades = {
    straight: `${feurstImgPath}/configurateur-02.svg`,
    delta: `${feurstImgPath}/configurateur-03.svg`,
    lame: `${feurstImgPath}/configurateur-04.svg`,
  }

  return (
    <div>
      <div>
        <h2>Sélectionnez la forme de votre lame</h2>

        <div className='flex'>
          <Radio
            checked={props.bladeShape === 'straight'}
            onChange={ev => props.onBladeShapeChange(ev.target.value)}
            value="straight"
            name="bladeShape"
            id="straight"
            inputProps={{'aria-label': 'Droite'}}
          />
          <label className='flex flex-col items-center' htmlFor='straight'>
            Droite<img src={imgBlades.straight} alt="" width={80} height={80} />
          </label>

        </div>

        <Radio
          checked={props.bladeShape === 'semidelta'}
          onChange={ev => props.onBladeShapeChange(ev.target.value)}
          value="semidelta"
          name="bladeShape"
        />

        {/* <RadioGroup name="bladeShape" value={props.bladeShape} onChange={ev => props.onBladeShapeChange(ev.target.value)}>
          <FormControlLabel value='straight' control={<Radio />} label='Droite' ><img src={imgBlades.straight} alt="" width={80} height={80} /> </FormControlLabel>
          <FormControlLabel value="semidelta" control={<Radio />} label='Semi-delta' />
          <FormControlLabel value="delta" control={<Radio />} label='Delta' />
        </RadioGroup> */}
      </div>
      <div>
        <h2>Largeur godet (cm)</h2>
        <div>
          <TextField name='bucketWidth' type='number' value={props.bucketSize} onChange={ev => props.onBucketWidthChange(ev.target.value)} />
        </div>
        <h2>Epaisseur (mm)</h2>
        <div>
          <Select name='bladeThickness' value={props.bladeThickness} onChange={ev => props.onBladeThicknessChange(ev.target.value)}>
            {props.thicknesses.map(thick => (
              <MenuItem value={thick}>{thick}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <h2>Type de fixation</h2>
        <Select name='fixType' value={props.fixType} onChange={ev => props.onFixTypeChange(ev.target.value)}>
          {props.fixTypes.map(fixType => (
            <MenuItem value={fixType[0]} key={fixType[0]}>{fixType[1]}</MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}

const validator = state => {
  return !!state.bladeShape && !!state.bladeThickness
}

module.exports={BladeDimension, bladeDimensionValidator: validator}
