import React from 'react'
// import InputLabel from '@mui/material/InputLabel'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'
// import TextField from '@mui/material/TextField'
// import Autocomplete from '@mui/material/Autocomplete'
// const {Grid} = require('@material-ui/core')

const {Grid, FormControl, InputLabel, MenuItem, Select, TextField} = require('@material-ui/core')
const {Autocomplete} = require('@material-ui/lab')


function MachineType(props) {

  return (
    <div className='grid gridcols gap-x-8'>
      
      <div>
        <h2>Quelle machine souhaitez-vous équiper ?</h2>
    
        <div className='flex justify-evenly gap-x-4 mb-6'>
          {props.types.map(tp => (
            <label className='flex flex-col items-center gap-y-1'>
              <img src='' alt='' width={40} height={40} />
              <input type="radio" name='type' key={tp} value={tp} onChange={ev => { props.onTypeChange(ev.target.value) }} /> {tp}
            </label>))
          }
        </div>
      </div>
      
      <div>
        {!!props.marks.length &&
          
            <FormControl variant="standard" className='w-full mb-6'>
              <InputLabel id="machine-brand">Marque de votre machine</InputLabel>
              <Select labelId="machine-brand" name='mark' value={props.mark} onChange={ev => { props.onMarkChange(ev.target.value) }}>
                {/* <MenuItem key={''} value={''}>Inconnu</MenuItem> */}
                {props.marks.map(mk => (
                  <MenuItem key={mk} value={mk}>{mk}</MenuItem>
                ))
                }
              </Select>
            </FormControl>
          
        }
      </div>
      
      <Grid >
        {!!props.models.length &&
            <Autocomplete
              className='w-full mb-6'
              options={props.models}
              value={props.model}
              filterOptions={(opts, {inputValue}) => { return opts.filter(o => o.toLowerCase().replace(/ /g, '').includes(inputValue.toLowerCase().replace(/ /g, ''))) }}
              renderInput={params => (<TextField {...params} label='Modèle'/>)}
              onChange={(ev, value) => props.onModelChange(value)}
              onInputChange={(ev, value) => props.onModelChange(value)}
            />
        }
      </Grid>
      <Grid>
        {!!props.powers.length &&
        
          <FormControl variant="standard" className='w-full mb-6' >
            <InputLabel id="machine-power">Puissance(kW)</InputLabel>

            <Select name='power' labelId='machine-power' disabled={!!props.model} value={props.power} onChange={ev => { props.onPowerChange(ev.target.value) }}>
              <MenuItem key={null} value={null}>Inconnu</MenuItem>
              {props.powers.map(pwr => (
                <MenuItem key={pwr} value={pwr}>{pwr}</MenuItem>
              ))
              }
            </Select>
          </FormControl>
        
        }
      </Grid>
      <Grid>
        {!!props.weights.length &&
          <FormControl variant="standard" className='w-full mb-6' >
            <InputLabel id="machine-weight">Poids(t)</InputLabel>
            <Select name='weight' labelId='machine-weight' disabled={!!props.model} value={props.weight} onChange={ev => props.onWeightChange(ev.target.value)}>
              <MenuItem key={null} value={null}>Inconnu</MenuItem>
              {props.weights.map(wght => (
                <MenuItem key={wght} value={wght}>{wght}</MenuItem>
              ))
              }
            </Select>
          </FormControl>
        }
      </Grid>
    </div>
  )
}

const validator= state => {
  let res=!!state.type && !!state.mark && !!state.power && !!state.weight
  res = res || state.type=='shovel'
  return res
}

module.exports={MachineType, machineTypeValidator: validator}
