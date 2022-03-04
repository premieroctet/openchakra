const {withTranslation} = require('react-i18next')
const {BLADE_SHAPES, FIX_TYPES} = require('../../utils/feurst_consts')
const {isPhoneOk} = require('../../utils/sms')

const {
  FormControl,
  TextField,
} = require('@material-ui/core')
const Validator = require('validator')
import React from 'react'

const RequiredField = () => (
  <span className='asterixsm text-sm' aria-label='requis'>*</span>
)

function Summary(props) {

  const {
    error,
    name,
    firstname,
    company,
    email,
    phone,
    type,
    mark,
    model,
    ground,
    bladeShape,
    bucketWidth,
    bladeThickness,
    teethShieldFixType,
    borderShieldFixType,
    isValueExpected,
    onValueChange,
  } = props

  const formInputs = [
    {
      label: props.t('SUMMARY.name_label'),
      placeholder: 'Saisissez votre nom',
      name: 'name',
      id: 'name',
      autoComplete: 'family-name',
      value: name,
      required: true,
    },
    {
      label: props.t('SUMMARY.firstname_label'),
      placeholder: 'Saisissez votre prénom',
      name: 'firstname',
      id: 'firstname',
      autoComplete: 'given-name',
      value: firstname,
      required: true,
    },
    {
      label: props.t('SUMMARY.company_label'),
      placeholder: 'Saisissez votre société',
      name: 'company',
      id: 'company',
      autoComplete: 'organization',
      value: company,
      required: true,
    },
    {
      type: 'email',
      label: props.t('SUMMARY.email_label'),
      placeholder: 'Saisissez votre email',
      name: 'email',
      id: 'email',
      autoComplete: 'email',
      value: email,
      required: true,
    },
    {
      type: 'tel',
      label: props.t('SUMMARY.phone_label'),
      placeholder: 'Saisissez votre numéro de téléphone',
      name: 'phone',
      id: 'phone',
      autoComplete: 'tel',
      value: phone,
      required: true,
    },
  ]


  return (
    <div className='summary'>
      <h2 className='pl-6'>{props.t('SUMMARY.receive_label')}</h2>
      <p className='text-base text-right'><RequiredField />{props.t('SUMMARY.mandatory_label')}</p>
      <form className='personaldata'>

        {formInputs.map((inp, i) => (
          <FormControl key={`summary${i}`} variant="standard">
            <label htmlFor={inp.id}>{inp.label} {inp.required && <RequiredField />}</label>
            <TextField
              placeholder={inp.placeholder}
              id={inp.id}
              name={inp.name}
              type={inp?.type || 'text'}
              required
              autoComplete={inp.autoComplete}
              value={inp.value}
              error={!!error?.[inp.name] || false}
              helperText={error?.[inp.name] || null}
              onChange={ev => onValueChange({inputName: inp.name, value: ev.target.value})}
              onBlur={() => isValueExpected(inp.name)}
            />
          </FormControl>))}
      </form>

      <div className='recap'>
        <h2 className='text-2xl'>{props.t('SUMMARY.summary_label')}</h2>

        <div className='text-lg'>
          <h3>{props.t('SUMMARY.machine_label')}</h3>
          <p>{type} {mark} {model}</p>
        </div>

        <div className='text-lg'>
          <h3>{props.t('SUMMARY.use_case_label')}</h3>
          <p>Extraction de {ground.toLowerCase()}</p>
        </div>


        <div className='text-lg'>
          <h3>{props.t('SUMMARY.balde_label')}</h3>
          <p>Lame {BLADE_SHAPES[bladeShape].toLowerCase()} - L&nbsp;: {bucketWidth}mm - E&nbsp;: {bladeThickness}mm</p>
        </div>

        <div className='text-lg'>
          <h3>{props.t('SUMMARY.equipment_label')}</h3>
          <dl >
            <dt className='text-gray-500'>{props.t('SUMMARY.teeth_shield_label')}</dt>
            <dd className='text-gray-500'>{props.t(FIX_TYPES[teethShieldFixType])}</dd>
            <dt className='text-gray-500'>{props.t('SUMMARY.border_shield_label')}</dt>
            <dd className='text-gray-500'>{props.t(FIX_TYPES[borderShieldFixType])}</dd>
          </dl>
        </div>
      </div>

    </div>
  )
}

const validator = state => {
  return !!state.company && !!state.name && !!state.email && Validator.isEmail(state.email)
    && !!state.phone && isPhoneOk(state.phone)
}

const TransSummary=withTranslation('feurst', {withRef: true})(Summary)
module.exports={Summary: TransSummary, summaryValidator: validator}
