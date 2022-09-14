import { memo } from 'react'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const TdThPanel = () => {
  return (
    <>
      <SwitchControl label="Is numeric" name="isNumeric" />
    </>
  )
}

export default memo(TdThPanel)
