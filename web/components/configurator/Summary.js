const RequiredField = require('../misc/RequiredField')
const {is_development} = require('../../config/config')
const axios = require('axios')
const {setAxiosAuthentication} = require('../../utils/authentication')
const Quotation = require('../Feurst/Quotation')
const {PDFViewer} = require('@react-pdf/renderer')
const lodash=require('lodash')
import NoSSR from 'react-no-ssr'

const {withTranslation} = require('react-i18next')
const {BLADE_SHAPES, FIX_TYPES} = require('../../utils/feurst_consts')
const {isInternationalPhoneOK} = require('../../utils/sms')
const {getCountries, getPhoneCode} = require('libphonenumber-js')
const BladePicture=require('./BladePicture.js')

const {
  TextField,
  FormControl,
  Select,
  MenuItem,
} = require('@material-ui/core')
const Validator = require('validator')
import React, {useEffect, useState} from 'react'


const PhoneNumber = ({t, error, onPhoneChange, isValueExpected}) => {

  const [isoCode, setIsoCode] = useState('')
  const [rawphone, setRawphone] = useState('')

  const countries = getCountries()

  const countriesCodes = countries.map(country => {
    if (country) { return {country, 'phonecode': getPhoneCode(country)} }
  })

  const setPrefixedPhone = ev => {
    setRawphone(ev.target.value)
    onPhoneChange(ev.target.value, isoCode)
  }


  const blurLangIsoCode = () => {
    onPhoneChange(rawphone, isoCode, true)
  }


  useEffect(() => {
    const {language} = window.navigator
    if (isoCode === '') {
      let country = language.split('-')
      country = country.length > 1 ? country[1] : country[0]
      setIsoCode(country.toUpperCase())
    }

  }, [isoCode])

  return (
    <div className='grid-cols-1-2 gap-x-2'>


      <FormControl variant="standard">
        <label htmlFor='country-select'>{t('SUMMARY.phone_prefix')}</label>


        <Select
          id="country-select"
          value={isoCode}
          onChange={ev => setIsoCode(ev.target.value)}
          onBlur={() => blurLangIsoCode()}
        >
          {countries.map(country => (
            <MenuItem key={country} value={country}>
              {`${country} +${countriesCodes.filter(el => el.country == country).map(el => el.phonecode)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="standard">
        <label htmlFor="phone">{t('SUMMARY.phone_label')} <RequiredField /></label>
        <TextField
          placeholder={t('SUMMARY.phone_placeholder')}
          id='phone'
          name='phone'
          required
          autoComplete='tel'
          value={rawphone}
          error={!!error?.phone || false}
          helperText={error?.phone || null}
          onChange={ev => setPrefixedPhone(ev)}
          onBlur={() => isValueExpected('phone')}
        />
      </FormControl>
    </div>
  )

}


function Summary(props) {

  const [precos, setPrecos]=useState(null)

  const {
    error,
    name,
    firstname,
    company,
    email,
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
    onResize,
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
      label: props.t('SUMMARY.company_label'),
      placeholder: 'Saisissez votre société',
      name: 'company',
      id: 'company',
      autoComplete: 'organization',
      value: company,
      required: true,
    },

  ]

  useEffect(() => {
    if (is_development()) {
      setAxiosAuthentication()
      const data=lodash.pick(props, 'type mark model power weight bladeThickness ground borderShieldFixType teethShieldFixType bladeShape'.split(' '))
      axios.post('/feurst/api/quotation', data)
        .then(res => {
          setPrecos(res.data)
        })
    }

    onResize()

  }, [])

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

        <PhoneNumber {...props} />
      </form>

      <p className='feurstconditions mb-6'>{props.t('SUMMARY.rgpdconditions')}</p>

      <h2 className='text-2xl pl-4'>{props.t('SUMMARY.summary_label')}</h2>
      <div className='recap grid gap-x-4'>

        <div>
          <dl className='text-lg dl-inline mb-6'>
            <dt className='text-gray-500'>{props.t('SUMMARY.machine_label')}</dt>
            <dd>{type} {mark} {model}</dd>
            <dt className='text-gray-500'>{props.t('SUMMARY.use_case_label')}</dt>
            <dd>{props.t('SUMMARY.quarrying_some')} {ground.toLowerCase()}</dd>
            <dt className='text-gray-500'>{props.t('SUMMARY.blade_label')}</dt>
            <dd>{props.t('SUMMARY.blade_name')} {props.t(BLADE_SHAPES[bladeShape]).toLowerCase()} - {props.t('SUMMARY.blade_width_abbr')}&nbsp;: {bucketWidth}<abbr title={props.t('SUMMARY.millimeter_abbr')}>mm</abbr> - {props.t('SUMMARY.blade_thickness_abbr')}&nbsp;: {bladeThickness}mm</dd>
          </dl>
        </div>

        <div>
          <h3>{props.t('SUMMARY.equipment_label')}</h3>

          <dl className='text-lg dl-inline ml-12'>
            <dt className='text-gray-500'>{props.t('SUMMARY.teeth_shield_label')}</dt>
            <dd>{props.t(FIX_TYPES[teethShieldFixType])}</dd>
            <dt className='text-gray-500'>{props.t('SUMMARY.border_shield_label')}</dt>
            <dd>{props.t(FIX_TYPES[borderShieldFixType])}</dd>
          </dl>
        </div>

      </div>
      <BladePicture shape={props.bladeShape} teeth_count={props.teeth_count} />

      {precos?.accessories && is_development() &&
        <NoSSR>
          <PDFViewer style={{width: '100%', height: '800px'}}>
            <Quotation data={precos} t={props.t}/>
          </PDFViewer>
        </NoSSR>
      }
    </div>
  )
}

const validator = state => {
  return !!state.company && !!state.name && !!state.email && Validator.isEmail(state.email)
    && isInternationalPhoneOK(state.phone, state.langIsoCode)
}

const TransSummary=withTranslation('feurst', {withRef: true})(Summary)
module.exports={Summary: TransSummary, summaryValidator: validator}
