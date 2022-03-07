const {BLADE_SHAPES, FIX_TYPES} = require('../../utils/feurst_consts')
const {isPhoneOk} = require('../../utils/sms')
const {normalize} = require('../../utils/text')

const {Autocomplete} = require('@material-ui/lab')
const {
  TextField,
  FormControl,
} = require('@material-ui/core')
const Validator = require('validator')
import React, {useEffect, useState} from 'react'
import {countries} from 'country-flag-icons'

const PhoneNumber = ({rawphone, error, onPhoneChange, isValueExpected}) => {

  const [isoCode, setIsoCode] = useState('')

  useEffect(() => {
    const {language} = window.navigator
    if (isoCode === '') { setIsoCode(language.toUpperCase()) }
    
  }, [isoCode])

  return (
    <div className='grid-cols-2-3 gap-x-4'>
      <div className='flex flex-col h-full'>
        <label htmlFor='country-select'>Indice pays</label>
        <Autocomplete
          id="country-select"
          options={countries}
          value={isoCode !== '' ? isoCode : countries[0]}
          onChange={(ev, value) => setIsoCode(value)}
          autoHighlight
          getOptionLabel={option => option.toUpperCase()}
          
          renderOption={(props, option) => {
            return (
              <div>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${props.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${props.toLowerCase()}.png 2x`}
                  alt=""
                /> {' '}
                {props.toUpperCase()}
              </div>)
            
          }}
          renderInput={params => {
            return (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )
          } }
        />
      </div>
        
      <FormControl variant="standard">
        <label htmlFor="phone">Téléphone <RequiredField /></label>
        <TextField
          placeholder='Saisissez votre numéro de téléphone'
          id='phone'
          name='phone'
          required
          autoComplete='tel'
          value={rawphone}
          error={!!error?.phone || false}
          helperText={error?.phone || null}
          onChange={ev => onPhoneChange(ev.target.value, isoCode)}
          onBlur={() => isValueExpected('phone')}
        />
      </FormControl>
    </div>
  )
  
}


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
      label: 'Nom',
      placeholder: 'Saisissez votre nom',
      name: 'name',
      id: 'name',
      autoComplete: 'family-name',
      value: name,
      required: true,
    },
    {
      label: 'Prénom',
      placeholder: 'Saisissez votre prénom',
      name: 'firstname',
      id: 'firstname',
      autoComplete: 'given-name',
      value: firstname,
      required: true,
    },
    {
      type: 'email',
      label: 'Email',
      placeholder: 'Saisissez votre email',
      name: 'email',
      id: 'email',
      autoComplete: 'email',
      value: email,
      required: true,
    },
    {
      label: 'Société',
      placeholder: 'Saisissez votre société',
      name: 'company',
      id: 'company',
      autoComplete: 'organization',
      value: company,
      required: true,
    },
    
  ]
  
  return (
    <div className='summary'>
      <h2 className='pl-6'>Recevoir ma préconisation</h2>
      <p className='text-base text-right'><RequiredField /> Champs obligatoires</p>
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

      <p className='feurstconditions mb-6'>Feurst® a besoin des coordonnées que vous nous fournissez pour vous contacter au sujet de nos produits et services. Vous pouvez vous désabonner de ces communications à tout moment. Consultez notre Politique de confidentialité pour en savoir plus sur nos modalités de désabonnement, ainsi que sur nos politiques de confidentialité et sur notre engagement vis-à-vis de la protection et de la vie privée.
      </p>

      <div className='recap'>
        <h2 className='text-2xl'>Récapitulatif de votre demande&nbsp;:</h2>

        <div className='text-lg'>
          <h3>Votre machine&nbsp;:</h3>
          <p>{type} {mark} {model}</p>
        </div>

        <div className='text-lg'>
          <h3>Votre usage&nbsp;:</h3>
          <p>Extraction de {ground.toLowerCase()}</p>
        </div>

        
        <div className='text-lg'>
          <h3>Votre godet/lame&nbsp;:</h3>
          <p>Lame {BLADE_SHAPES[bladeShape].toLowerCase()} - L&nbsp;: {bucketWidth}mm - E&nbsp;: {bladeThickness}mm</p>
        </div>

        <div className='text-lg'>
          <h3>Votre équipement&nbsp;:</h3>
          <dl >
            <dt className='text-gray-500'>Boucliers inter-dents&nbsp;:</dt>
            <dd className='text-gray-500'>{FIX_TYPES[teethShieldFixType]}</dd>
            <dt className='text-gray-500'>Boucliers de flancs&nbsp;:</dt>
            <dd className='text-gray-500'>{FIX_TYPES[borderShieldFixType]}</dd>
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

module.exports={Summary, summaryValidator: validator}
