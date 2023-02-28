import React, { memo } from 'react'
import usePropsSelector from '~hooks/usePropsSelector'
import SizeControl from '~components/inspector/controls/SizeControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const RadioPanel = () => {
  const size = usePropsSelector('size')

  return (
    <>
      <SizeControl label="Size" options={['sm', 'md', 'lg']} value={size} />
      <ColorsControl name="colorScheme" label="Color Scheme" />
      <SwitchControl label="Checked" name="isChecked" />
      <SwitchControl label="Width" name="width" />
      <SwitchControl label="Invalid" name="isInvalid" />
    </>
  )
}

export default memo(RadioPanel)
