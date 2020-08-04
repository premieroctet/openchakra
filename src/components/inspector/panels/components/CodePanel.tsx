import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

const CodePanel = () => {
  return (
    <>
      <ChildrenControl />
      <ColorsControl label="Variant Color" name="variantColor" />
    </>
  )
}

export default memo(CodePanel)
