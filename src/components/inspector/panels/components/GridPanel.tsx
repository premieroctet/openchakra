import React, { memo } from 'react'
import TextControl from '../../controls/TextControl'

const GridPanel = () => {
  return (
    <>
      <TextControl label="Area" name="gridArea" />
      <TextControl label="Template Areas" name="gridTemplateAreas" />
      <TextControl label="Gap" name="gridGap" />
      <TextControl label="Rox Gap" name="gridRowGap" />
      <TextControl label="Column Gap" name="gridColumnGap" />
      <TextControl label="Auto Columns" name="gridAutoColumns" />
      <TextControl label="Column" name="gridColumn" />
      <TextControl label="Row" name="gridRow" />
      <TextControl label="AutoFlow" name="gridAutoFlow" />
      <TextControl label="Auto Rows" name="gridAutoRows" />
      <TextControl label="Template Rows" name="gridTemplateRows" />
      <TextControl label="Template Columns" name="gridTemplateColumns" />
    </>
  )
}

export default memo(GridPanel)
