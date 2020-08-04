import React, { memo } from 'react'
import SizeControl from '~components/inspector/controls/SizeControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import usePropsSelector from '~hooks/usePropsSelector'

const AlertTitlePanel = () => {
  const fontSize = usePropsSelector('fontSize')

  return (
    <>
      <ChildrenControl />
      <SizeControl name="fontSize" label="fontSize" value={fontSize} />
    </>
  )
}

export default memo(AlertTitlePanel)
