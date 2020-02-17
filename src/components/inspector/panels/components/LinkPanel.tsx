import React, { memo } from 'react'
import SwitchControl from '../../controls/SwitchControl'
import TextControl from '../../controls/TextControl'
import ChildrenControl from '../../controls/ChildrenControl'

const LinkPanel = () => {
  return (
    <>
      <ChildrenControl />
      <TextControl name="href" label="Href" />
      <SwitchControl label="External" name="isExternal" />
    </>
  )
}

export default memo(LinkPanel)
