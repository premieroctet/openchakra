import React from 'react'
import {feurstImgPath} from '../../pages/configurator'

const {FormControl, InputLabel, MenuItem, Select, TextField} = require('@material-ui/core')
const {Autocomplete} = require('@material-ui/lab')


function MachineType(props) {

  const imagesMachine = {
    chargeuse: `${feurstImgPath}/configurateur-12.svg`,
    excavatrice: `${feurstImgPath}/configurateur-13.svg`,
  }

  return (
    <div className='grid machine gap-x-8'>
      
      <div className='machine-type'>
        <h2>Quelle machine souhaitez-vous équiper ?</h2>
    
        <div className='flex justify-evenly gap-x-4 mb-6'>
          {props.types.map(tp => (
            <label key={tp} className='flex flex-col items-center gap-y-1 relative'>
              <input className='absolute' type="radio" name='type' value={tp} onChange={ev => { props.onTypeChange(ev.target.value) }} />
              <div className='flex flex-col items-center bg-white z-10 p-2 rounded-xl'>
                <img src={imagesMachine[tp]} alt='' width={80} height={80} />
                <span className='machine-type-name'>Une {tp}</span>
              </div>
            </label>))
          }
        </div>
      </div>
      
      {!!props.marks.length &&
        <FormControl variant="standard" className='w-full mb-6 machine-brand'>
          <InputLabel id="machine-brand">Marque de votre machine</InputLabel>
          <Select labelId="machine-brand" name='mark' disableUnderline value={props.mark} onChange={ev => { props.onMarkChange(ev.target.value) }}>
            {<MenuItem key={''} value={''}>Inconnu</MenuItem>}
            {props.marks.map(mk => (
              <MenuItem key={mk} value={mk}>{mk}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
      }
      
      
      {!!props.models.length &&
        <Autocomplete
          className='w-full mb-6 machine-model'
          options={props.models}
          value={props.model}
          filterOptions={(opts, {inputValue}) => { return opts.filter(o => o.toLowerCase().replace(/ /g, '').includes(inputValue.toLowerCase().replace(/ /g, ''))) }}
          renderInput={params => (<TextField {...params} label='Modèle'/>)}
          onChange={(ev, value) => props.onModelChange(value)}
          onInputChange={(ev, value) => props.onModelChange(value)}
        />
      }
      
      {!!props.powers.length &&
        <FormControl className='w-full mb-6 machine-power' >
          <InputLabel id="machine-power">Puissance(kW)</InputLabel>
          <Select name='power' labelId='machine-power' disableUnderline disabled={!!props.model} value={props.power} onChange={ev => { props.onPowerChange(ev.target.value) }}>
            <MenuItem key={null} value={null}>Inconnu</MenuItem>
            {props.powers.map(pwr => (
              <MenuItem key={pwr} value={pwr}>{pwr}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
      }
      
      
      {!!props.weights.length &&
        <FormControl className='w-full mb-6 machine-weight' >
          <InputLabel id="machine-weight">Poids(t)</InputLabel>
          <Select name='weight' labelId='machine-weight' disableUnderline disabled={!!props.model} value={props.weight} onChange={ev => props.onWeightChange(ev.target.value)}>
            <MenuItem key={null} value={null}>Inconnu</MenuItem>
            {props.weights.map(wght => (
              <MenuItem key={wght} value={wght}>{wght}</MenuItem>
            ))
            }
          </Select>
        </FormControl>
      }
      
    </div>
  )
}

const validator= state => {
  let res=!!state.type && !!state.mark && !!state.power && !!state.weight
  res = res || state.type=='shovel'
  return res
}

module.exports={MachineType, machineTypeValidator: validator}
