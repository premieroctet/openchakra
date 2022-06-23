import React from 'react'
import RequiredField from '../misc/RequiredField'
import {feurstImgPath} from '../../pages/configurator'
const {withTranslation} = require('react-i18next')
const {
  FormControl,
  Radio,
  InputAdornment,
  TextField,
  Input,
} = require('@material-ui/core')
const {Autocomplete} = require('@material-ui/lab')

const lodash=require('lodash')
const {
  BLADE_SHAPES,
  CHARGEUSE,
  DELTA,
  DROITE,
  EXCAVATRICE,
  SEMI_DELTA,
} = require('../../utils/consts')
const BladePicture = require('./BladePicture')

function BladeDimension(props) {

  const BLADE_LABELS = {
    [DROITE]: props.t(BLADE_SHAPES[DROITE]),
    [SEMI_DELTA]: props.t(BLADE_SHAPES[SEMI_DELTA]),
    [DELTA]: props.t(BLADE_SHAPES[DELTA]),
  }

  const availableBlades=lodash.omit(BLADE_LABELS, [CHARGEUSE, EXCAVATRICE].includes(props.type) ? [DELTA] : [])

  return (
    <>
      <p className='text-base text-right'><RequiredField />{props.t('SUMMARY.mandatory_label')}</p>
      <div className='flex flex-col gap-x-4 md-flex-row justify-evenly gap-x-8'>
        <div>
          <h2>{props.t('BLADE_DIMENSIONS.blade_shape_label')} <RequiredField /></h2>

          {Object.keys(availableBlades).map(shape => {
            const blade_label=availableBlades[shape]
            return(
              <div key={shape} className='grid grid-cols-1-2 justify-center mr-8 mb-6'>
                <Radio
                  className='justify-self-end'
                  checked={props.bladeShape === shape}
                  onChange={ev => props.onBladeShapeChange(ev.target.value)}
                  value={shape}
                  name="bladeShape"
                  id={shape}
                  inputProps={{'aria-label': blade_label}}
                />
                <label className='flex flex-col items-center justify-center' htmlFor={shape}>
                  {blade_label}
                  <BladePicture shape={shape} teeth_count={props.teeth_count} />
                </label>
              </div>
            )
          })}

        </div>

        <div>
          <h2 id='bucketthickness'>{props.t('BLADE_DIMENSION.blade_thickness_label')} <RequiredField /></h2>

          <Autocomplete
            freeSolo
            className='w-full mb-6'
            options={props.thicknesses}
            getOptionLabel={option => option.toString() }
            aria-labelledby='machineweight'
            value={props.bladeThickness || ''}
            filterOptions={opts => (opts.filter(o => o >= props.bladeThickness).sort((a, b) => a - b)) }
            // renderInput={params => <><TextField {...params} variant="standard" /> mm</>}
            renderInput={params => {
              return (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        <InputAdornment position="end">
                      mm
                        </InputAdornment>
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )
            }}
            onChange={(ev, value) => props.onBladeThicknessChange(value)}
            onInputChange={(ev, value) => props.onBladeThicknessChange(value)}

          />

          <h2 id="bucketwidthlabel">{props.t('BLADE_DIMENSION.bucket_width_label')}</h2>

          <FormControl className='w-full mb-6' variant="standard">
            <Input
              id="bucketWidth"
              name="bucketWidth"
              type='number'
              value={props.bucketWidth || ''}
              onChange={ev => props.onBucketWidthChange(ev.target.value)}
              endAdornment={<InputAdornment position="end">mm</InputAdornment>}
              aria-describedby="bucketwidthlabel"
            />
          </FormControl>
        </div>

        <div className='flex items-center justify-center'>
          <img className='img-responsive max-w-350' src={`${feurstImgPath}/illustrationGodet.webp`} alt='godet avec mise en évidence des dents et des boucliers' width={320} height={303} />
        </div>
      </div>
    </>
  )
}

const validator = state => {
  return !!state.bladeShape && !!state.bladeThickness
}

const TransBladeDimension=withTranslation('feurst', {withRef: true})(BladeDimension)
module.exports={BladeDimension: TransBladeDimension, bladeDimensionValidator: validator}
