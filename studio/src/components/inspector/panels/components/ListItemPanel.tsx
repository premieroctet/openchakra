import React, { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

const ListItemPanel = () => {
  return (
    <>
      <ChildrenControl />
    </>
  )
}

export default memo(ListItemPanel)
