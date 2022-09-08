import { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import TextControl from '~components/inspector/controls/TextControl'

const HighlightPanel = () => (
  <>
    <ChildrenControl />
    <TextControl label="Query" name="query" />
  </>
)

export default memo(HighlightPanel)
