const {MenuItem} = require('@material-ui/core')
const {Select} = require('@material-ui/core')
import React, {useState} from 'react'
import lodash from 'lodash'

function MachineType(props) {

  const [mark, setMark]=useState(null)
  const [model, setModel]=useState(null)
  const [power, setPower]=useState(null)

  function onChange(value) {
    props.onChange && props.onChange({target: {name: 'machineType', value: value}})
  }

  const marks=lodash.uniq(props.values.map(v => v.mark))
  const models=props.values.filter(v => v.mark==mark).map(v => v.model)
  console.log(JSON.stringify(models))
  const powers=lodash.filter(props.values, v => v.mark==mark && v.value==model).map(v => v.power)

  return (
    <>
      <h1>Marque</h1>
      <Select id='mark' value={mark}>
        {marks.map(mk => (
          <MenuItem value={mk} onClick={() => setMark(mk)}>{mk}</MenuItem>
        ))
        }
      </Select>
      {!!models.length &&
        <>
          <h1>Modele</h1>
          <Select id='model' value={model}>
            {models.map(mdl => (
              <MenuItem value={mdl} onClick={() => setModel(mdl)}>{mdl}</MenuItem>
            ))
            }
          </Select>
        </>
      }
      {!!power.length &&
        <>
          <h1>Puissance</h1>
          <Select id='power' value={power}>
            {power.map(pwr => (
              <MenuItem value={pwr} onClick={() => setPower(pwr)}>{pwr}</MenuItem>
            ))
            }
          </Select>
        </>
      }
    </>
  )
}

const validator= state => {
  return !!state.machineType
}

module.exports={MachineType, machineTypeValidator: validator}
