import React, { memo } from 'react'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import SizeControl from '../../controls/SizeControl'
import ColorsControl from '../../controls/ColorsControl'
import SwitchControl from '../../controls/SwitchControl'

const RadioPanel = () => {
  const size = usePropsSelector('size')

  return (
    <>
      <SizeControl label="Size" options={['sm', 'md', 'lg']} value={size} />
      <ColorsControl name="variantColor" label="Variant color" />
      <SwitchControl label="Checked" name="isChecked" />
      <SwitchControl label="Full width" name="isFullWidth" />
      <SwitchControl label="Invalid" name="isInvalid" />
    </>
  )
}

export default memo(RadioPanel)
