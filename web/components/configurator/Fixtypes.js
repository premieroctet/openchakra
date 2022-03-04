const {withTranslation} = require('react-i18next')
import React from 'react'
import {feurstImgPath} from '../../pages/configurator'


function FixTypes(props) {

  const fixtures = {
    PIN: {
      label: props.t('FIX_TYPE.pin'),
      path: `${feurstImgPath}/clavette.svg`,
      width: '120',
      height: '74',
    },
    SOLD: {
      label: props.t('FIX_TYPE.sold'),
      path: `${feurstImgPath}/fixture-sold.svg`,
      width: '120',
      height: '74',

    },
  }


  return (
    <div className='fixtypes'>
      <h2>{props.t('FIX_TYPES.fix_type_label')}</h2>
      <div className='flex flex-col gap-x-8 justify-center md-flex-row'>

        <div>
          <h2 className='text-center'>{props.t('FIX_TYPES.teeth_fix_type')}</h2>

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
          <h2 className='text-center'>{props.t('FIX_TYPES.borders_fix_type')}</h2>

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

const TransFixTypes=withTranslation('feurst', {withRef: true})(FixTypes)
module.exports={FixTypes: TransFixTypes, fixtypesValidator: validator}
