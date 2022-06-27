import React from 'react'
import RequiredField from '../misc/RequiredField'
import {feurstImgPath} from '../../pages/configurator'
const {withTranslation} = require('react-i18next')
const {PIN, SOLD, NONE} = require('../../utils/consts')


function FixTypes(props) {

  const BORDER_FIXTURES = {
    [PIN]: {
      label: props.t('FIX_TYPE.pin'),
      path: `${feurstImgPath}/bouclier_flanc_claveter.svg`,
      width: '120',
      height: '74',
    },
    [SOLD]: {
      label: props.t('FIX_TYPE.sold'),
      path: `${feurstImgPath}/bouclier_flanc_souder.svg`,
      width: '120',
      height: '74',

    },
    [NONE]: {
      label: props.t('FIX_TYPE.none'),
      path: `${feurstImgPath}/aucun_bouclier.svg`,
      width: '120',
      height: '74',

    },
  }

  const TEETH_FIXTURES = {
    [PIN]: {
      label: props.t('FIX_TYPE.pin'),
      path: `${feurstImgPath}/bouclier_dent_claveter.svg`,
      width: '120',
      height: '74',
    },
    [SOLD]: {
      label: props.t('FIX_TYPE.sold'),
      path: `${feurstImgPath}/bouclier_dent_souder.svg`,
      width: '120',
      height: '74',
    },
    [NONE]: {
      label: props.t('FIX_TYPE.none'),
      path: `${feurstImgPath}/aucun_bouclier.svg`,
      width: '120',
      height: '74',
    },
  }

  return (
    <div className='fixtypes'>
      <p className='text-base text-right'><RequiredField />{props.t('SUMMARY.mandatory_label')}</p>
      <h2>{props.t('FIX_TYPES.fix_type_label')}</h2>
      <div className='flex flex-col gap-x-8 justify-center lg-flex-row'>

        <div>
          <h2 className='text-center'>{props.t('FIX_TYPES.teeth_fix_type')} <RequiredField /></h2>

          <div className='flex justify-center gap-x-2 md-gap-x-4'>
            {Object.keys(TEETH_FIXTURES).map(fixType => (
              <label key={fixType} className='flex flex-col items-center gap-y-1 relative'>
                <input className='absolute' type="radio" name='teethShieldFixType' value={fixType} checked={props.teethShieldFixType === fixType} onChange={ev => { props.onTeethShieldFixTypeChange(ev.target.value) }} />
                <div className='flex flex-col items-center bg-white z-10 rounded-xl p-2 md-p-4'>
                  <img src={TEETH_FIXTURES[fixType].path} alt='' width={80} height={80} />
                  <span className='text-center'>{TEETH_FIXTURES[fixType].label}</span>
                </div>
              </label>
            ),
            )}
          </div>
        </div>

        <div>
          <h2 className='text-center'>{props.t('FIX_TYPES.borders_fix_type')} <RequiredField /></h2>

          <div className='flex justify-center gap-x-2 md-gap-x-4'>
            {Object.keys(BORDER_FIXTURES).map(fixType => (
              <label key={fixType} className='flex flex-col items-center gap-y-1 relative'>
                <input className='absolute' type="radio" name='borderShieldFixType' value={fixType} checked={props.borderShieldFixType === fixType} onChange={ev => { props.onBorderShieldFixTypeChange(ev.target.value) }} />
                <div className='flex flex-col items-center bg-white z-10 rounded-xl p-2 md-p-4'>
                  <img src={BORDER_FIXTURES[fixType].path} alt='' width={80} height={80} />
                  <span className='text-center'>{BORDER_FIXTURES[fixType].label}</span>
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
