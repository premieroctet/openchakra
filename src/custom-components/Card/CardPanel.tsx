import React, { memo } from 'react'

import ChildrenControl from '~components/inspector/controls/ChildrenControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'

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
