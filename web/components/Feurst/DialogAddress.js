import React, {useCallback, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {TextField} from '@material-ui/core'
import Address from '../Address/Address'
import DeliveryAddresses from '../Feurst/DeliveryAddresses'
import ShippingFees from '../Feurst/ShippingFees'
import PureDialog from '../Dialog/PureDialog'
import {client} from '../../utils/client'
import isEmpty from '../../server/validation/is-empty'
import {API_PATH} from '../../utils/consts'
import {PleasantButton} from './Button'
import {Input} from './components.styles'


const StyledDialog = styled(PureDialog)`
  .dialogcontent {
    background-color: var(--gray-200);
    padding: var(--spc-10);
  }
  
  .disclaimer {
    padding-inline: var(--spc-8);
    background: var(--stone-400);
    border-radius: var(--rounded-7xl);
    padding-block: var(--spc-3);
    color: var(--white);
    font-weight: var(--font-bold);

    &>p {
      font-size: var(--text-xs);
    }
  }

  h2, h3 {
    color: var(--black);
  }

  input {
    font-style: italic;
    width: 100%;
  }

  button[type="submit"] {
    display: block;
    margin-inline: auto;
    margin-top: var(--spc-5);
  }

  [role="combobox"] {
    margin-bottom: var(--spc-2);
  }

  .full-address {
    display: grid;
    row-gap: var(--spc-2);
    column-gap: var(--spc-2);
    grid-template-areas: 'address address address'
                          'zipcode city country'
                          'phone phone phone';
  }

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


const DialogAddress = ({isOpenDialog, setIsOpenDialog, accessRights, id, endpoint, state, setState, validateAddress}) => {

  const {orderref, address, shippingOption, errors} = state
  const [shippingfees, setShippingFees] = useState({})
  const [valid, setValid] = useState(false)
  const formData = useRef()

  const getShippingFees = useCallback(async zipcode => {
    const res_shippingfees = await client(`${API_PATH}/${endpoint}/${id}/shipping-fee?zipcode=${zipcode}`)
      .catch(e => {
        console.error(e, `Can't get shipping fees ${e}`)
      })

      
    res_shippingfees && setShippingFees(res_shippingfees)
  }, [endpoint, id])


  useEffect(() => {
    setValid(address?.address && address?.zip_code&& address?.city && address?.country && orderref && shippingOption)
  }, [address, shippingOption, orderref])

  useEffect(() => {
    address?.zip_code && getShippingFees(address?.zip_code)
  }, [address?.zip_code, getShippingFees])

  return (
    <StyledDialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
    >

      <div className='disclaimer'>
        <p>Certaines quantités ne sont pas disponibles dans votre commande.</p>
        <p>Le service ADV reviendra vers vous avec un délai de livraison dès le
traitement de votre commande.</p>
      </div>

      <form ref={formData} onSubmit={validateAddress}>

        <h2>Pour valider votre commande, veuillez&nbsp;:</h2>
        <h3>Indiquer une référence</h3>

        {/* order ref */}
        <label htmlFor='reforder' className='sr-only'>Référence</label>
        <Input noborder id="reforder" className='ref' value={orderref} onChange={ev => setState({...state, orderref: ev.target.value})} placeholder={'Ex : Equipements carrière X'} />

        {/* order address */}
        <h3>Indiquer l'adresse de livraison</h3>
        <DeliveryAddresses state={state} setState={setState} />
        <Address state={state} setState={setState} getShippingFees={getShippingFees} errors={errors} />

          
        {/* order shipping fees */}
        {!isEmpty(shippingfees) ? (<>
          <h3>Indiquez l'option de livraison</h3>
          <ShippingFees state={state} setState={setState} shippingoptions={shippingfees} />
        </>) : null
        }

        <PleasantButton disabled={!valid} type='submit' onSubmit={() => validateAddress()}>Valider ces informations</PleasantButton>
      </form>

    </StyledDialog>
  )

}

export default DialogAddress
