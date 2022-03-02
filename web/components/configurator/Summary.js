const {BLADE_SHAPES, FIX_TYPES} = require('../../utils/feurst_consts')
const {isPhoneOk} = require('../../utils/sms')

const {
  FormControl,
  TextField,
} = require('@material-ui/core')
const Validator = require('validator')
import React from 'react'

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
    onFirstnameChange,
    onNameChange,
    onCompanyChange,
    onEmailChange,
    isValidEmail,
    onPhoneChange,
  } = props
  
  return (
    <div className='summary'>
      <h2 className='pl-6'>Recevoir ma préconisation</h2>
      <form className='personaldata'>
        <FormControl variant="standard">
          <label htmlFor='name'>Nom</label>
          <TextField
            placeholder='Saisissez votre nom'
            id="name"
            name='name'
            autoComplete="family-name"
            value={name}
            error={error?.name || false}
            helperText={error?.firstname}
            onChange={ev => onNameChange(ev.target.value)}/>
        </FormControl>
        <FormControl variant="standard">
          <label htmlFor='firstname'>Prénom</label>
          <TextField
            placeholder='Saisissez votre prénom'
            id="firstname"
            error={error?.firstname || false}
            helperText={error?.firstname}
            name='firstname'
            autoComplete="given-name"
            value={firstname}
            onChange={ev => onFirstnameChange(ev.target.value)}/>
        </FormControl>
        <FormControl variant="standard">
          <label htmlFor='company'>Société</label>
          <TextField
            placeholder='Saisissez votre société'
            id="company"
            name='company'
            error={error?.company || false}
            helperText={error?.company}
            autoComplete="organization"
            value={company}
            onChange={ev => onCompanyChange(ev.target.value)}/>
        </FormControl>
        <FormControl variant="standard">
          <label htmlFor='email'>Email</label>
          <TextField
            placeholder='Saisissez votre email'
            id="email"
            name='email'
            error={error?.email || false}
            helperText={error?.email}
            type="email"
            autoComplete="email"
            value={email}
            onChange={ev => onEmailChange(ev.target.value)}
            onBlur={ev => isValidEmail(ev.target.value)}
          />
        </FormControl>
        <FormControl variant="standard">
          <label htmlFor='phone'>Téléphone</label>
          <TextField
            placeholder='Saisissez votre numéro de téléphone'
            id="phone"
            name='phone'
            error={error?.phone || false}
            helperText={error?.phone}
            autoComplete="tel"
            value={phone}
            onChange={ev => onPhoneChange(ev.target.value)} />
        </FormControl>
      </form>

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
