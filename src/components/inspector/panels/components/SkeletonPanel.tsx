import { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'

const SkeletonPanel = () => (
  <>
    <ChildrenControl />
  </>
)

export default memo(SkeletonPanel)
