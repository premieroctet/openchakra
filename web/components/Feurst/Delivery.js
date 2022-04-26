import React from 'react'
import styled from 'styled-components'
import {localeMoneyFormat} from '../../utils/converters'

const DeliveryStyles = styled.div`
  border: 1px solid var(--stone-300);
  max-width: var(--spc-96);
  display: flex; 
  flex-direction: column;
  margin-bottom: var(--spc-4);
  flex-grow: 1;

  h4 {
      background: var(--brand-color);
      color: var(--white);
      padding: var(--spc-2);
      padding-left: var(--spc-6);
      margin:0;
  }

  div {
    padding-inline: var(--spc-8);
    margin-bottom: var(--spc-4);

    &>p, &>address {
      font-style: italic;
      color: var(--stone-600);
    }
    
    &>p:last-of-type {
      font-style: unset;
      font-weight: var(--font-bold);
      color: var(--black);
    }
  }
`


const Delivery = ({address, shipping: {shipping_fee, shipping_mode}}) => {

  return address !== null ? (
    <DeliveryStyles>
      <h4>Livraison</h4>
      <div>
        <p>Livraison {shipping_mode?.toLowerCase()} {localeMoneyFormat({value: shipping_fee})}</p>
        <address>
          {address.address} <br />
          {address.zip_code} {address.city}<br />
          {address.country}
        </address>
        <p>Livraison estimée : J+{shipping_mode == 'EXPRESS' ? '2' : '3'}</p>
      </div>
    </DeliveryStyles>
  ) : null

}
export default Delivery
