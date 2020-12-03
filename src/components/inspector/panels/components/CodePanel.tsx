import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

const CodePanel = () => {
  return (
    <>
      <ChildrenControl />
      <ColorsControl label="Color Scheme" name="colorScheme" />
    </>
  )
}

export default memo(CodePanel)
