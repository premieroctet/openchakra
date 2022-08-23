import React, { memo } from 'react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

const CardPanel = () => {
  return (
    <>
      <ChildrenControl />
    </>
  )
}

export default memo(CardPanel)
