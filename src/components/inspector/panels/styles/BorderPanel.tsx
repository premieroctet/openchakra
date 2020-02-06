import React, { memo } from 'react'
import SizeControl from '../../controls/SizeControl'
import usePropsSelector from '../../../../hooks/usePropsSelector'
import TextControl from '../../controls/TextControl'

const BorderPanel = () => {
  const rounded = usePropsSelector('rounded')

  return (
    <>
      <TextControl name="border" label="Border" />
      <SizeControl name="rounded" label="Border radius" value={rounded} />
    </>
  )
}

export default memo(BorderPanel)
