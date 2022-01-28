const {Grid, MenuItem, Select} = require('@material-ui/core')
import React, {useState, useEffect} from 'react'
import lodash from 'lodash'

function MachineType(props) {

  const [mark, setMark]=useState(props.machineMark)
  const [model, setModel]=useState(props.machineModel)
  const [models, setModels]=useState([])
  const [power, setPower]=useState(props.machinePower)
  const [powers, setPowers]=useState([])
  const [weight, setWeight]=useState(props.machineWeight)
  const [weights, setWeights]=useState([])

  const machines=props.models

  function onChange(name, value) {
    props.onChange && props.onChange({target: {name: name, value: value}})
  }

  useEffect(() => {
    const mdls=lodash.uniq(machines.filter(v => v.mark==mark).map(v => v.model)).sort()
    setModels(mdls)
    onChange('machineMark', mark)
  }, [mark])

  useEffect(() => {
    const pwrs=lodash.uniq(machines.filter(v => v.mark==mark && v.model==model).map(v => v.power)).sort()
    setPowers(pwrs)
    onChange('machineModel', model)
  }, [model])

  useEffect(() => {
    const whts=lodash.uniq(machines.filter(v => v.mark==mark && v.model==model && v.power==power).map(v => v.weight)).sort()
    setWeights(whts)
    onChange('machinePower', power)
  }, [power])

  useEffect(() => {
    onChange('machineWeight', weight)
  }, [weight])

  const marks=lodash.uniq(machines.map(v => v.mark)).sort()

  return (
    <Grid style={{display: 'flex'}}>
      <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h1>Marque</h1>
        <Select name='mark' value={mark} onChange={ev => { setMark(ev.target.value);setModel(null);setPower(null);setWeight(null) }}>
          {marks.map(mk => (
            <MenuItem value={mk}>{mk}</MenuItem>
          ))
          }
        </Select>
      </Grid>
      <Grid xs={3} name='model' style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        {!!models.length &&
        <>
          <h1>Modele</h1>
          <Select id='model' value={model} onChange={ev => { setModel(ev.target.value);setPower(null);setWeight(null) }}>
            {models.map(mdl => (
              <MenuItem value={mdl}>{mdl}</MenuItem>
            ))
            }
          </Select>
        </>
        }
      </Grid>
      <Grid xs={3} name='power' style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        {!!powers.length &&
        <>
          <h1>Puissance</h1>
          <Select id='power' value={power} onChange={ev => { setPower(ev.target.value);setWeight(null) }}>
            {powers.map(pwr => (
              <MenuItem value={pwr}>{pwr} kW</MenuItem>
            ))
            }
          </Select>
        </>
        }
      </Grid>
      <Grid xs={3} name='weight' style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        {!!weights.length &&
        <>
          <h1>Poids</h1>
          <Select id='weight' value={weight} onChange={ev => setWeight(ev.target.value)}>
            {weights.map(wght => (
              <MenuItem value={wght}>{wght} t</MenuItem>
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
  console.log(JSON.stringify(lodash.omit(state, 'models')))
  const res=!!state.machineMark && !!state.machineModel && !!state.machinePower && !!state.machineWeight
  console.log(`Validate:${res}`)
  return res
}

module.exports={MachineType, machineTypeValidator: validator}
