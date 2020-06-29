import React, { memo } from 'react'
import TextControl from '~components/inspector/controls/TextControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const BreadcrumbPanel = () => {
  return (
    <>
      <TextControl name="separator" label="Separator" />
      <TextControl name="spacing" label="Spacing" />
    </>
  )
}

export default memo(BreadcrumbPanel)
