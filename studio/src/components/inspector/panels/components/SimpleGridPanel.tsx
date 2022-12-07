import React, { memo } from 'react'
import TextControl from '~components/inspector/controls/TextControl'
import JustifyItems from '~components/inspector/inputs/JustifyItems'

const SimpleGridPanel = () => {
  return (
    <>
      <TextControl name="columns" label="Columns" />
      <TextControl name="spacingX" label="Spacing X" />
      <TextControl name="spacingY" label="Spacing Y" />
      <TextControl name="minChildWidth" label="Min Child Width" />
      <JustifyItems />
    </>
  )
}

export default memo(SimpleGridPanel)
