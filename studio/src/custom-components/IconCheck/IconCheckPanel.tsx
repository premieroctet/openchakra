import React, { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import IconControl from '~components/inspector/controls/IconControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const IconCheckPanel = () => {
  return (
    <>
      <SwitchControl name='checked' label='checked' />
      <IconControl name="iconCheck" label="Icon checked" />
      <IconControl name="iconUncheck" label="Icon unchecked" />
    </>
  )
}

export default memo(IconCheckPanel)