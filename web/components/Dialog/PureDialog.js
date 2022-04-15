import React, {useRef, useState} from 'react'
import {Dialog} from '@headlessui/react'
import styled from 'styled-components'
import CloseButton from '../Buttons/CloseButton'

const BaseDialog = styled(Dialog)`
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
    border-radius: var(--rounded-7xl)
  }
`

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
`

const PureDialog = ({
  open,
  onClose,
  title,
  children,
  ...rest
}) => {

  const completeButtonRef = useRef(null)

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      initialFocus={completeButtonRef}
      {...rest}
    >
      <Overlay />
      <div className='dialogcontent' >
        <CloseButton forwardref={completeButtonRef} onClick={onClose} />
        
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}
        {children}
      </div>
    </BaseDialog>
  )

}

export default PureDialog
