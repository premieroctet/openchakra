import React, {useRef, useState} from 'react'
import {Dialog} from '@headlessui/react'
import styled from 'styled-components'
import {TextField} from '@material-ui/core'
import Address from '../Address/Address'
import DeliveryAddresses from '../Feurst/DeliveryAddresses'
import ShippingFees from '../Feurst/ShippingFees'
import PureDialog from '../Dialog/PureDialog'
import {client} from '../../utils/client'
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
  const [errors, setErrors] = useState()

  const getShippingFees = async zipcode => {
    const res_shippingfees = await client(`myAlfred/api/${endpoint}/${id}/shipping-fee?zipcode=${zipcode}`)
      .catch(e => {
        console.error(e, `Can't get shipping fees ${e}`)
      })
      
    res_shippingfees && setShippingFees(res_shippingfees)
  }
    
  const validateAddress = async e => {
    e.preventDefault()
    // save address for this user if not exists
    if (!address?._id) {
      const recordAddress = await client(`myAlfred/api/users/addresses`, {data: address})
        .catch(e => {
          console.error(e, `Can't save address for user ${e}`)
          setErrors(e)
        })
      recordAddress && setAddress(recordAddress[recordAddress.length - 1])
    }

    // then bind to the current order/quotation
    const bindAddress = await client(`myAlfred/api/${endpoint}/${id}`, {data: address})

    bindAddress && setIsOpenDialog(false)

  }

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
        <DeliveryAddresses address={address} setAddress={setAddress} />
        <Address address={address} setAddress={setAddress} getShippingFees={getShippingFees} errors={errors} />
          
        {/* order shipping fees */}
        <ShippingFees shippingoptions={shippingfees} />

        <PleasantButton type='submit' onSubmit={() => validateAddress}>Valider ces informations</PleasantButton>
      </form>

    </StyledDialog>
  )

}

export default DialogAddress
