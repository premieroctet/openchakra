import React, { memo } from 'react'
import TextControl from '~components/inspector/controls/TextControl'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

const SliderMarkPanel = () => {
  return (
    <>
      <ChildrenControl />
      <TextControl name="value" label="Value" />
    </>
  )
}

export default memo(SliderMarkPanel)
