import React from 'react'
import styled from 'styled-components'
import {withTranslation} from 'react-i18next'
import {Input} from '../Feurst/components.styles'


const Address = ({t, state, requestUpdate, errors}) => {

  const changeAddress = e => requestUpdate({address: {...state.address, [e.target.name]: e.target.value}})

  const {address} = state
  const isDisabled = false

  return (
    <StyledAddress>
      <div className='address'>
        <em>{errors?.address}</em>
        <Input
          noborder
          disabled={isDisabled}
          placeholder={'rue'}
          name="address"
          autoComplete='street-address'
          value={address?.address || ''}
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
          value={address?.zip_code || ''}
          onChange={changeAddress}
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
          value={address?.city || ''}
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
          value={address?.country || ''}
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
          value={address?.phone || ''}
          onChange={changeAddress}
        />
      </div>

    </StyledAddress>
  )
}

const StyledAddress = styled.div`
    display: grid;
    row-gap: var(--spc-2);
    column-gap: var(--spc-2);
    grid-template-areas: 'address address address'
                          'zipcode city country'
                          'phone phone phone';

  .address {
    grid-area: address;
  }
  .zip_code {
    grid-area: zipcode;
  }
  .city {
    grid-area: city;
  }
  .country {
    grid-area: country;
  }
  .phone {
    grid-area: phone;
  }

`

export default withTranslation('feurst', {withRef: true})(Address)
