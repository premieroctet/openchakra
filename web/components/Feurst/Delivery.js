import React, {useState} from 'react'
import styled from 'styled-components'
import {isEmpty} from 'lodash'
import {localeMoneyFormat} from '../../utils/converters'
import {FEURST_IMG_PATH} from '../../utils/consts'


const UpdateShippingFees = ({endpoint, orderid, shipping_fee, requestUpdate, update}) => {

  const updateShipFee = () => {
    update({endpoint, orderid, shipping_fee})
  }
  
  return (
    <input
      value={shipping_fee}
      type="number"
      step={'0.01'}
      onChange={e => requestUpdate({shipping_fee: e.target.value})}
      onBlur={updateShipFee} />
  )
}


const Delivery = ({endpoint, orderid, address, shipping: {shipping_fee, shipping_mode, update}, setIsOpenDialog, editable, requestUpdate}) => {

  const shippingFeesMsg = shipping_fee === 0 ? 'franco de port' : `environ ${localeMoneyFormat({value: shipping_fee})}`

  return (
    <DeliveryStyles>
      <h4>Informations de livraison</h4>
      <div className='deliverybox'>
        <div className='content'>
          <p>Livraison {shipping_mode?.toLowerCase()} {update ? <UpdateShippingFees endpoint={endpoint} orderid={orderid} update={update} requestUpdate={requestUpdate} shipping_fee={shipping_fee}/> : shippingFeesMsg}</p>
            
          <div className='address'>
            <address>
              {address.address}<br />
              {address.zip_code} {address.city} - {address.country}
            </address>
            {!editable && <button type='button' onClick={() => setIsOpenDialog(true)} aria-label={'Modifier les informations de livraison'}>
              <img width={20} height={20} src={`${FEURST_IMG_PATH}/edit.webp`} alt='' />
            </button>}
          </div>
          {address?.phone && <p><abbr title='téléphone'>Tél.</abbr> : {address.phone}</p>}
          <p>Livraison estimée pour les quantités disponibles&nbsp;: J+{shipping_mode == 'EXPRESS' ? '2' : '3'}</p>
        </div>
        {isEmpty(address) ?
          <div className='overlay'>
            {!editable && <button type='button' onClick={() => setIsOpenDialog(true)}>Indiquez vos informations de livraison</button>}
          </div>
          : null}
      </div>
    </DeliveryStyles>
  )

}

const DeliveryStyles = styled.div`
  
  margin-bottom: var(--spc-4);
  max-width: var(--spc-96);

  h4 {
      background: var(--brand-color);
      color: var(--white);
      padding: var(--spc-2);
      padding-left: var(--spc-6);
      margin:0;
  }
  
  .deliverybox {
    display: grid;

    & > div {
      grid-column: 1/-1;
      grid-row: 1/-1;
    }
  }
  
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--stone-100);

    button {
      border:0;
      cursor: pointer;
      padding-inline: var(--spc-6);
      padding-block: var(--spc-3);
      color: var(--white);
      background-color: var(--brand-color);
      font-size: var(--text-base);
      font-weight: var(--font-bold);
      border-radius: var(--rounded-3xl);
    }
  }


  .address {
    width: 100%;
    display: flex;
    justify-content: space-between;
    column-gap: var(--spc-2);

    button {
      background: none;
      border: 0;
      cursor: pointer;
    }
  }

  
  .content {
    border: 1px solid var(--stone-300);
    display: flex; 
    flex-direction: column;
    flex-grow: 1;
    padding-inline: var(--spc-8);
    margin-bottom: var(--spc-4);  

    &>address {
      font-style: italic;
      color: var(--stone-600);
    }
    
    &>p:last-of-type {
      font-style: unset;
      font-weight: var(--font-bold);
      color: var(--black);
    }

    input {
      max-width: 10ch;
      padding: var(--spc-2)
    }
  }
`


export default Delivery
