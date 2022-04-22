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

const StyledDialog = styled(PureDialog)`
  .dialogcontent {
    background-color: var(--gray-200);
    padding: var(--spc-10);
  }

  input {
    font-style: italic;
  }
`


const DialogAddress = ({isOpenDialog, setIsOpenDialog, accessRights, id, endpoint}) => {

  const [orderref, setOrderref] = useState('')
  const [address, setAddress] = useState({})
  const [shippingfees, setShippingFees] = useState({})
  const [shippingOption, setShippingOption] = useState('')
  const [errors, setErrors] = useState()
  const [valid, setValid] = useState(false)

  const getShippingFees = useCallback(async zipcode => {
    const res_shippingfees = await client(`${API_PATH}/${endpoint}/${id}/shipping-fee?zipcode=${zipcode}`)
      .catch(e => {
        console.error(e, `Can't get shipping fees ${e}`)
      })

      
    res_shippingfees && setShippingFees(res_shippingfees)
  }, [endpoint, id])

    
  const validateAddress = async e => {
    e.preventDefault()

    // then bind to the current order/quotation
    const bindAddressAndShipping = await client(`${API_PATH}/${endpoint}/${id}`, {data: {address, reference: orderref}, method: 'PUT'})
      .catch(e => {
        console.error(e, `Can't bind address to order/quotation ${e}`)
        setErrors(e)
      })
    bindAddressAndShipping && setIsOpenDialog(false)
  }

  useEffect(() => {
    setValid(address?.label && address?.address && address?.zip_code&& address?.city && address?.country && orderref && shippingOption)
  }, [address, shippingOption, orderref])

  useEffect(() => {
    address?.zip_code && getShippingFees(address?.zip_code)
  }, [address?.zip_code, getShippingFees])

  return (
    <StyledDialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
    >

      <div>
        <p>Certaines quantités ne sont pas disponibles dans votre commande.</p>
        <p>Le service ADV reviendra vers vous avec un délai de livraison dès le
traitement de votre commande.</p>
      </div>

      <h2>Pour valider votre commande, veuillez&nbsp;:</h2>
      <h3>Indiquez une référence</h3>
      <form onSubmit={validateAddress} className='grid gap-y-4 grid-cols'>

        {/* order ref */}
        <TextField className='ref' value={orderref} onChange={ev => setOrderref(ev.target.value)} placeholder={'Ex : Equipements carrière X'} />

        {/* order address */}
        <h3>Indiquez l'adresse de livraison</h3>
        <DeliveryAddresses address={address} setAddress={setAddress} onChange={e => setAddress({...address, label: e})}/>
        <Address address={address} setAddress={setAddress} getShippingFees={getShippingFees} errors={errors} />

          
        {/* order shipping fees */}
        {!isEmpty(shippingfees) ? (<>
          <h3>Indiquez l'option de livraison</h3>
          <ShippingFees shippingOption={shippingOption} setShippingOption={setShippingOption} shippingoptions={shippingfees} />
        </>) : null
        }

        <PleasantButton disabled={!valid} type='submit' onSubmit={() => validateAddress}>Valider ces informations</PleasantButton>
      </form>

    </StyledDialog>
  )

}

export default DialogAddress
