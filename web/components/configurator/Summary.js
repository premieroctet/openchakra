const {BLADE_SHAPES, FIX_TYPES} = require('../../utils/feurst_consts')
const {isPhoneOk} = require('../../utils/sms')

const {
  FormControl,
  TextField,
  Input,
  FormHelperText,
} = require('@material-ui/core')
const Validator = require('validator')
import React from 'react'

function Summary(props) {

  const {type, mark, model, bladeShape, bucketWidth, bladeThickness, teethShieldFixType, borderShieldFixType, ground} = props
  
  return (
    <div className='summary'>
      
      <h2 className='pl-6'>Recevoir ma préconisation</h2>
      <form className='personaldata'>
        
        <FormControl variant="standard">
          <label htmlFor='name'>Nom</label>
          <TextField placeholder='Saisissez votre nom' id="name" name='name' autocomplete="family-name" value={props.name} onChange={ev => props.onNameChange(ev.target.value)}/>
        </FormControl>
        <div>
          <label htmlFor='firstname'>Prénom</label>
          <TextField placeholder='Saisissez votre prénom' id="firstname" name='firstname' autocomplete="given-name" value={props.firstname} onChange={ev => props.onFirstnameChange(ev.target.value)}/>
        </div>
      
        <div>
          <label htmlFor='company'>Société</label>
          <TextField placeholder='Saisissez votre société' id="company" name='company' autocomplete="organization" value={props.company} onChange={ev => props.onCompanyChange(ev.target.value)}/>
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <Input placeholder='Saisissez votre email' id="email" name='email' type="email" autocomplete="email" value={props.email} onChange={ev => props.onEmailChange(ev.target.value)} />
        </div>
        <FormControl variant="standard">
          <label htmlFor='phone'>Téléphone</label>
          <TextField placeholder='Saisissez votre numéro de téléphone' id="phone" name='phone' autocomplete="tel" value={props.phone} onChange={ev => props.onPhoneChange(ev.target.value)}/>
          <FormHelperText>Seuls des chiffres sont autorisés</FormHelperText>
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
