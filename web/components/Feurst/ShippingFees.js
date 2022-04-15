import React from 'react'
import styled from 'styled-components'
import {localeMoneyFormat} from '../../utils/converters'

const ShippingOptions = styled.div`

  display: flex;
  flex-direction: column;
  row-gap: var(--spc-2);

  label {
    accent-color: var(--black);
    display: block;
    background: var(--white);
    padding: var(--spc-4);
    color: var(--black);
  }

  input {
    margin-right: var(--spc-2);
    width: var(--spc-4);
    height: var(--spc-4);
  }

`

const ShippingFees = ({shippingOption, setShippingOption, shippingoptions}) => {

  return (
    <ShippingOptions>
      {Object.entries(shippingoptions).map(([key, value]) => (
        <label>
          <input
            type={'radio'}
            name={'shippingOption'}
            value={key}
            checked={key == shippingOption}
            onChange={() => setShippingOption(key)}
          />
          Livraison {key} - environ {localeMoneyFormat({value})}
        </label>
      ),
      )}
    </ShippingOptions>
  )
}

export default ShippingFees
