import React, { memo } from 'react'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const LexicalPanel = () => {
  return (
    <>
      <SwitchControl label="Editable" name="isEditable" />
    </>
  )
}

export default memo(LexicalPanel)