import React from 'react'
import SwitchControl from '../../controls/SwitchControl'

const MenuPanel = () => {
  return (
    <>
      <SwitchControl label="is Open" name="isOpen" />
      <SwitchControl label="Auto Select" name="autoSelect" />
      <SwitchControl label="Close On Blur" name="closeOnBlur" />
      <SwitchControl label="Close On Select" name="closeOnSelect" />
    </>
  )
}

export default MenuPanel
