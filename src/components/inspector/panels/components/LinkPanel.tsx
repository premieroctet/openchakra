import React, { memo } from 'react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

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
