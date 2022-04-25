import React, {useState} from 'react'
import {withTranslation} from 'react-i18next'
import styled from 'styled-components'
import {Input} from '../Feurst/components.styles'


const Address = ({t, state, setState, getShippingFees, errors}) => {

  const changeAddress = e => setState({...state, address: {...state.address, [e.target.name]: e.target.value}})

  const {address} = state
  const isDisabled = false

  return (
    <div className='full-address'>
      <div className='address'>
        <em>{errors?.address}</em>
        <Input
          noborder
          disabled={isDisabled}
          placeholder={'rue'}
          name="address"
          autoComplete='street-address'
          value={address?.address}
          onChange={changeAddress}
        />
      </div>
      <div className='zip_code'>
        <em>{errors?.zip_code}</em>
        <Input
          noborder
          disabled={isDisabled}
          placeholder={'CP'}
          type="text"
          name="zip_code"
          autoComplete='postal-code'
          value={address?.zip_code}
          // onChange={e => { changeAddress(e); getShippingFees(e.target.value) }}
          onChange={e => { changeAddress(e) }}
          onBlur={e => getShippingFees(e.target.value)}
        />
      </div>
      <div className='city'>
        <em>{errors?.zip_code}</em>
        <Input
          noborder
          disabled={isDisabled}
          placeholder={'ville'}
          type="text"
          name="city"
          autoComplete='address-level2'
          value={address?.city}
          onChange={changeAddress}
        />
      </div>
      <div className='country'>
        <em>{errors?.country}</em>
        <Input
          noborder
          disabled={isDisabled}
          placeholder={'pays'}
          type="text"
          name="country"
          autoComplete='country'
          value={address?.country}
          onChange={changeAddress}
        />
      </div>

      <div className='phone'>
        <em>{errors?.phone}</em>
        <Input
          noborder
          disabled={isDisabled}
          placeholder={'Numéro de téléphone pour la livraison (optionnel)'}
          type="tel"
          name="phone"
          autoComplete='phone'
          value={address?.phone}
          onChange={changeAddress}
        />
      </div>

    </div>
  )
}

export default withTranslation('custom', {withRef: true})(Address)
