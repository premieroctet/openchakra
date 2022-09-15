import React, { memo } from 'react'
import ColorsControl from '~components/inspector/controls/ColorsControl'

const StatPanel = () => {
  return (
    <>
      <ColorsControl label="Color Scheme" name="colorScheme" />
    </>
  )
}

export default memo(StatPanel)
