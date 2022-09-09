import React from 'react'
import styled from 'styled-components'
import TogglePanelCode from './ToggleCodePanel'
import Clear from './Clear'
import HeaderMenu from '~components/headerMenu/HeaderMenu'

const MenuActions = () => {
  return (
    <Actions>
      <HeaderMenu />
      <Clear />
      <TogglePanelCode />
    </Actions>
  )
}

const Actions = styled.div`
  margin-block-start: 1rem;
  margin-inline: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 0.5rem;
`

export default MenuActions
