import React, { memo } from 'react'
import SwitchControl from '../../controls/SwitchControl'
import TextControl from '../../controls/TextControl'

const LinkPanel = () => {
  return (
    <>
      <TextControl autoFocus name="children" label="Text" />
      <TextControl name="href" label="Href" />
      <SwitchControl label="External" name="isExternal" />
    </>
  )
}

export default memo(LinkPanel)
