import { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const TdThPanel = () => {
  return (
    <>
      <ChildrenControl />
      <SwitchControl label="Is numeric" name="isNumeric" />
    </>
  )
}

export default memo(TdThPanel)
