const {
  FormControl,
  MenuItem,
  Radio,
  InputAdornment,
  Select,
  Input,
} = require('@material-ui/core')

import React from 'react'
import {feurstImgPath} from '../../pages/configurator'


function BladeDimension(props) {

  const blades = {
    straight: {
      label: 'Droite',
      path: `${feurstImgPath}/lame-droite.svg`,
      width: '120',
      height: '74',
    },
    semidelta: {
      label: 'Semi-delta',
      path: `${feurstImgPath}/lame-semidelta.svg`,
      width: '120',
      height: '74',
    },
    delta: {
      label: 'Delta',
      path: `${feurstImgPath}/lame-delta.svg`,
      width: '120',
      height: '74',
    },
  }
  

  return (
    <div className='flex flex-col gap-x-4 md-flex-row justify-evenly gap-x-8'>
      <div>
        <h2>Sélectionnez la forme de votre lame</h2>
        
        {Object.keys(blades).map(shape => (
          <div className='flex justify-center mr-8 mb-6'>
            <Radio
              checked={props.bladeShape === shape}
              onChange={ev => props.onBladeShapeChange(ev.target.value)}
              value={shape}
              name="bladeShape"
              id={shape}
              inputProps={{'aria-label': blades[shape].label}}
            />
            <label className='flex flex-col items-center' htmlFor={shape}>
              {blades[shape].label}<img src={blades[shape].path} alt="" width={blades[shape].width} height={blades[shape].height} />
            </label>
          </div>
        ))}
       
      </div>

      <div>
        <h2 id='bucketthickness'>Indiquez l'épaisseur de la lame</h2>
        
        <Select className='w-full mb-6' name='bladeThickness' value={props.bladeThickness} onChange={ev => props.onBladeThicknessChange(ev.target.value)} aria-describedby="bucketthickness">
          {props.thicknesses.map(thick => (
            <MenuItem value={thick}>{`${thick} mm`}</MenuItem>
          ))}
        </Select>

        <h2 id="bucket_width">Indiquez la largeur de votre godet</h2>
        
        <FormControl className='w-full mb-6' variant="standard">
          <Input
            id="bucketWidth"
            name="bucketWidth"
            type='number'
            min={0}
            value={props.bucketWidth}
            onChange={ev => props.onBucketWidthChange(ev.target.value)}
            endAdornment={<InputAdornment position="end">mm</InputAdornment>}
            aria-describedby="bucket_width"
            inputProps={{
              'aria-label': 'largeur godet en mm',
            }}
          />
          {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
        </FormControl>
      </div>
      
      <div className='flex items-center justify-center' style={{textAlign: 'center'}}>
        <img src='' alt='belle image' width={300} height={300} className='flex items-center justify-center' style={{border: '1px solid blue'}} />
      </div>
    </div>
  )
}

const validator = state => {
  return !!state.bladeShape && !!state.bladeThickness
}

module.exports={BladeDimension, bladeDimensionValidator: validator}
