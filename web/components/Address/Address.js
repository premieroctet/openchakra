import React, {useState} from 'react'
import {withTranslation} from 'react-i18next'
import {TextField} from '@material-ui/core'
import styled from 'styled-components'

const MyTextField = styled(TextField)`
  background: white;
  width: 100%;
`

const Address = ({t, address, setAddress, getShippingFees, errors}) => {

  const changeAddress = e => setAddress({...address, [e.target.name]: e.target.value})
  const isEnabled = !!address?._id

  return (
    <>
      <div className='address'>
        {JSON.stringify(errors)}
        <em>{errors?.address}</em>
        <MyTextField
          disabled={isEnabled}
          placeholder={'rue'}
          variant='outlined'
          name="address"
          autoComplete='street-address'
          value={address?.address}
          onChange={changeAddress}
          error={errors?.address}
        />
      </div>
      <div className='zip_code'>
        <em>{errors?.zip_code}</em>
        <MyTextField
          disabled={isEnabled}
          placeholder={'code postal'}
          variant='outlined'
          type="text"
          name="zip_code"
          autoComplete='postal-code'
          value={address?.zip_code}
          // onChange={e => { changeAddress(e); getShippingFees(e.target.value) }}
          onChange={e => { changeAddress(e) }}
          onBlur={e => getShippingFees(e.target.value)}
          error={errors?.zip_code}
        />
      </div>
      <div className='city'>
        <em>{errors?.zip_code}</em>
        <MyTextField
          disabled={isEnabled}
          placeholder={'ville'}
          variant='outlined'
          type="text"
          name="city"
          autoComplete='address-level2'
          value={address?.city}
          onChange={changeAddress}
          error={errors?.city}
        />
      </div>
      <div className='country'>
        <em>{errors?.country}</em>
        <MyTextField
          disabled={isEnabled}
          placeholder={'pays'}
          variant='outlined'
          type="text"
          name="country"
          autoComplete='country'
          value={address?.country}
          onChange={changeAddress}
          error={errors?.city}
        />
      </div>
    
    </>
  )
}

export default withTranslation('custom', {withRef: true})(Address)
