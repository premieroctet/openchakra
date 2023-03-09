import React, { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

const LexicalPanel = () => {
  return (
    <>
      <ChildrenControl />
    </>
  )
}

export default memo(LexicalPanel)