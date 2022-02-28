const {
  MenuItem,
  Select,
} = require('@material-ui/core')
  
import React from 'react'
import {feurstImgPath} from '../../pages/configurator'
  
  
function Fixtypes(props) {
  
  const fixtures = {
    PIN: {
      label: 'A claveter',
      path: `${feurstImgPath}/fixture-lock.png`,
      width: '120',
      height: '74',
    },
    SOLD: {
      label: 'A souder',
      path: `${feurstImgPath}/fixture-sold.svg`,
      width: '120',
      height: '74',
      
    },
  }
    
  
  return (
    <div className='fixtypes'>
      <h2>Je souhaite une recommandation comprenant les équipements suivants&nbsp;:</h2>
      <div className='flex flex-col gap-x-8 justify-center md-flex-row'>

        <div>
          <h2 className='text-center'>Boucliers inter-dents</h2>

          <div className='flex justify-center gap-x-4'>
            {Object.keys(fixtures).map(fixType => (
              <label key={fixType} className='flex flex-col items-center gap-y-1 relative'>
                <input className='absolute' type="radio" name='teethShieldFixType' value={fixType} checked={props.teethShieldFixType === fixType} onChange={ev => { props.onTeethShieldFixTypeChange(ev.target.value) }} />
                <div className='flex flex-col items-center bg-white z-10 rounded-xl p-4'>
                  <img src={fixtures[fixType].path} alt='' width={80} height={80} />
                  <span className='text-center'>{fixtures[fixType].label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-center'>Boucliers de flancs</h2>
        
          <div className='flex justify-center gap-x-4'>
            {Object.keys(fixtures).map(fixType => (
              <label key={fixType} className='flex flex-col items-center gap-y-1 relative'>
                <input className='absolute' type="radio" name='borderShieldFixType' value={fixType} checked={props.borderShieldFixType === fixType} onChange={ev => { props.onBorderShieldFixTypeChange(ev.target.value) }} />
                <div className='flex flex-col items-center bg-white z-10 rounded-xl p-4'>
                  <img src={fixtures[fixType].path} alt='' width={80} height={80} />
                  <span className='text-center'>{fixtures[fixType].label}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
  
const validator = state => {
  return !!state.teethShieldFixType && !!state.borderShieldFixType
}
  
module.exports={Fixtypes, fixtypesValidator: validator}
  
