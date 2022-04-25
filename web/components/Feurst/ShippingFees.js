import React from 'react'
import styled from 'styled-components'
import {localeMoneyFormat} from '../../utils/converters'

const ShippingOptions = styled.div`

label {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: var(--spc-3);
  accent-color: var(--black);
  background: var(--white);
  padding: var(--spc-4);
  color: var(--black);
  margin-bottom: var(--spc-2);
  }

  input {
    margin-right: var(--spc-2);
    width: var(--spc-4);
    height: var(--spc-4);
  }

`

const ShippingFees = ({state, setState, shippingoptions}) => {

  return (
    <ShippingOptions>
      {Object.entries(shippingoptions).map(([key, value]) => (
        <label key={key}>
          <input
            type={'radio'}
            name={'shippingOption'}
            value={key}
            checked={key == state.shippingOption}
            onChange={(e) => setState({...state, shippingOption: e.target.value})}
          />
          <span>Livraison {key} - environ {localeMoneyFormat({value})}</span>
        </label>
      ),
      )}
    </ShippingOptions>
  )
}

export default ShippingFees
