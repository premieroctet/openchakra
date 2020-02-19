import React, { memo } from 'react'
import ColorsControl from '../../controls/ColorsControl'
import IconControl from '../../controls/IconControl'

const ListIconPanel = () => {
  return (
    <>
      <IconControl label="Icon" name="icon" />
      <ColorsControl name="color" label="Color" />
    </>
  )
}

export default memo(ListIconPanel)
