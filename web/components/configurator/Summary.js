const {BLADE_SHAPES, FIX_TYPES} = require('../../utils/feurst_consts')
const {isPhoneOk} = require('../../utils/sms')

const {TextField} = require('@material-ui/core')
const Validator = require('validator')
import React from 'react'

function Summary(props) {

  const {type, mark, model, bladeShape, bucketWidth, bladeThickness, teethShieldFixType, borderShieldFixType, ground} = props
  
  return (
    <div className='summary'>
      
      <h2 className='pl-6'>Recevoir ma préconisation</h2>
      <div className='personaldata'>
        
        <div>
          <h3>Nom</h3>
          <TextField placeholder='Saisissez votre nom' name='name' value={props.name} onChange={ev => props.onNameChange(ev.target.value)}/>
        </div>
        <div>
          <h3>Prénom</h3>
          <TextField placeholder='Saisissez votre prénom' name='firstname' value={props.firstname} onChange={ev => props.onFirstnameChange(ev.target.value)}/>
        </div>
      
        <div>
          <h3>Société</h3>
          <TextField placeholder='Saisissez votre société' name='company' value={props.company} onChange={ev => props.onCompanyChange(ev.target.value)}/>
        </div>

        <div>
          <h3>Email</h3>
          <TextField placeholder='Saisissez votre email' name='email' value={props.email} onChange={ev => props.onEmailChange(ev.target.value)} />
        </div>
        <div>
          <h3>Téléphone</h3>
          <TextField name='phone' value={props.phone} onChange={ev => props.onPhoneChange(ev.target.value)}/>
        </div>
      </div>

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
