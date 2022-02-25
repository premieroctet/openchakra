const {
  MenuItem,
  Select,
} = require('@material-ui/core')
  
import React from 'react'
import {feurstImgPath} from '../../pages/configurator'
  
  
function Fixtypes(props) {
  
  const fixtures = {
    sold: {
      label: 'A claveter',
      path: `${feurstImgPath}/fixture-lock.png`,
      width: '120',
      height: '74',
    },
    lock: {
      label: 'A souder',
      path: `${feurstImgPath}/fixture-sold.svg`,
      width: '120',
      height: '74',
    },
  }
    
  
  return (
    <div>
      <h2>Je souhaite une recommandation comprenant les équipements suivants&nbsp;:</h2>
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
  return !!state.fixTypes
}
  
module.exports={Fixtypes, fixtypesValidator: validator}
  
