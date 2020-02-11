import React, { memo } from 'react'
import TextControl from '../../controls/TextControl'
import SwitchControl from '../../controls/SwitchControl'

const BreadcrumbPanel = () => {
  return (
    <>
      <TextControl name="separator" label="Separator" />
      <TextControl name="spacing" label="Spacing" />
      <SwitchControl label="With separator" name="addSeparator" />
    </>
  )
}

export default memo(BreadcrumbPanel)
