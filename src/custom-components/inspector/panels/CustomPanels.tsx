import React, { memo } from 'react'
import CCPanel from './components/CCPanel'

const CustomPanels: React.FC<{ component: IComponent; isRoot: boolean }> = ({
  component,
  isRoot,
}) => {
  const { type } = component

  if (isRoot) {
    return null
  }
  return <>{type === 'CC' && <CCPanel />}</>
}

export default memo(CustomPanels)
