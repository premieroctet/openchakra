const {normalize} = require('../../utils/text')
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

        <div className='flex justify-evenly gap-x-4'>
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

      {!!props.marks.length &&
          <div className='machine-brand grid content-between gap-y-4 h-full'>
            <h2 id="machinebrand">Indiquez la marque de votre machine&nbsp;:</h2>
            <Select className='w-full' aria-labelledby='machinebrand' name='mark' defaultValue="" value={props.mark || ''} onChange={ev => { props.onMarkChange(ev.target.value) }}>
              {<MenuItem key={''} value={''}>Inconnu</MenuItem>}
              {props.marks.map(mk => (
                <MenuItem key={mk} value={mk}>{mk}</MenuItem>
              ))
              }
            </Select>
          </div>
      }


      {!!props.models.length &&
        <div className='machine-model grid content-between gap-y-4 h-full'>
          <h2 id="machinemodel">Choisissez le modèle de votre machine&nbsp;:</h2>
          <Autocomplete
            className='w-full'
            options={props.models}
            aria-labelledby='machinemodel'
            value={props.model}
            filterOptions={(opts, {inputValue}) => { return opts.filter(o => o.toLowerCase().replace(/ /g, '').includes(inputValue.toLowerCase().replace(/ /g, ''))) }}
            renderInput={params => (<TextField {...params} />)}
            onChange={(ev, value) => props.onModelChange(value)}
            onInputChange={(ev, value) => props.onModelChange(value)}
          />
        </div>
      }

      {!!props.weights.length &&
        <div className='machine-weight grid content-between gap-y-4 h-full'>
          <h2 id="machineweight">Indiquez le tonnage de votre machine&nbsp;:</h2>
          <Select name='weight' aria-labelledby='machineweight' disabled={!!props.model} value={props.weight} onChange={ev => props.onWeightChange(ev.target.value)}>
            <MenuItem key={null} value={null}>Inconnu</MenuItem>
            {props.weights.map(wght => (
              <MenuItem key={wght} value={wght}>{wght}</MenuItem>
            ))
            }
          </Select>
        </div>
      }

      {!!props.powers.length &&
        <div className='machine-power grid content-between gap-y-4 h-full'>
          <h2 id="machinepower">Indiquez la puissance de votre machine&nbsp;:</h2>
          <Select name='power' aria-labelledby='machinepower' disabled={!!props.model} value={props.power} onChange={ev => { props.onPowerChange(ev.target.value) }}>
            <MenuItem key={null} value={null}>Inconnu</MenuItem>
            {props.powers.map(pwr => (
              <MenuItem key={pwr} value={pwr}>{pwr}</MenuItem>
            ))
            }
          </Select>
        </div>
      }

    </div>
  )
}

const validator= state => {
  let res=!!state.type && !!state.mark && !!state.power && !!state.weight
  res = res || state.type==PELLE_BUTTE
  return res
}

module.exports={MachineType, machineTypeValidator: validator}
