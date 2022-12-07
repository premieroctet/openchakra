import React, {useEffect, useState, useMemo, useRef} from 'react'
import NoSSR from 'react-no-ssr'
import countryList from 'react-select-country-list'
import DevLog from '../DevLog'
import RequiredField from '../misc/RequiredField'
const axios = require('axios')
const {PDFViewer} = require('@react-pdf/renderer')
const lodash=require('lodash')
const {withTranslation} = require('react-i18next')
const {getCountries, getPhoneCode} = require('libphonenumber-js')
const {
  TextField,
  FormControl,
  Select,
  MenuItem,
} = require('@material-ui/core')
const Validator = require('validator')
const {is_development} = require('../../config/config')
const {setAxiosAuthentication} = require('../../utils/authentication')
const Quotation = require('../Feurst/Quotation')
const {BLADE_SHAPES, FIX_TYPES} = require('../../utils/feurst/consts')
const {isInternationalPhoneOK} = require('../../utils/sms')
const BladePicture=require('./BladePicture.js')


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

  const formRef = useRef()
  const countryOptions = useMemo(() => countryList().getData(), [])
  const nativeCountries = useMemo(() => countryList().native(), [])

  const {
    error,
    name,
    firstname,
    company,
    email,
    zipcode,
    country = 'FR',
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
      placeholder: props.t('SUMMARY.name_placeholder'),
      name: 'name',
      id: 'name',
      autoComplete: 'family-name',
      value: name,
      required: true,
    },
    {
      label: props.t('SUMMARY.firstname_label'),
      placeholder: props.t('SUMMARY.firstname_placeholder'),
      name: 'firstname',
      id: 'firstname',
      autoComplete: 'given-name',
      value: firstname,
      required: true,
    },
    {
      type: 'email',
      label: props.t('SUMMARY.email_label'),
      placeholder: props.t('SUMMARY.email_placeholder'),
      name: 'email',
      id: 'email',
      autoComplete: 'email',
      value: email,
      required: true,
    },
    {
      label: props.t('SUMMARY.company_label'),
      placeholder: props.t('SUMMARY.company_placeholder'),
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
      const data=lodash.pick(props, 'type mark model power weight bladeThickness ground borderShieldFixType teethShieldFixType bladeShape bucketWidth'.split(' '))
      axios.post('/feurst/api/quotation', data)
        .then(res => {
          setPrecos(res.data)
        })
    }

    onResize()

  }, [])

  useEffect(() => {
    onValueChange({inputName: 'country', value: formRef?.current?.elements?.country?.value})
  }, [])

  return (
    <div className='summary'>
      <h2 className='pl-6'>{props.t('SUMMARY.receive_label')}</h2>
      <p className='text-base text-right'><RequiredField />{props.t('SUMMARY.mandatory_label')}</p>
      <form ref={formRef} className='personaldata'>

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

        <div className='flex w-full gap-x-4'>
          <FormControl variant="standard" className='grow'>
            <label htmlFor='country'>{props.t('SUMMARY.country_label')} <RequiredField /></label>
            <Select
              value={country}
              name="country"
              id="country"
              required
              onChange={ev => onValueChange({inputName: 'country', value: ev.target.value})}
              autoComplete='country-name'
              error={!!error?.country || false}
            >
              {countryOptions.map(({label, value}) => (
                <MenuItem key={value} value={value}>
                  {label} {nativeCountries.getLabel(value) != label ? `(${nativeCountries.getLabel(value)})`:''}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          { country === 'FR' ?
            <FormControl variant="standard">
              <label htmlFor='zipcode'>{props.t('SUMMARY.zipcode_label')} <RequiredField /></label>
              <TextField
                value={zipcode}
                name="zipcode"
                id="zipcode"
                inputProps={{pattern: '[0-9]{5}'}}
                required
                autoComplete='postal-code'
                onChange={ev => onValueChange({inputName: 'zipcode', value: ev.target.value})}
                placeholder={props.t('SUMMARY.zipcode_placeholder')}
              />
            </FormControl> : null}
        </div>

        <PhoneNumber {...props} />
      </form>

      <p className='feurstconditions mb-6'>{props.t('SUMMARY.rgpdconditions')}</p>

      <h2 className='text-2xl pl-4'>{props.t('SUMMARY.summary_label')}</h2>
      <div className='recap grid grid-cols-1 md-grid-cols-2 gap-x-4'>

        <div>
          <dl className='text-lg dl-inline mb-6'>
            <dt className='text-gray-500'>{props.t('SUMMARY.machine_label')}</dt>
            <dd>{props.t(type.toUpperCase())} {mark} {model}</dd>
            <dt className='text-gray-500'>{props.t('SUMMARY.use_case_label')}</dt>
            <dd>{props.t('SUMMARY.quarrying_some')} {ground.toLowerCase()}</dd>
            <dt className='text-gray-500'>{props.t('SUMMARY.blade_label')}</dt>
            <dd>{props.t('SUMMARY.blade_name')} {props.t(BLADE_SHAPES[bladeShape]).toLowerCase()} - {props.t('SUMMARY.blade_width_abbr')}&nbsp;: {bucketWidth}<abbr title={props.t('SUMMARY.millimeter_abbr')}>mm</abbr> - {props.t('SUMMARY.blade_thickness_abbr')}&nbsp;: {bladeThickness}mm</dd>
          </dl>

          <h3>{props.t('SUMMARY.equipment_label')}</h3>

          <dl className='text-lg dl-inline md-ml-12'>
            <dt className='text-gray-500'>{props.t('SUMMARY.teeth_shield_label')}</dt>
            <dd>{props.t(FIX_TYPES[teethShieldFixType])}</dd>
            <dt className='text-gray-500'>{props.t('SUMMARY.border_shield_label')}</dt>
            <dd>{props.t(FIX_TYPES[borderShieldFixType])}</dd>
          </dl>
        </div>
        <div className='max-w-lg'>
          <BladePicture width={400} height={265} shape={props.bladeShape} teeth_count={props.teeth_count} />
        </div>
      </div>

      {precos?.accessories &&
          <DevLog>
            <NoSSR>
              <PDFViewer style={{width: '100%', height: '800px'}}>
                <Quotation data={precos} t={props.t}/>
              </PDFViewer>
            </NoSSR>
          </DevLog>
      }
    </div>
  )
}

const validator = state => {
  return !!state.company && !!state.name && !!state.email && Validator.isEmail(state.email)
    && isInternationalPhoneOK(state.phone, state.langIsoCode)
}

const TransSummary=withTranslation(null, {withRef: true})(Summary)
module.exports={Summary: TransSummary, summaryValidator: validator}
