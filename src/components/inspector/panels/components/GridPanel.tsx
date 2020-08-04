import React, { memo } from 'react'
import TextControl from '~components/inspector/controls/TextControl'

const GridPanel = () => {
  return (
    <>
      <TextControl label="Template Columns" name="templateColumns" />
      <TextControl label="Template Rows" name="templateRows" />
      <TextControl label="Gap" name="gap" />
      <TextControl label="Row Gap" name="rowGap" />
      <TextControl label="Column Gap" name="columnGap" />
      <TextControl label="Auto Columns" name="autoColumns" />
      <TextControl label="Column" name="column" />
      <TextControl label="Row" name="row" />
      <TextControl label="AutoFlow" name="autoFlow" />
      <TextControl label="Auto Rows" name="autoRows" />
      <TextControl label="Area" name="area" />
      <TextControl label="Template Areas" name="templateAreas" />
    </>
  )
}

export default memo(GridPanel)
