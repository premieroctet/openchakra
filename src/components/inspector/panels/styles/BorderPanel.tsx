import React, { memo } from 'react'
import TextControl from '~components/inspector/controls/TextControl'

const BorderPanel = () => {
  return (
    <>
      <TextControl name="border" label="Border" />
      <TextControl name="borderRadius" label="Border radius" />
    </>
  )
}

export default memo(BorderPanel)
