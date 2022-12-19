import React, { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import IconControl from '~components/inspector/controls/IconControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'

const MenuItemPanel = () => {
  return (
    <>
      <ChildrenControl />
      <IconControl name="icon" label="Icon" />
      <TextControl name="iconSpacing" label="Icon Spacing" />
      <SwitchControl label="Disabled" name="isDisabled" />
    </>
  )
}

export default memo(MenuItemPanel)
