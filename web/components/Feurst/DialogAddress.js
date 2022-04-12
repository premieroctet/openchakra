import React, {useRef, useState} from 'react'
import {Dialog} from '@headlessui/react'
import styled from 'styled-components'
import {TextField} from '@material-ui/core'
import Address from '../Address/Address'
import DeliveryAddresses from '../Feurst/DeliveryAddresses'
import PureDialog from '../Dialog/PureDialog'


const DialogAddress = ({isOpenDialog, setIsOpenDialog, setAddress, accessRights}) => {

  const [orderref, setOrderref] = useState('')
  

  return (
    <PureDialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
    >
      <div className='m-8 bg-'>
      

        <div>
          <p>Certaines quantités ne sont pas disponibles dans votre commande.</p>
          <p>Le service ADV reviendra vers vous avec un délai de livraison dès le
traitement de votre commande.</p>
        </div>

        <h2>Pour valider votre commande, veuillez&nbsp;:</h2>
        <h3>Indiquez une référence</h3>
        <TextField value={orderref} onChange={ev => setOrderref(ev.target.value)} placeholder={'Référence'} />

        <h3>Indiquez l'adresse de livraison</h3>
        <DeliveryAddresses />
        <Address />

        <button onClick={() => setAddress}></button>
      </div>

    </PureDialog>
  )

}

export default DialogAddress
