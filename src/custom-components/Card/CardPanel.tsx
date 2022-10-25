import React, { memo } from 'react'
import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import DataProviderPanel from '../DataProvider/DataProviderPanel'

const CardPanel = () => {
  return (
    <>
      <DataProviderPanel />
      <ChildrenControl />
    </>
  )
}

export default memo(CardPanel)
