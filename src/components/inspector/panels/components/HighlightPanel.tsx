import React, { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import SizeControl from '~components/inspector/controls/SizeControl'
import TextControl from '~components/inspector/controls/TextControl'
import usePropsSelector from '~hooks/usePropsSelector'

const HighlightPanel = () => {
  const rounded = usePropsSelector('rounded')

  return (
    <>
      <ChildrenControl />

      <TextControl label="Query" name="query" />

      <ColorsControl
        withFullColor
        enableHues
        label="High light text color"
        name="highlightTextColor"
      />

      <ColorsControl
        withFullColor
        enableHues
        label="High light BgColor"
        name="highlightBgColor"
      />

      <TextControl label="High light px" name="highlightPx" />
      <TextControl label="High light py" name="highlightPy" />

      <TextControl name="highlightRounded" label="High light Border radius" />
    </>
  )
}

export default memo(HighlightPanel)
