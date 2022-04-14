import React, {Children, useRef, useState} from 'react'
import {Dialog} from '@headlessui/react'
import styled from 'styled-components'

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

  .close {
    position: absolute;
    top: 1rem;
    right:1rem;
    background: transparent;
    border: 0;
    cursor: pointer;
    width: var(--minTapSize);
    height: var(--minTapSize);
    
    span {
      font-size: var(--text-2xl);
      color: var(--black);
    }
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

        <button aria-label='fermer' className='close' ref={completeButtonRef} onClick={onClose}><span role={'img'}>✕</span></button>
        {title ? <Dialog.Title>{title}</Dialog.Title> : null}
        {children}
      </div>
    </BaseDialog>
  )

}

export default PureDialog
