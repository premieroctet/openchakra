
const {
  CHARGEUSE,
  EXCAVATRICE,
  MACHINE_TYPES,
  PELLE_BUTTE,
} = require('../../utils/feurst_consts')
import React from 'react'
import {feurstImgPath} from '../../pages/configurator'

const {MenuItem, Select, TextField} = require('@material-ui/core')
const {Autocomplete} = require('@material-ui/lab')
const {normalize} = require('../../utils/text')


function MachineType(props) {

  const imagesMachine = {
    [CHARGEUSE]: `${feurstImgPath}/chargeuse.svg`,
    [EXCAVATRICE]: `${feurstImgPath}/excavatrice.svg`,
    [PELLE_BUTTE]: `${feurstImgPath}/pelle_butte.svg`,
  }

  return (
    <div className='grid machine gap-x-8 gap-y-4 md-gap-y-8'>

      <div className='machine-type h-full grid content-start gap-y-4'>
        <h2>Quelle machine souhaitez-vous équiper&nbsp;?</h2>

        <div className='flex flex-wrap justify-evenly gap-x-4'>
          {Object.keys(MACHINE_TYPES).map(tp => (
            <label key={tp} className='flex flex-col items-center gap-y-1 relative'>
              <input className='absolute' type="radio" name='type' checked={tp === props.type || false} value={tp || ''} onChange={ev => { props.onTypeChange(ev.target.value) }} />
              <div className='flex flex-col items-center bg-white z-10 p-2 rounded-xl'>
                <img src={imagesMachine[tp]} alt='' width={80} height={80} />
                <span className='text-center'>Une {MACHINE_TYPES[tp]}</span>
              </div>
            </label>))
          }
        </div>
      </div>

      <div className='machine-brand grid content-between gap-y-4 h-full'>
        <h2 id="machinebrand">Indiquez la marque de votre machine&nbsp;:</h2>
        <Autocomplete
          freeSolo
          className='w-full'
          options={props.marks}
          aria-labelledby='machinebrand'
          value={props.mark || ''}
          filterOptions={(opts, {inputValue}) => { return opts.filter(o => normalize(o).includes(normalize(props.mark))) }}
          renderInput={params => (<TextField {...params} />)}
          onChange={(ev, value) => props.onMarkChange(value)}
          onInputChange={(ev, value) => props.onMarkChange(value)}
        />
      </div>


      <div className='machine-model grid content-between gap-y-4 h-full'>
        <h2 id="machinemodel">Choisissez le modèle de votre machine&nbsp;:</h2>
        <Autocomplete
          freeSolo
          className='w-full'
          options={props.models}
          aria-labelledby='machinemodel'
          value={props.model || ''}
          filterOptions={(opts, {inputValue}) => { return opts.filter(o => normalize(o).includes(normalize(props.model))) }}
          renderInput={params => (<TextField {...params} />)}
          onChange={(ev, value) => props.onModelChange(value)}
          onInputChange={(ev, value) => props.onModelChange(value)}
        />
      </div>

      <div className='machine-weight grid content-between gap-y-4 h-full'>
        <h2 id="machineweight">Indiquez le tonnage de votre machine&nbsp;:</h2>
        <Autocomplete
          freeSolo
          className='w-full'
          options={props.weights}
          getOptionLabel={option => option.toString() }
          aria-labelledby='machineweight'
          value={props.weight || ''}
          filterOptions={opts => (opts.filter(o => o >= props.weight).sort((a, b) => a - b)) }
          renderInput={params => <TextField {...params} variant="standard" />}
          onChange={(ev, value) => props.onWeightChange(value) }
          onInputChange={(ev, value) => props.onWeightChange(value)}
        />
      </div>

      <div className='machine-power grid content-between gap-y-4 h-full'>
        <h2 id="machinepower">Indiquez la puissance de votre machine&nbsp;:</h2>

        <Autocomplete
          freeSolo
          className='w-full'
          options={props.powers}
          getOptionLabel={option => option?.toString() }
          aria-labelledby='machinepower'
          value={props.power || ''}
          filterOptions={opts => (opts.filter(o => o >= props.power).sort((a, b) => a - b)) }
          renderInput={params => <TextField {...params} variant="standard" />}
          onChange={(ev, value) => props.onPowerChange(value) }
          onInputChange={(ev, value) => props.onPowerChange(value)}
        />
      </div>

    </div>
  )
}

const validator= state => {
  let res=!!state.type && !!state.mark && !!state.model
  return res
}

module.exports={MachineType, machineTypeValidator: validator}
