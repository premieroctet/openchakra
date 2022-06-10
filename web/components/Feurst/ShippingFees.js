import React from 'react'
import styled from 'styled-components'
import {localeMoneyFormat} from '../../utils/converters'


const ShippingFees = ({shipping_mode, requestUpdate, shippingoptions}) => {

  return (
    <ShippingOptions>
      {/* {SHIPPING_MODES} */}
      {Object.entries(shippingoptions).map(([key, value]) => {
        const priceLabel=value==0 ? 'franco de port' : `environ ${localeMoneyFormat({value})}`
        return (
          <label key={key}>
            <input
              type={'radio'}
              name={'shippingOption'}
              value={key}
              checked={key == shipping_mode}
              onChange={e => requestUpdate({shipping_mode: e.target.value, shipping_fee: value})}
            />
            <span>Livraison {key} - {priceLabel}</span>
          </label>
        )
      },
      )}
    </ShippingOptions>
  )
}

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

export default ShippingFees
