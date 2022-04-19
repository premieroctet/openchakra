import React from 'react'
import styled from 'styled-components'

const DeliveryStyles = styled.div`
  border: 1px solid var(--stone-300);
  width: 40%;
  display: flex; 
  flex-direction: column;
  margin-bottom: var(--spc-4);

  h4 {
      background: var(--brand-color);
      color: var(--white);
      padding: var(--spc-2);
      margin:0;
  }

  div {
      padding-inline: var(--spc-8);
      margin-bottom: var(--spc-4);
  }
`


const Delivery = ({address, shipping}) => {

  return address !== null ? (
    <DeliveryStyles>
      <h4>Livraison</h4>
      <div>
        <p>Shipping conditions TODO</p>
        <address>
          {address.address} <br />
          {address.zip_code} {address.city}<br />
          {address.country}
        </address>
      </div>
    </DeliveryStyles>
  ) : null

}
export default Delivery
