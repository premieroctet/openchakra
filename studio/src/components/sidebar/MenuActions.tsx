import React from 'react'
import TogglePanelCode from './ToggleCodePanel'
import Clear from './Clear'
import Deploy from './Deploy'
import HeaderMenu from '~components/headerMenu/HeaderMenu'

const MenuActions = () => {
  return (
    <>
      <TogglePanelCode />
      <HeaderMenu />
      <Clear />
      <Deploy />
    </>
  )
}

export default MenuActions
