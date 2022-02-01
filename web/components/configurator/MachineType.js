const {Grid, MenuItem, Select, TextField} = require('@material-ui/core')
const {Autocomplete} = require('@material-ui/lab')
import React from 'react'

function MachineType(props) {

  return (
    <Grid style={{display: 'flex'}}>
      <Grid item xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h1>Type</h1>
        <Select name='type' value={props.type} onChange={ev => { props.onTypeChange(ev.target.value) }}>
          {[['', 'Inconnu'], ['excavator', 'Excavatrice'], ['loader', 'Chargeuse'], ['shovel', 'Pelle-butte']].map(tp => (
            <MenuItem key={tp[0]} value={tp[0]}>{tp[1]}</MenuItem>
          ))
          }
        </Select>
      </Grid>
      <Grid item xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        {!!props.marks.length &&
          <>
            <h1>Marque</h1>
            <Select name='mark' value={props.mark} onChange={ev => { props.onMarkChange(ev.target.value) }}>
              <MenuItem key={''} value={''}>Inconnu</MenuItem>
              {props.marks.map(mk => (
                <MenuItem key={mk} value={mk}>{mk}</MenuItem>
              ))
              }
            </Select>
          </>
        }
      </Grid>
      <Grid item xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        {!!props.models.length &&
        <>
          <h1>Modèle</h1>
          <Autocomplete
            options={props.models}
            filterOptions={(opts, {inputValue}) => { return opts.filter(o => o.toLowerCase().replace(/ /g, '').includes(inputValue.toLowerCase().replace(/ /g, ''))) }}
            renderInput={params => (<TextField {...params}/>)}
            onChange={(ev, value) => props.onModelChange(value)}
            onInputChange={(ev, value) => props.onModelChange(value)}
          />
        </>
        }
      </Grid>
      <Grid item xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        {!!props.powers.length &&
        <>
          <h1>Puissance(kW)</h1>
          <Select name='power' disabled={!!props.model} value={props.power} onChange={ev => { props.onPowerChange(ev.target.value) }}>
            <MenuItem key={null} value={null}>Inconnu</MenuItem>
            {props.powers.map(pwr => (
              <MenuItem key={pwr} value={pwr}>{pwr}</MenuItem>
            ))
            }
          </Select>
        </>
        }
      </Grid>
      <Grid item xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        {!!props.weights.length &&
        <>
          <h1>Poids(t)</h1>
          <Select name='weight' disabled={!!props.model} value={props.weight} onChange={ev => props.onWeightChange(ev.target.value)}>
            <MenuItem key={null} value={null}>Inconnu</MenuItem>
            {props.weights.map(wght => (
              <MenuItem key={wght} value={wght}>{wght}</MenuItem>
            ))
            }
          </Select>
        </>
        }
      </Grid>
    </Grid>
  )
}

const validator= state => {
  let res=!!state.type && !!state.mark && !!state.power && !!state.weight
  res = res || state.type=='shovel'
  return res
}

module.exports={MachineType, machineTypeValidator: validator}
