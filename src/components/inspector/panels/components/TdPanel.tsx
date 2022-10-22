import React, { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const TdPanel = () => {
  return (
    <>
      <ChildrenControl />
      <SwitchControl label="Numeric" name="isNumeric" />
    </>
  )
}

export default memo(TdPanel)
