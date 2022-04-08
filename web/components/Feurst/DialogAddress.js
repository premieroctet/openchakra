import React, {useRef} from 'react'
import {Dialog} from '@headlessui/react'
import styled from 'styled-components'
import Address from '../Address/Address'

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


const DialogAddress = ({isOpenDialog, setIsOpenDialog, ...props}) => {
  
  console.log(props)

  const completeButtonRef = useRef(null)

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
