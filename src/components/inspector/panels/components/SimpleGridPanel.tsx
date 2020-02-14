import React, { memo } from 'react'
import TextControl from '../../controls/TextControl'

const SimpleGridPanel = () => {
  return (
    <>
      <TextControl name="columns" label="Columns" />
      <TextControl name="spacingX" label="Spacing X" />
      <TextControl name="spacingY" label="Spacing Y" />
      <TextControl name="minChildWidth" label="Min Child Width" />
    </>
  )
}

export default memo(SimpleGridPanel)
