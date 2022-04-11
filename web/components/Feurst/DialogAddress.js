import React, {useRef, useState} from 'react'
import {Dialog} from '@headlessui/react'
import styled from 'styled-components'
import {TextField} from '@material-ui/core'
import Address from '../Address/Address'
import DeliveryAddresses from '../Feurst/DeliveryAddresses'


const InitialDialog = styled(Dialog)`
  
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  background: rgba(50,50,50,0.8);


  .dialogcontent {
    padding: var(--spc-6);
    width: min(100% - 2rem, 40rem);
    background-color: white;
    margin-inline: auto;
    z-index: 1;
    position: relative;
    border-radius: var(--rounded-xl)
  }
`


const DialogAddress = ({isOpenDialog, setIsOpenDialog, setAddress, accessRights}) => {

  const completeButtonRef = useRef(null)

  const [orderref, setOrderref] = useState('')

  return (
    <InitialDialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
      initialFocus={completeButtonRef}
    >
      <Dialog.Overlay />
      <div className='dialogcontent'>
        <Dialog.Title>Pour valider votre commande, veuillez&nbsp;:</Dialog.Title>
        <button ref={completeButtonRef} onClick={() => setIsOpenDialog(false)}>Fermer</button>
        <Dialog.Description>

          <TextField value={orderref} onChange={ev => setOrderref(ev.target.value)} placeholder={'Référence'} />

          <h3>Indiquez l'adresse de livraison</h3>
          <DeliveryAddresses />
          <Address />
            
        </Dialog.Description>

        <button onClick={() => setAddress}></button>
        

        {/*
        You can render additional buttons to dismiss your dialog by setting
        `isOpen` to `false`.
      */}
          
      </div>
    </InitialDialog>
  )

}

export default DialogAddress
